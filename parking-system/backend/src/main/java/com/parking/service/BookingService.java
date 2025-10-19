package com.parking.service;

import com.parking.model.Booking;
import com.parking.model.ParkingSlot;
import com.parking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ParkingSlotService slotService;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    public Booking createBooking(Booking booking) {
        // Calculate total amount
        long hours = ChronoUnit.HOURS.between(booking.getStartTime(), booking.getEndTime());
        if (hours == 0) hours = 1; // Minimum 1 hour
        
        ParkingSlot slot = slotService.getSlotById(booking.getSlotId());
        booking.setTotalAmount(hours * slot.getHourlyRate());
        
        // Mark slot as unavailable
        slotService.updateSlotAvailability(booking.getSlotId(), false);
        
        return bookingRepository.save(booking);
    }
    
    public Booking updatePaymentStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setPaymentStatus(status);
        return bookingRepository.save(booking);
    }
    
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
        
        // Mark slot as available
        slotService.updateSlotAvailability(booking.getSlotId(), true);
    }
    
    // Manual method to complete expired bookings (call from frontend if needed)
    public void completeExpiredBookings() {
        LocalDateTime now = LocalDateTime.now();
        List<Booking> expiredBookings = bookingRepository.findByEndTimeBefore(now);
        
        for (Booking booking : expiredBookings) {
            if (booking.getStatus().equals("ACTIVE")) {
                booking.setStatus("COMPLETED");
                bookingRepository.save(booking);
                slotService.updateSlotAvailability(booking.getSlotId(), true);
            }
        }
    }
}