package com.atlantbh.internship.AuctionApp.controllers.Payment;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.MessageResponse;
import com.atlantbh.internship.AuctionApp.dtos.payment.PayRequest;
import com.atlantbh.internship.AuctionApp.services.Payment.PaymentService;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
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
        catch(Exception exception){
            return ResponseEntity.badRequest().body(new ErrorResponse(exception.getMessage()));
        }
    }

    @PostMapping("/payment-hook")
    public void paymentConfirmationHook(@RequestBody String event){

        try{
            Event stripeEvent = Event.GSON.fromJson(event, Event.class);
            if (stripeEvent.getType().equals("checkout.session.completed")){
                Session sessionEvent = (Session) stripeEvent.getDataObjectDeserializer().getObject().get();
                paymentService.finalizePayment(sessionEvent.getId());
            }
        }
        catch(Exception exception){
            System.out.println("Failed reading");
        }

    }
}
