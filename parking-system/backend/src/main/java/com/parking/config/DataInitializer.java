package com.parking.config;

import com.parking.model.ParkingSlot;
import com.parking.model.User;
import com.parking.repository.ParkingSlotRepository;
import com.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private ParkingSlotRepository slotRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) {
        // Initialize admin user
        if (userRepository.count() == 0) {
            User admin = new User("Admin", "admin@parking.com", "9999999999", "admin123");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            
            User testUser = new User("John Doe", "john@test.com", "9876543210", "test123");
            userRepository.save(testUser);
        }
        
        // Initialize parking slots
        if (slotRepository.count() == 0) {
            String[] divisions = {"A", "B", "C"};
            for (String division : divisions) {
                for (int i = 1; i <= 10; i++) {
                    ParkingSlot slot = new ParkingSlot(division + i, division);
                    slotRepository.save(slot);
                }
            }
        }
    }
}