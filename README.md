# QuickDispatch - Taxi Dispatch System

## Project Overview

QuickDispatch is a modern taxi dispatch system b#### Phase 4: Driver & Vehicle Management System (Weeks 3-4, 2025) - **COMPLETED** ✅
**Priority: High** - Core operational management

- [x] **Driver Management System**
  - [x] Driver list with status indicators
  - [x] Driver creation and editing interface
  - [x] Status management (active/inactive)
  - [x] User account linking capabilities
  - [x] Emergency contact management
  - [x] Role synchronization with user accounts

- [x] **Vehicle Fleet Management**
  - [x] Vehicle inventory management
  - [x] Vehicle creation and editing
  - [x] Unique identification (VIN, license plates)
  - [x] Status tracking (active/inactive)
  - [x] Vehicle details (make, model, year, color)

#### Phase 5: Core Feature Foundation (August 2025) - **IN PROGRESS** 🚧
**Priority: Critical** - Frontend infrastructure for real-time features

- [x] **WebSocket Infrastructure** ✅
  - [x] Action Cable integration
  - [x] Real-time connection management
  - [x] Authentication channel setup
  - [x] Location tracking WebSocket
  - [x] Message handling framework
  
- [x] **Route Structure** ✅
  - [x] Call Board route (`/call-board`)
  - [x] My Calls route (`/my-calls`) 
  - [x] Shifts route (`/shifts`)
  - [x] Reports route (`/reports`)
  
- [x] **GPS Location Services** ✅
  - [x] WebSocket location tracking
  - [x] Mobile device detection
  - [x] Real-time GPS data transmission
  - [x] Native Android integration support

- [ ] **Call Management UI** 🚧
  - [ ] Call board interface (routes exist, components needed)
  - [ ] Call creation forms
  - [ ] Driver assignment interface
  - [ ] Real-time call status updates

- [ ] **Shift Management UI** 🚧
  - [ ] Shift tracking interface (routes exist, components needed)
  - [ ] Driver shift dashboard
  - [ ] Shift creation and editingrontend and Rails API backend. This project provides comprehensive features for taxi operations including authentication, driver management, call dispatching, scheduling, and reporting with real-time updates and mobile optimization.

## Current Status: **Phase 4 Complete - Phase 5 Foundation Started** 🚧

**Last Updated**: August 8, 2025  
**Current Progress**: 75% Complete

## 🎯 Current Implementation Status

### ✅ Completed Features

#### Phase 1: API Foundation & Authentication (Complete)
- [x] **devise-jwt authentication** - JWT-based auth system implemented
- [x] **User model with role-based access** - Supports user, driver, dispatcher, manager, owner, admin roles
- [x] **JSON serializer setup** - User serialization implemented
- [x] **Basic API endpoints** - Authentication endpoints `/login`, `/logout`, `/signup`
- [x] **CORS configuration** - Cross-origin requests enabled for React frontend

#### Phase 2: React Foundation & Core UI (Complete)
- [x] **React 19 with Vite** - Modern build tooling setup
- [x] **Project structure** - Organized component, page, and utility structure
- [x] **React Router** - Navigation with protected routes implementation
- [x] **TailwindCSS** - Modern utility-first CSS framework
- [x] **Authentication system** - Login/logout with JWT token management
- [x] **User registration** - Complete signup flow with validation
- [x] **Session persistence** - Cookie-based session management
- [x] **Role-based access control** - Foundation for user permissions
- [x] **Mobile-first responsive design** - Capacitor integration for mobile apps

#### Current Tech Stack (Implemented)
- **Frontend**: React 19, Vite, TailwindCSS, React Router DOM, React Cookie
- **Backend**: Rails 7.2 API, devise-jwt, MySQL
- **Testing**: RSpec, FactoryBot, SimpleCov, Database Cleaner, WebMock, VCR ⭐
- **Mobile**: Capacitor for iOS/Android deployment
- **State Management**: React Context (AuthContext)
- **Validation**: Custom validation utilities
- **Build**: Vite with ESLint

