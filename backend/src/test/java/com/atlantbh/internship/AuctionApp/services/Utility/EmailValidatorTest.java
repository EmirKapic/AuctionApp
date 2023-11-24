package com.atlantbh.internship.AuctionApp.services.Utility;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class EmailValidatorTest {

    @ParameterizedTest
    @ValueSource(strings= {"correct@email.com", "1234@1234.com", "12.asd@somthng.ba", "morethan@one.domain.two"})
    void validateCorrectEmail(String email) {
        assertTrue(EmailValidator.validate(email));
    }

    @ParameterizedTest
    @ValueSource(strings = {"notemail", "missing@lastpart", "@missing.firstpart", "this@cantendwithnum.123",""})
    void incorrectEmails(String email){
        assertFalse(EmailValidator.validate(email));
    }

    @Test
    void nullEmail(){
        assertFalse(EmailValidator.validate(null));
    }
}