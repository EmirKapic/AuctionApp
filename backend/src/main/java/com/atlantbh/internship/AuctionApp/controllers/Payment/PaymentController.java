package com.atlantbh.internship.AuctionApp.controllers.Payment;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.MessageResponse;
import com.atlantbh.internship.AuctionApp.dtos.payment.PayRequest;
import com.atlantbh.internship.AuctionApp.exceptions.PaymentException;
import com.atlantbh.internship.AuctionApp.exceptions.ProductNotFoundException;
import com.atlantbh.internship.AuctionApp.services.Payment.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pay")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity hostedCheckout(@RequestBody PayRequest request){
        try{
            String hostedUrl = paymentService.hostedCheckout(request.productId());
            return ResponseEntity.ok().body(new MessageResponse(hostedUrl));
        }
        catch(ProductNotFoundException | PaymentException exception){
            return ResponseEntity.badRequest().body(new ErrorResponse(exception.getMessage()));
        }
        catch(StripeException exception){
            return ResponseEntity.internalServerError().body(new ErrorResponse("There was a problem processing your payment."));
        }
    }

    @PostMapping("/paymentHook")
    public ResponseEntity paymentConfirmationHook(@RequestBody Event event){
        if (event.getType().equals("payment_intent.succeeded")){
            System.out.println("Success");
        }

        return ResponseEntity.ok().build();
    }
}
