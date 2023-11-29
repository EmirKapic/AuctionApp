package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
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
    @GetMapping("/user/{relationship}/{id}")
    public ResponseEntity getUserBids(final Pageable pageable, @PathVariable(name = "id")Long id,
                                      @PathVariable(name = "relationship")String relationship,
                                      @RequestParam(name = "active", defaultValue = "true")Boolean active){
        if (relationship.equals("seller")){
            return ResponseEntity.ok(bidService.getSoldByUser(id, pageable, active));
        }
        else if(relationship.equals("bidder")){
            return ResponseEntity.ok(bidService.getBidsByUser(id, pageable));
        }
        else{
            return ResponseEntity.badRequest().body(new ErrorResponse("Incorrect relationship. Use seller or bidder"));
        }
    }
}
