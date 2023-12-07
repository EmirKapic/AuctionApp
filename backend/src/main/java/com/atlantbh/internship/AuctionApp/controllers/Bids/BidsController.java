package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.services.Bid.BidService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;
    @GetMapping("/user/{id}")
    public ResponseEntity getUserBids(final Pageable pageable, @PathVariable(name = "id")Long id){
        return ResponseEntity.ok(bidService.getBidsByUser(id, pageable));
    }
}
