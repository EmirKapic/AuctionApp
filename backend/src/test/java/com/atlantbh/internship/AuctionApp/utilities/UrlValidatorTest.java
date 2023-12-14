package com.atlantbh.internship.AuctionApp.utilities;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UrlValidatorTest {

    @ParameterizedTest
    @ValueSource(strings = {"http://www.foufos.gr", "https://www.foufos.gr", "http://www.foufos.gr/kino", "https://www.google.com"})
    void validateCorrectUrl(String url){
        assertTrue(URLValidator.validate(url));
    }

    @ParameterizedTest
    @ValueSource(strings = {"http://www.foufos", "http://foufos", "random"})
    void rejectBadUrls(String url){
        assertFalse(URLValidator.validate(url));
    }

}
