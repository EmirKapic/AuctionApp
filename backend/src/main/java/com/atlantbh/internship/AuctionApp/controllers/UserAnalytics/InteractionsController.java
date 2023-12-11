package com.atlantbh.internship.AuctionApp.controllers.UserAnalytics;

import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.MessageResponse;
import com.atlantbh.internship.AuctionApp.dtos.userAnalytics.SellerInteractionDto;
import com.atlantbh.internship.AuctionApp.dtos.userAnalytics.SubcategoryInteractionDto;
import com.atlantbh.internship.AuctionApp.services.UserAnalytics.UserSellerInteractionService;
import com.atlantbh.internship.AuctionApp.services.UserAnalytics.UserSubcategoryInteractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/userInteraction")
@RequiredArgsConstructor
public class InteractionsController {
    private final UserSubcategoryInteractionService subcategoryInteractionService;
    private final UserSellerInteractionService sellerInteractionService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/subcategory")
    public ResponseEntity createSubcategoryInteraction(@RequestBody SubcategoryInteractionDto interaction){
        try{
            subcategoryInteractionService.createOrAdd(interaction.id());
            return ResponseEntity.ok().body(new MessageResponse("Added a new interaction"));
        }
        catch(Exception exception){
            return ResponseEntity.badRequest().body(new ErrorResponse(exception.getMessage()));
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/seller")
    public ResponseEntity createSellerInteraction(@RequestBody SellerInteractionDto interaction){
        try{
            sellerInteractionService.createOrAdd(interaction.email());
            return ResponseEntity.ok().body(new MessageResponse("Added a new interaction"));
        }
        catch(Exception exception){
            return ResponseEntity.badRequest().body(new ErrorResponse(exception.getMessage()));
        }

    }
}
