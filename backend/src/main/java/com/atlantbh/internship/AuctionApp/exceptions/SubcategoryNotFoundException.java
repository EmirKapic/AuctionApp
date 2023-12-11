package com.atlantbh.internship.AuctionApp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class SubcategoryNotFoundException extends Exception{
    public SubcategoryNotFoundException(String message){super(message);}
}
