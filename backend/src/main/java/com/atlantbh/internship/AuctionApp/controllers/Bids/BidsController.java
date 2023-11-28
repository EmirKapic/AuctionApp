package com.atlantbh.internship.AuctionApp.controllers.Bids;


import com.atlantbh.internship.AuctionApp.models.Bid;
import com.atlantbh.internship.AuctionApp.services.Bid.BidService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/bids")
public class BidsController {
    private final BidService bidService;
    @GetMapping("/{id}")
    public Page<Bid> getUserBids(final Pageable pageable, @PathVariable(name = "id")Long id){
        return bidService.getBidsByUser(id, pageable);
    }
}
