package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.dtos.bidding.NewBidRequest;
import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.services.Bid.BidParameters;
import com.atlantbh.internship.AuctionApp.services.Bid.BidService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;
    @GetMapping
    public ResponseEntity getBids(final Pageable pageable, BidParameters params){
        if (params.highestOnly() != null && params.highestOnly()){
            Page<Bid> bids = bidService.getBids(
                    new BidParameters(params.productId(), null), PageRequest.of(
                    0, 1, Sort.by(Sort.Direction.DESC, "bid")
            ));
            if (bids.isEmpty()){
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().body(getHighestBid(bids.getContent()));
        }
        else {
            Page<Bid> bids =  bidService.getBids(params, pageable);
            return ResponseEntity.ok().body(bids);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity makeNewBid(@RequestBody NewBidRequest request){
        return bidService.makeNewBid(request.bid(), request.productId())
                .map(bid -> ResponseEntity.ok().body(bid))
                .map(ResponseEntity.class::cast)
                .orElse(ResponseEntity.badRequest().body(new ErrorResponse("Invalid bid.")));
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
