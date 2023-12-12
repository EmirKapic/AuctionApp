package com.atlantbh.internship.AuctionApp.services.Payment;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StripeCustomerServiceImpl implements StripeCustomerService{
    @Override
    public Optional<Customer> find(String email) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();
        List<Customer> result = Customer.search(params).getData();

        return result.isEmpty() ? Optional.empty() : Optional.of(result.get(0));
    }

    @Override
    public Customer create(String email, String name){
        try{
            CustomerCreateParams customerCreateParams = new CustomerCreateParams.Builder()
                    .setName(name)
                    .setEmail(email)
                    .build();

            return Customer.create(customerCreateParams);
        }
        catch(StripeException exception){
            throw new RuntimeException(exception.getMessage());
        }
    }
}
