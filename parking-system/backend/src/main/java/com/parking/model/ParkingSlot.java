package com.parking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "slot_number")
    private String slotNumber;
    
    private String division; // A, B, C
    private boolean isAvailable = true;
    
    @Column(name = "hourly_rate")
    private double hourlyRate = 50.0; // ₹50 per hour
    
    // Constructors
    public ParkingSlot() {}
    
    public ParkingSlot(String slotNumber, String division) {
        this.slotNumber = slotNumber;
        this.division = division;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getSlotNumber() { return slotNumber; }
    public void setSlotNumber(String slotNumber) { this.slotNumber = slotNumber; }
    
    public String getDivision() { return division; }
    public void setDivision(String division) { this.division = division; }
    
    public boolean isAvailable() { return isAvailable; }
    public void setAvailable(boolean available) { isAvailable = available; }
    
    public double getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(double hourlyRate) { this.hourlyRate = hourlyRate; }
}