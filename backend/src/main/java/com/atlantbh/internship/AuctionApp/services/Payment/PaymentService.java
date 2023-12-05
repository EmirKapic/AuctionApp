package com.atlantbh.internship.AuctionApp.services.Payment;

import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.stripe.exception.StripeException;

public interface PaymentService {
    String hostedCheckout(long productId) throws ProductNotFoundException, StripeException;
}
