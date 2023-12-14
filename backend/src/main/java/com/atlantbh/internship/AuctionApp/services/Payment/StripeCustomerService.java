package com.atlantbh.internship.AuctionApp.services.Payment;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;

import java.util.Optional;

public interface StripeCustomerService {
    Optional<Customer> find(String email) throws StripeException;
    Customer create(String email, String name);
}
