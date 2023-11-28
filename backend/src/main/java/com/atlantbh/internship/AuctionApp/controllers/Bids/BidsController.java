package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.dtos.ErrorResponse;
import com.atlantbh.internship.AuctionApp.services.Bid.BidService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;
    @GetMapping("/user/{relationship}/{id}")
    public ResponseEntity getUserBids(final Pageable pageable, @PathVariable(name = "id")Long id,
                                      @PathVariable(name = "relationship")String relationship){
        if (relationship.equals("seller")){
            return ResponseEntity.ok(bidService.getSoldByUser(id, pageable));
        }
        else if(relationship.equals("bidder")){
            return ResponseEntity.ok(bidService.getBidsByUser(id, pageable));
        }
        else{
            return ResponseEntity.badRequest().body(new ErrorResponse("Incorrect relationship. Use seller or bidder"));
        }
    }
}