### 🚧 In Progress

#### Phase 3: User Management & Dashboard Foundation (Current)
- [x] **User profile management API** - Profile update endpoints implemented
- [x] **User preferences API** - Dark mode and settings endpoints
- [x] **Password change functionality** - Secure password update system
- [x] **Dashboard layout component** - Role-based sidebar navigation
- [x] **Dashboard routing** - Role-specific dashboard layouts
- [x] **User profile UI** - Tabbed interface for profile/preferences/password
- [x] **User management interface** - Complete CRUD operations for users (admin/manager)
- [x] **Role assignment interface** - Role-based permissions management
- [x] **Driver management system** - Complete driver CRUD with status management
- [x] **Vehicle management system** - Complete vehicle fleet management
- [ ] **Dark mode implementation** - User preference support (Frontend only)
- [ ] **Role-based dashboard content** - Specific widgets per role

### 📋 Next Phase Priorities

## 🎯 Project TODO List

### Frontend Development
- [ ] **Calls Implementation**
	- [ ] **Lineup Grouping** #feature - Group related calls for efficient dispatching
	- [ ] **Address Link to GPS** #feature - Integrate addresses with GPS navigation
	- [ ] **Auto Calculate Distance for Calls** #feature - Automatic distance calculation between locations
- [ ] **Shifts Implementation** - Complete shift management interface
- [ ] **Tills Implementation** - Cash handling and reconciliation system
- [ ] **Driver GPS Ping** - Real-time driver location tracking
- [ ] **Driver Map** - Interactive map showing driver positions
- [ ] **Driver OnShift Dashboard** - Dashboard for active drivers
- [ ] **Dispatcher OnShift Dashboard** - Real-time dispatch operations interface
- [ ] **Schedule System** - Complete scheduling functionality
	- [ ] **Schedule Editor** - Interface for creating/editing schedules
	- [ ] **Schedule Viewer** - Read-only schedule display
	- [ ] **Availability Management** - Driver availability tracking
	- [ ] **Request Time Off** - Time-off request system
- [ ] **Messaging System** - In-app communication platform

### Backend Development
- [ ] **WebSocket Implementation**
	- [ ] **Calls CRUD** - Real-time call operations via WebSocket
	- [ ] **Shift CRUD** - Real-time shift operations via WebSocket
	- [ ] **Driver Location (Req, Rec)** - Driver location requests and reception
	- [ ] **Message Rooms** - Chat room functionality
		- [ ] **Support Voice Messages (REQUIRED)** - Voice message recording and playback
			- [ ] **Transcription** - Optional voice-to-text transcription
		- [ ] **DM P-2-P** - Person-to-person direct messaging
		- [ ] **Dispatchers Chat** - Dispatcher team communication
		- [ ] **Drivers Chat** - Driver team communication
		- [ ] **Driver Shift Chat** - Shift-specific driver communication
- [ ] **HTTP API Extensions**
	- [ ] **Calls CRUD** - Complete call management API
		- [ ] **Call Methods** - Additional call-related functionality
	- [ ] **Shifts CRUD** - Complete shift management API
	- [ ] **Shift Methods** - Additional shift-related functionality

#### Phase 3: User Management & Dashboard (Weeks 2-3, 2025)
**Priority: High** - Foundation for all user interactions

- [x] **Dashboard Components**
  - [x] Driver dashboard layout with shift status
  - [x] Dispatcher dashboard with call management interface  
  - [x] Manager dashboard with system overview
  - [x] Role-based routing and access control

- [x] **User Management Interface**
  - [x] User profile editing and preferences
  - [x] Role assignment interface (admin/manager only)
  - [x] User settings with dark mode toggle
  - [x] Password change functionality

#### Phase 4: Driver & Vehicle Management (Weeks 3-4, 2025) - **COMPLETED** ✅
**Priority: High** - Core operational management

