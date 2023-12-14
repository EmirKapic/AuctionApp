package com.atlantbh.internship.AuctionApp.utilities;

import java.util.regex.Pattern;

public class URLValidator {
    private static final Pattern URL_PATTERN =
            Pattern.compile("(https?://(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?://(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})");
    public static boolean validate(String url){
        return url != null && URL_PATTERN.matcher(url).matches();
    }
}
