package com.parking.controller;

import com.parking.model.Booking;
import com.parking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;
    
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
    
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }
    
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }
    
    @PutMapping("/{id}/payment")
    public ResponseEntity<Booking> updatePayment(
            @PathVariable Long id,
            @RequestBody Map<String, String> payment) {
        return ResponseEntity.ok(
            bookingService.updatePaymentStatus(id, payment.get("status"))
        );
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.ok(Map.of("message", "Booking cancelled successfully"));
    }
}