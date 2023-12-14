package com.atlantbh.internship.AuctionApp.utilities;

import java.util.regex.Pattern;

public class PhoneValidator {
    private static final Pattern PHONE_PATTERN =Pattern.compile("^\\+\\d+$");

    public static boolean validate(String phoneNumber){
        return phoneNumber != null && PHONE_PATTERN.matcher(phoneNumber).matches();
    }
}