- [x] **Driver Management System**
  - [x] Driver list with status indicators
  - [x] Driver creation and editing interface
  - [x] Status management (active/inactive)
  - [x] User account linking capabilities
  - [x] Emergency contact management
  - [x] Role synchronization with user accounts

- [x] **Vehicle Fleet Management**
  - [x] Vehicle inventory management
  - [x] Vehicle creation and editing
  - [x] Unique identification (VIN, license plates)
  - [x] Status tracking (active/inactive)
  - [x] Vehicle details (make, model, year, color)

#### Phase 5: Core Feature APIs (Weeks 5-7, 2025)
**Priority: Critical** - Backend API development

- [x] **Expand Rails API** ✅ **COMPLETED**
  - [x] Call management system
  - [x] Shift tracking APIs
  - [x] Real-time WebSocket setup (Action Cable)
  
**Note**: *Backend Phase 5 is complete. Frontend is catching up with UI implementation.*

### 🔄 Recently Completed (July 2025)

1. **Project Infrastructure**
   - Set up Vite-based React development environment
   - Configured TailwindCSS for modern styling
   - Implemented React Router with protected routes

2. **Authentication System**
   - Complete JWT-based authentication flow
   - User registration with comprehensive validation
   - Session persistence using secure cookies
   - Role-based user system foundation

3. **Mobile Support**
   - Capacitor integration for native mobile app deployment
   - Responsive design implementation
   - Mobile-first development approach

4. **🆕 Backend Testing Framework** ⭐
   - **Comprehensive RSpec test suite** - 95%+ code coverage target
   - **Model testing** - User model with role validation and authentication
   - **Controller testing** - Authentication, registration, and API endpoints
   - **Request testing** - Complete API endpoint validation
   - **Integration testing** - End-to-end authentication flow testing
   - **Factory Bot** - Test data generation with realistic scenarios
   - **Test utilities** - JWT helpers, database cleaning, and mock data
   - **Coverage reporting** - SimpleCov integration with detailed reports

5. **🆕 Phase 3: User Management System** ⭐ (June 16, 2025)
   - **User Profile API** - Complete CRUD operations for user details
   - **User Preferences API** - Settings management including dark mode
   - **Password Management** - Secure password change functionality
   - **Dashboard Framework** - Role-based navigation and layout system
   - **Protected Routing** - Enhanced route protection with role checking
   - **Profile Management UI** - Tabbed interface for user settings

6. **🆕 Phase 5: WebSocket & Real-time Infrastructure** ⭐ (August 8, 2025)
   - **Action Cable Integration** - Complete WebSocket infrastructure with Rails backend
   - **Real-time Authentication** - Secure WebSocket authentication channel
   - **Location Tracking Services** - GPS tracking with mobile device support
   - **WebSocket Location Class** - Comprehensive location management utility
   - **Message Framework** - Foundation for real-time messaging system
   - **Route Infrastructure** - Routes established for calls, shifts, and reports
   - **Dashboard Enhancements** - Role-based dashboard content with real-time data placeholders
7. **🆕 Phase 4: Driver & Vehicle Management System** ⭐ (July 3, 2025)
   - **Driver Management API** - Complete CRUD operations for driver records
   - **Driver-User Integration** - Automatic role synchronization system
   - **Emergency Contacts** - JSON-based contact management system
   - **Vehicle Fleet API** - Complete vehicle inventory management
   - **Vehicle Database** - Comprehensive vehicle tracking with unique constraints
   - **Role-Based Access** - Manager+ access control for fleet operations
   - **Status Management** - Active/inactive tracking for drivers and vehicles
   - **Data Validation** - Comprehensive backend validation for all entities

## 🏗️ Technical Architecture

