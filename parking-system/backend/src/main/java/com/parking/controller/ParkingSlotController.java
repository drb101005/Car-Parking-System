package com.parking.controller;

import com.parking.model.ParkingSlot;
import com.parking.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class ParkingSlotController {
    @Autowired
    private ParkingSlotService slotService;
    
    @GetMapping
    public List<ParkingSlot> getAllSlots() {
        return slotService.getAllSlots();
    }
    
    @GetMapping("/available")
    public List<ParkingSlot> getAvailableSlots() {
        return slotService.getAvailableSlots();
    }
    
    @GetMapping("/division/{division}")
    public List<ParkingSlot> getSlotsByDivision(@PathVariable String division) {
        return slotService.getSlotsByDivision(division);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlot> getSlotById(@PathVariable Long id) {
        return ResponseEntity.ok(slotService.getSlotById(id));
    }
    
    @PutMapping("/{id}/availability")
    public ResponseEntity<ParkingSlot> updateAvailability(
            @PathVariable Long id, 
            @RequestBody Boolean isAvailable) {
        return ResponseEntity.ok(slotService.updateSlotAvailability(id, isAvailable));
    }
    
    @PostMapping
    public ResponseEntity<ParkingSlot> createSlot(@RequestBody ParkingSlot slot) {
        return ResponseEntity.ok(slotService.createSlot(slot));
    }
}