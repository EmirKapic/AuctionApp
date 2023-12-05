package com.atlantbh.internship.AuctionApp.services.Payment;


import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StripeCustomerService implements CustomerService {

    @Override
    public Optional<Customer> findCustomerByEmail(String email) throws StripeException {
        CustomerSearchParams params = CustomerSearchParams
                .builder()
                .setQuery("email:'" + email + "'")
                .build();
        CustomerSearchResult result = Customer.search(params);
        return !result.getData().isEmpty() ? Optional.of(result.getData().get(0)) : Optional.empty();
    }

    @Override
    public Customer findOrCreateCustomer(String email, String name) throws StripeException {
        CustomerSearchParams params =
                CustomerSearchParams
                        .builder()
                        .setQuery("email:'" + email + "'")
                        .build();Customer.search(params);
       CustomerSearchResult result = Customer.search(params);
       if (result.getData().isEmpty()){
           CustomerCreateParams customerCreateParams = new CustomerCreateParams.Builder()
                   .setName(name)
                   .setEmail(email)
                   .build();
           return Customer.create(customerCreateParams);
       }
       else{
           return Customer.search(params).getData().get(0);
       }
    }
}
