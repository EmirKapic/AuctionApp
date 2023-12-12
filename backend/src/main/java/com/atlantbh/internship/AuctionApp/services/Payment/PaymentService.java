package com.atlantbh.internship.AuctionApp.services.Payment;

import com.atlantbh.internship.AuctionApp.exceptions.PaymentException;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;

public interface PaymentService {
    String hostedCheckout(long productId) throws ProductNotFoundException, PaymentException;
    void finalizePayment(String sessionId) throws PaymentException, ProductNotFoundException;
}
