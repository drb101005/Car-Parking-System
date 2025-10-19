# 🚗 Smart Parking System Management Web Application

A full-stack web application for managing parking slots, bookings, and payments with real-time availability tracking.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.5-brightgreen)
![React](https://img.shields.io/badge/React-18.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Java](https://img.shields.io/badge/Java-17-red)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### User Features
- 🔐 **User Registration & Login** - Secure authentication system
- 🅿️ **Real-time Slot Availability** - View available parking slots across divisions
- 📅 **Booking Management** - Book slots with custom date/time selection
- 🚗 **Vehicle Information** - Add vehicle number during booking
- 💳 **Payment Integration** - Calculate and process parking fees
- ⏰ **Countdown Timer** - Track remaining time for active bookings
- 🔍 **Search & Filter** - Find slots by division or slot number
- 📊 **Booking History** - View past and current bookings
- ❌ **Quick Cancel** - Cancel bookings with one click
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 🔄 **Auto-refresh** - Slots update every 30 seconds

### Admin Features
- 📈 **Analytics Dashboard** - View key metrics and statistics
- 📊 **Division-wise Reports** - Visual representation of slot capacity
- 👥 **User Management** - View all registered users
- 📋 **Booking Monitoring** - Track all bookings in real-time
- 🅿️ **Slot Management** - Monitor all parking slots and their status
- 💰 **Revenue Tracking** - Track total revenue from bookings

### Smart Features
- 🟢 **Color-coded Slots** - Green (Available), Red (Occupied), Blue (Your Booking), Orange (Expiring Soon)
- ⚡ **Instant Updates** - Real-time slot status updates
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🕐 **Live Clock** - Real-time date and time display
- ✉️ **Mock Email Confirmation** - Booking confirmation messages

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA (Hibernate)
- **Build Tool**: Maven
- **Architecture**: RESTful API

### Frontend
- **Framework**: React 18.0
- **Language**: JavaScript (JSX)
- **Styling**: Pure CSS (No frameworks)
- **HTTP Client**: Fetch API
- **State Management**: React Hooks (useState, useEffect, useCallback)

### Database Schema
- **Users Table**: User authentication and profiles
- **Parking Slots Table**: Slot information and availability
- **Bookings Table**: Booking records and payment status

---

## 📦 Prerequisites

Before running this application, ensure you have:

- ☕ **Java Development Kit (JDK) 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- 🛢️ **MySQL Server 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- 📦 **Node.js 16+ and npm** - [Download](https://nodejs.org/)
- 🔨 **Apache Maven 3.8+** - [Download](https://maven.apache.org/download.cgi)
- 💻 **VS Code or IntelliJ IDEA** (Recommended)

---

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/Car-Parking-System.git
cd Car-Parking-System
```

### Step 2: Setup Database
Open MySQL Command Line or MySQL Workbench and run:
```sql
CREATE DATABASE parking_system;
```

### Step 3: Configure Backend
Navigate to `backend/src/main/resources/application.properties` and update:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 4: Build and Run Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start at: `http://localhost:8080`

### Step 5: Install and Run Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```

Frontend will open automatically at: `http://localhost:3000`

---

## 👨‍💼 Usage

### Default Login Credentials

**Admin Account:**
```
Email: admin@parking.com
Password: admin123
```

**Test User Account:**
```
Email: john@test.com
Password: test123
```

### User Workflow
1. Register/Login to your account
2. Browse available parking slots (color-coded by availability)
3. Click on an available (green) slot
4. Enter vehicle number, start time, and end time
5. Review estimated cost
6. Proceed to payment and select payment method
7. Complete booking and receive confirmation
8. View/cancel bookings in "My Bookings" section

### Admin Workflow
1. Login with admin credentials
2. View dashboard with real-time statistics
3. Monitor all bookings across users
4. Check user registrations
5. Track slot occupancy by division
6. View total revenue

---

## 🔌 API Endpoints

### User APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | User login |
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |

### Parking Slot APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/slots` | Get all slots |
| GET | `/api/slots/available` | Get available slots |
| GET | `/api/slots/division/{division}` | Get slots by division |
| GET | `/api/slots/{id}` | Get slot by ID |
| PUT | `/api/slots/{id}/availability` | Update slot availability |
| POST | `/api/slots` | Create new slot |

### Booking APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| GET | `/api/bookings/user/{userId}` | Get user bookings |
| POST | `/api/bookings` | Create booking |
| PUT | `/api/bookings/{id}/payment` | Update payment status |
| DELETE | `/api/bookings/{id}` | Cancel booking |

---

## 📁 Project Structure
```
Car-Parking-System/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/parking/
│   │       │   ├── ParkingSystemApplication.java    # Main application class
│   │       │   ├── config/                          # Configuration classes
│   │       │   │   ├── DataInitializer.java         # Sample data loader
│   │       │   │   └── WebConfig.java               # CORS configuration
│   │       │   ├── controller/                      # REST Controllers
│   │       │   │   ├── UserController.java
│   │       │   │   ├── ParkingSlotController.java
│   │       │   │   └── BookingController.java
│   │       │   ├── model/                           # Entity classes
│   │       │   │   ├── User.java
│   │       │   │   ├── ParkingSlot.java
│   │       │   │   └── Booking.java
│   │       │   ├── repository/                      # JPA Repositories
│   │       │   │   ├── UserRepository.java
│   │       │   │   ├── ParkingSlotRepository.java
│   │       │   │   └── BookingRepository.java
│   │       │   └── service/                         # Business logic
│   │       │       ├── UserService.java
│   │       │       ├── ParkingSlotService.java
│   │       │       └── BookingService.java
│   │       └── resources/
│   │           └── application.properties           # Application configuration
│   └── pom.xml                                      # Maven dependencies
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/                              # React Components
│   │   │   ├── Login.js / Login.css                # Authentication
│   │   │   ├── Dashboard.js / Dashboard.css        # User dashboard
│   │   │   ├── AdminDashboard.js / AdminDashboard.css  # Admin panel
│   │   │   ├── SlotGrid.js / SlotGrid.css          # Slot visualization
│   │   │   ├── BookingModal.js / BookingModal.css  # Booking form
│   │   │   ├── PaymentModal.js / PaymentModal.css  # Payment interface
│   │   │   └── MyBookings.js / MyBookings.css      # Booking history
│   │   ├── App.js / App.css                        # Main app component
│   │   └── index.js / index.css                    # Entry point
│   ├── package.json                                 # npm dependencies
│   └── README.md
│
└── README.md                         # This file
```

---

## 📸 Screenshots

### User Dashboard

<img width="1918" height="993" alt="image" src="https://github.com/user-attachments/assets/f37886a6-32c5-474c-9233-d01ef7174080" />




### Parking Slot Grid
<img width="1908" height="982" alt="image" src="https://github.com/user-attachments/assets/560d4cad-05e8-4859-8b89-0a9f972b7712" />

### Booking Modal
<img width="504" height="680" alt="image" src="https://github.com/user-attachments/assets/65b43b8c-637f-4b48-99f4-3779f10a2344" />


### Admin Dashboard
<img width="1905" height="949" alt="image" src="https://github.com/user-attachments/assets/fa80c06f-ce4b-4aca-9cc0-66da9c3ac460" />
---

## 🔧 Configuration

### Backend Configuration (`application.properties`)
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/parking_system
spring.datasource.username=root
spring.datasource.password=your_password

# Server
server.port=8080

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

### Frontend Configuration
API base URL is set to `http://localhost:8080/api` in component files.

---

## 🐛 Troubleshooting

### Backend Issues
**Database Connection Failed:**
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure database `parking_system` exists

**Port 8080 Already in Use:**
- Change port in `application.properties`: `server.port=8081`
- Update frontend API calls accordingly

### Frontend Issues
**Cannot Connect to Backend:**
- Ensure backend is running on port 8080
- Check browser console for CORS errors

**npm Install Fails:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

---

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
mvn clean package
java -jar target/parking-system.jar
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your hosting service
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📝 Future Enhancements

- [ ] Real email notifications
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] QR code generation for bookings
- [ ] Mobile app (React Native)
- [ ] Advanced analytics with charts
- [ ] Parking slot reservation in advance
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Integration with Google Maps

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- MySQL Documentation
- Stack Overflow Community

---

## 📞 Contact

For any queries or support:
- Email: drb101005@gmail.com
- GitHub: drb101005
- LinkedIn: Dhruv Bandikatte

---

## ⭐ Star this Repository

If you found this project helpful, please give it a ⭐!

---

**Made with ❤️ using Spring Boot, React, and MySQL**
