package com.appdynamics.lambda_demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LambdaDemoApplication {

	static final Logger logger = LoggerFactory.getLogger(LambdaDemoApplication.class);

	public static void main(String[] args) {
		for(String arg:args) {
            logger.info(arg);
        }
		SpringApplication.run(LambdaDemoApplication.class, args);
	}

}