### Current Implementation
```
Frontend (React + Vite)
├── Authentication System ✅
├── Routing & Navigation ✅
├── User Context Management ✅
├── Mobile Responsive Design ✅
├── Component Structure ✅
├── User Management UI ✅
├── Driver Management UI ✅
├── Vehicle Management UI ✅
├── WebSocket Infrastructure ✅
├── GPS Location Services ✅
└── Call/Shift UI Components 🚧

Backend (Rails API)
├── JWT Authentication ✅
├── User Management ✅
├── Role-Based Access ✅
├── CORS Configuration ✅
├── API v1 Structure ✅
├── Driver Management ✅
├── Vehicle Management ✅
├── Call Management ✅
├── Shift Management ✅
├── WebSocket Integration ✅
└── Location Tracking ✅

Database (MySQL)
├── Users Table ✅
│   ├── Role-based permissions
│   ├── JWT token management
│   └── User preferences
├── Drivers Table ✅
│   ├── Status management
│   ├── Emergency contacts
│   └── User account linking
└── Vehicles Table ✅
    ├── Fleet inventory
    ├── Unique identifiers
    └── Status tracking
├── Calls Table ✅
│   ├── Call dispatch and tracking
│   ├── Status management
│   └── Driver assignments
├── Shifts Table ✅
│   ├── Shift scheduling
│   ├── Driver assignments
│   └── Time tracking
└── LocationHistory Table ✅
    ├── GPS coordinates
    ├── Real-time tracking
    └── Location history
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- Rails 7.2+
- MySQL 8.0+
- Git

### Quick Start

#### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

#### Backend Setup  
```bash
cd Backend
bundle install
rails db:create db:migrate
rails server
```

### Available Scripts

#### Frontend
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend
- `rails server` - Start Rails API server
- `rails db:migrate` - Run database migrations
- `rails console` - Open Rails console

### Environment Configuration
- **Frontend**: Runs on `http://localhost:5173` (Vite default)
- **Backend**: Runs on `https://qtapp.jajliardo.com` (production) or `localhost:4000` (development)
- **API Base**: `/api/v1/`

## 📱 Mobile Development

### Capacitor Integration
The project includes Capacitor for native mobile app deployment:

```bash
# Build and sync mobile apps
npm run build
npx cap sync
npx cap open android  # For Android
npx cap open ios      # For iOS
```

## 🔐 Authentication Flow

### Current Implementation
1. **Login/Registration** - JWT token generation
2. **Token Storage** - Secure cookie storage with 7-day expiration
3. **Auto-Authentication** - Automatic login validation on app load
4. **Protected Routes** - Role-based route access control
5. **Session Management** - Persistent login state across browser sessions

### API Endpoints (Implemented)
```
POST /login              - User authentication
POST /signup             - User registration  
DELETE /logout           - User logout
GET /current_user        - Get current user info
GET /api/v1/status       - API health check

PUT /api/v1/users/profile - Update user profile
PUT /api/v1/users/preferences - Update user preferences
PUT /api/v1/users/change_password - Change user password
GET /api/v1/users/getUsers - Get all users (admin)
PUT /api/v1/users/update_user/:id - Update user (admin)
DELETE /api/v1/users/delete_user/:id - Delete user (admin)

GET /api/v1/drivers/getDrivers - Get all drivers
POST /api/v1/drivers/create_driver - Create driver
PUT /api/v1/drivers/update_driver/:id - Update driver
DELETE /api/v1/drivers/delete_driver/:id - Delete driver

GET /api/v1/vehicles/getVehicles - Get all vehicles
POST /api/v1/vehicles/create_vehicle - Create vehicle
PUT /api/v1/vehicles/update_vehicle/:id - Update vehicle
DELETE /api/v1/vehicles/delete_vehicle/:id - Delete vehicle
```

## 🚀 Upcoming Development Phases

### Phase 4: Dashboard System (Weeks 2-4, 2025)
**Priority: High**

#### 4.1 Driver Dashboard
- [ ] Active shift status display
- [ ] Current calls list
- [ ] Earnings summary
- [ ] Shift controls (start/end)
- [ ] Call status updates
- [ ] Mobile-optimized interface

#### 4.2 Dispatcher Dashboard
- [ ] Live call board
- [ ] Driver status overview
- [ ] Call assignment interface
- [ ] Weather widget
- [ ] Real-time updates
- [ ] Quick actions panel

