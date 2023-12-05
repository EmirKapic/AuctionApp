package com.atlantbh.internship.AuctionApp.services.Payment;

import com.stripe.exception.StripeException;
import com.stripe.model.Customer;

import java.util.Optional;

public interface CustomerService {
    Optional<Customer> findCustomerByEmail(String email) throws StripeException;
    Customer findOrCreateCustomer(String email, String name) throws StripeException;
}
