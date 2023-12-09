package com.atlantbh.internship.AuctionApp.services.Payment;

import com.atlantbh.internship.AuctionApp.exceptions.PaymentException;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.models.Payment;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

public interface PaymentService {
    String hostedCheckout(long productId) throws ProductNotFoundException, StripeException, PaymentException;
    Payment finalizePayment(Session sessionEvent) throws StripeException, ProductNotFoundException;
}
