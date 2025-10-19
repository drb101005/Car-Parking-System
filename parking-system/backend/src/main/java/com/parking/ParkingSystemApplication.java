package com.parking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ParkingSystemApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ParkingSystemApplication.class, args);
        System.out.println("\n✅ Backend started successfully on http://localhost:8080");
        System.out.println("📊 Access APIs at http://localhost:8080/api/");
    }
}