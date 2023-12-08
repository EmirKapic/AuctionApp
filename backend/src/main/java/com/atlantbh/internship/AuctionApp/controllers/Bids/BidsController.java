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

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;

    @GetMapping
    public ResponseEntity getBids(final Pageable pageable, BidParameters params) {
        Page<Bid> bids = bidService.getBids(params, pageable);
        return ResponseEntity.ok().body(bids);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity makeNewBid(@RequestBody NewBidRequest request) {
        return bidService.makeNewBid(request.bid(), request.productId())
                .map(bid -> ResponseEntity.ok().body(bid))
                .map(ResponseEntity.class::cast)
                .orElse(ResponseEntity.badRequest().body(new ErrorResponse("Invalid bid.")));
    }
}
