package com.atlantbh.internship.AuctionApp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;


@SpringBootApplication()
public class AuctionAppApplication {

	@Autowired
	private RequestMappingHandlerAdapter handlerAdapter;

	public static void main(String[] args) {
		SpringApplication.run(AuctionAppApplication.class, args);
	}

	@EventListener
	public void handleContextRefresh(ContextRefreshedEvent event) {
		// the solution to serializing instants as timestamps
		// see https://github.com/FasterXML/jackson-modules-java8/issues/11#issuecomment-913199874 for more info
		// spring.jackson.serialization.write-dates-as-timestamps=false setting does not work in our configuration
		// and neither does setting jackson config

		handlerAdapter
				.getMessageConverters()
				.forEach(c -> {
					if (c instanceof MappingJackson2HttpMessageConverter jsonMessageConverter) {
						ObjectMapper objectMapper = jsonMessageConverter.getObjectMapper();
						objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
					}
				});
	}

}
