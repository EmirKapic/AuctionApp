package com.atlantbh.internship.AuctionApp.services.Utility;

import java.util.regex.Pattern;

public class EmailValidator {
    public static boolean validate(String email){
        Pattern pattern = Pattern.compile("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");
        return pattern.matcher(email).matches();
    }
}
