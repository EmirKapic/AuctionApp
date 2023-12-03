package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.bidding.NewBidRequest;
import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.services.Bid.BidParameters;
import com.atlantbh.internship.AuctionApp.services.Bid.BidService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;
    @GetMapping
    public ResponseEntity getBids(final Pageable pageable, BidParameters params){
        Page<Bid> bids =  bidService.getBids(params, pageable);

        if (params.highestOnly() != null && params.highestOnly()){
            if (bids.isEmpty()){
                return ResponseEntity.badRequest().build();
            }
            List<Bid> bidList = bids.getContent();
            return ResponseEntity.ok().body(getHighestBid(bidList));
        }
        else return ResponseEntity.ok().body(bids);
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


    private Bid getHighestBid(List<Bid> bids){
        return Collections.max(bids, (bid1, bid2) -> {
            if (bid1.getBid() > bid2.getBid())
                return 1;
            else if (bid1.getBid() < bid2.getBid())
                return -1;
            else return 0;
        });
    }
}
