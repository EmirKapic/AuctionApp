package com.atlantbh.internship.AuctionApp.utilities;

import com.atlantbh.internship.AuctionApp.dtos.sell.NewProductRequest;

import java.time.Instant;
import java.time.temporal.ChronoUnit;


public class ProductValidator {
    public static boolean validate(NewProductRequest request){
        if (request.imageUrls().size() < 3)return false;
        for (String url : request.imageUrls()){
            if (!URLValidator.validate(url))return false;
        }
        return request.endDate().isAfter(request.startDate())
                && (request.startDate().truncatedTo(ChronoUnit.DAYS).compareTo(Instant.now().truncatedTo(ChronoUnit.DAYS)) >= 0)
                && PhoneValidator.validate(request.phoneNumber())
                && request.startPrice() > 0;
    }
}
