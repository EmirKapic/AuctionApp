package com.atlantbh.internship.AuctionApp.utilities;

import com.atlantbh.internship.AuctionApp.dtos.sell.NewProductRequest;

import java.time.Instant;


public class ProductValidator {
    public static boolean validate(NewProductRequest request){
        if (request.imageUrls().size() < 3)return false;
        for (String url : request.imageUrls()){
            if (!URLValidator.validate(url))return false;
        }
        return request.endDate().isAfter(request.startDate())
                && request.startDate().isAfter(Instant.now())
                && PhoneValidator.validate(request.phoneNumber())
                && request.startPrice() > 0;
    }
}