#### 4.3 Manager Dashboard
- [ ] System overview metrics
- [ ] Reports summary
- [ ] User management access
- [ ] Performance indicators
- [ ] Alert notifications

### Phase 5: Call Management System (Weeks 5-8, 2025)
**Priority: Critical**

#### 5.1 Call Board Interface
- [ ] Real-time call list
- [ ] Call status indicators
- [ ] Drag-and-drop assignment
- [ ] Call filtering and sorting
- [ ] Quick call creation
- [ ] Call history view

#### 5.2 Call Management Features
- [ ] Call creation form (regular/cleared)
- [ ] Driver assignment interface
- [ ] Location autocomplete
- [ ] Payment processing (split payments)
- [ ] Tip management
- [ ] Call notes and history

#### 5.3 Real-time Updates
- [ ] WebSocket connection setup
- [ ] Live call status updates
- [ ] Driver location updates
- [ ] Notification system
- [ ] Sound alerts

### Phase 6: Shift Management (Weeks 8-12, 2025)
**Priority: High**

#### 6.1 Shift Management
- [ ] Shift start/end interface
- [ ] Active shifts monitoring
- [ ] Shift history
- [ ] Earnings calculation
- [ ] Expense tracking
- [ ] Till entry management

### Phase 7: Advanced Features (Weeks 12-16, 2025)
**Priority: Medium**

#### 7.1 Reporting & Analytics
- [ ] KPI reports (daily, weekly, monthly, yearly)
- [ ] Driver earnings reports
- [ ] Shift activity reports
- [ ] Data visualization (charts/graphs)
- [ ] Export functionality (PDF, Excel)

#### 7.2 Scheduling System
- [ ] Weekly schedule grid
- [ ] Driver availability view
- [ ] Schedule preferences
- [ ] Template management
- [ ] Recurring schedules

#### 7.3 Mobile & Performance
- [ ] Progressive Web App (PWA)
- [ ] Offline functionality
- [ ] Push notifications
- [ ] Performance optimization
- [ ] Code splitting & lazy loading

## 📊 Project Metrics

### Development Progress
- **Overall Progress**: 75% Complete
- **Backend API**: 80% Complete
- **Frontend UI**: 70% Complete (WebSocket infrastructure complete, UI components in progress)
- **Mobile App**: 60% Complete (GPS tracking implemented)
- **Testing**: 25% Complete

### Timeline Update
- **Started**: June 2025
- **Current Phase**: Phase 5 - UI Implementation (Backend infrastructure complete)
- **Expected Phase 6 Start**: September 2025
- **Estimated Completion**: November 2025

### Key Milestones Achieved
- ✅ Project setup and configuration
- ✅ Authentication system implementation
- ✅ Basic user management
- ✅ Mobile app foundation
- ✅ Responsive UI framework
- ✅ Role-based dashboard system
- ✅ User profile management
- ✅ Complete driver management
- ✅ Vehicle fleet management
- ✅ WebSocket infrastructure
- ✅ GPS location tracking
- ✅ Real-time connection framework

### Next Milestones (Q3 2025)
- 🎯 Complete call management UI components
- 🎯 Implement shift management interface 
- 🎯 Real-time dashboard updates with live data
- 🎯 Mobile GPS integration testing
- 🎯 Voice messaging UI implementation

## 🤝 Contributing

### Development Guidelines
1. **Branch Strategy**: Feature branches from `main`
2. **Code Style**: ESLint configuration enforced
3. **Testing**: Write tests for new features
4. **Documentation**: Update README for significant changes

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- **Project Manager**: Daniel Jajliardo
- **Lead Developer**: Daniel Jajliardo
- **Documentation**: Check project wiki

---

**Project**: QuickDispatch Taxi Dispatch System  
**Version**: 0.7.5 (Development)  
**Last Updated**: August 8, 2025  
**Next Review**: September 1, 2025
