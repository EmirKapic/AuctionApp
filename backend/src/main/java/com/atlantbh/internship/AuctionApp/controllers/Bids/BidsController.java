package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.bidding.NewBidRequest;
import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.services.Bid.BidService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;
    @GetMapping("/user/{id}")
    public ResponseEntity getUserBids(final Pageable pageable, @PathVariable(name = "id")Long id){
        return ResponseEntity.ok(bidService.getBidsByUser(id, pageable));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity makeNewBid(@RequestBody NewBidRequest request){
        Optional<Bid> newBid = bidService.makeNewBid(request.bid(), request.productId());
        if (newBid.isEmpty()){
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid bid."));
        }
        else{
            return ResponseEntity.ok().body(newBid.get());
        }
    }
}
