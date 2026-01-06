#  project - Community Food Sharing Platform

###  Live Site:   https://wonderful-gnome-772c45.netlify.app/
###  Server (API): https://community-food-sharing-server-iota.vercel.app/


---

#  Project Overview

**PlateShare** is a full-stack MERN (MongoDB, Express, React, Node) web application that connects communities through food sharing.  
Users can share surplus food to reduce waste, and others can browse and request these items easily.

This project focuses on **community engagement**, **real-time food availability**, and **user-friendly interaction** using secure Firebase authentication and a responsive UI.

---
✨ Features
🔐 User Authentication

Secure authentication using Firebase Authentication

Login and registration with Email/Password and Google Sign-In

Real-time authentication state handling

User-friendly success and error notifications

👤 User Profile & Role Management

Automatically sync authenticated users with MongoDB

Store and manage user roles (Admin / User)

Profile page displays:

User name, email, and profile photo

User role (Admin or User)

Total foods shared by the user

Total foods requested by the user

🍽️ Food Sharing System

Users can add surplus food items

Edit and delete their own shared foods

Food status management:

Available

Requested

📥 Food Request System

Users can request available food items

Food status updates automatically after a request

Users can view all their requested foods in one place

🔒 Private & Protected Routes

Access control for authenticated users only

Protected routes include:

Add Food

Manage My Foods

My Requests

Food Details

🛠️ Role-Based Access Control (RBAC)

Admin-only permissions for:

Deleting foods

Updating foods

Viewing all users (backend protected)

Prevents unauthorized access using server-side verification

-------------
Admin email : admin@gmail.com
Admin pass : 123456789
User email :am@gmail.com
User pass : 12345678
------------------

📱 Responsive & Modern UI

Fully responsive design using Tailwind CSS

Optimized for mobile, tablet, and desktop devices

Clean, modern, and user-friendly interface

⏳ Loading & Error Handling

Loading spinner displayed during data fetching

Graceful error handling for server and network issues

Custom 404 Not Found error page with navigation support

⚡ Performance & User Experience

Smooth navigation using React Router

Animated count-up statistics on the profile page

Optimized API calls and efficient state management

---

#  Pages & Routes

##  Public Routes
- `/` → **Home** (Banner, Featured Foods, How It Works, Mission)
- `/available-foods` → All available foods
- `/login` → User login page
- `/register` → New user registration
- `/food/:id` → Food details and Request button
##  Private Routes
- `/add-food` → Add new food
- `/manage-foods` → Manage user’s own added foods
- `/update-food/:id` → Update food details
- `/my-requests` → View requested foods


---

#  Tech Stack

| Technology | Purpose |
|----------------|-------------------|
| **React.js** | Frontend framework |
| **Tailwind CSS** | Styling and responsiveness |
| **Firebase Auth** | User authentication |
| **Express.js** | Server-side framework |
| **MongoDB Atlas** | Database |
| **Vercel** | Backend hosting |
| **Netlify / Surge / Firebase Hosting** | Frontend hosting |




#  Environment Variables (.env)

Create a `.env` file in both client and server:

##  Server (.env)
