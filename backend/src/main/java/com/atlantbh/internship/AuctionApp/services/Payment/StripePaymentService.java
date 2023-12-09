package com.atlantbh.internship.AuctionApp.services.Payment;

import com.atlantbh.internship.AuctionApp.exceptions.PaymentException;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Product;
import com.atlantbh.internship.AuctionApp.models.User;
import com.atlantbh.internship.AuctionApp.services.Product.ProductService;
import com.atlantbh.internship.AuctionApp.services.User.AuctionUserDetailsService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class StripePaymentService implements PaymentService{

    @Value("${config.stripe-secret-key}")
    private String STRIPE_SECRET_KEY;

    @Value("${config.stripe-publishable-key}")
    private String STRIPE_PUBLISHABLE_KEY;

    @Value("${config.client-host-url}")
    private String CLIENT_HOST_URL;

    private final AuctionUserDetailsService userDetailsService;
    private final ProductService productService;
    private final CustomerService customerService;


    @Override
    public String hostedCheckout(long productId) throws ProductNotFoundException, StripeException, PaymentException {
        User user = userDetailsService.getCurrentUser();
        Product product = productService.getById(productId);

        if (!productService.isPurchasable(product)){
            throw new PaymentException("Product is not available for purchase.");
        }
        if (productService.getWinner(product).getId() != user.getId()){
            throw new PaymentException("You are not the winner of the auction.");
        }


        Stripe.apiKey = STRIPE_SECRET_KEY;

        Customer customer = customerService.findOrCreateCustomer(user.getEmail(), user.getFirstName() + " " + user.getLastName());

        SessionCreateParams.Builder paramsBuilder =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setCustomer(customer.getId())
                        .setSuccessUrl(CLIENT_HOST_URL + "/payment/success")
                        .setCancelUrl(CLIENT_HOST_URL);
        paramsBuilder.addLineItem(
                SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                        .setProductData(
                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                        .setName(product.getName())
                                                        .build()
                                        )
                                        .setCurrency("usd")
                                        .setUnitAmountDecimal(BigDecimal.valueOf((int)(product.getHighestBid() * 100)))
                                        .build()

                        ).build()
        );
        Session session = Session.create(paramsBuilder.build());

        return session.getUrl();
    }
}
