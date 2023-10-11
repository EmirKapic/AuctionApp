package com.atlantbh.internship.AuctionApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


//this exclude is just until the database gets set up, otherwise it'll fail
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class AuctionAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionAppApplication.class, args);
	}

}
