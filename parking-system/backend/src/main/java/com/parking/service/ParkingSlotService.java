package com.parking.service;

import com.parking.model.ParkingSlot;
import com.parking.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParkingSlotService {
    @Autowired
    private ParkingSlotRepository slotRepository;
    
    public List<ParkingSlot> getAllSlots() {
        return slotRepository.findAll();
    }
    
    public List<ParkingSlot> getAvailableSlots() {
        return slotRepository.findByIsAvailable(true);
    }
    
    public List<ParkingSlot> getSlotsByDivision(String division) {
        return slotRepository.findByDivision(division);
    }
    
    public ParkingSlot getSlotById(Long id) {
        return slotRepository.findById(id).orElseThrow();
    }
    
    public ParkingSlot updateSlotAvailability(Long id, boolean isAvailable) {
        ParkingSlot slot = slotRepository.findById(id).orElseThrow();
        slot.setAvailable(isAvailable);
        return slotRepository.save(slot);
    }
    
    public ParkingSlot createSlot(ParkingSlot slot) {
        return slotRepository.save(slot);
    }
}