# Media Review Platform



## Live Demo

🔗 **Frontend (Vercel):** [https://media-review-platform.vercel.app/](https://media-review-platform.vercel.app/)
🔗 **Backend (Render):** [https://media-review-backend-hutb.onrender.com/](https://media-review-backend-hutb.onrender.com/)

---

## Overview

The Media Review Platform is a full-stack web application designed to allow users to discover, review, and discuss various forms of media, including Games, TV Shows, Films & more. It features secure user authentication and comprehensive CRUD (Create, Read, Update, Delete) functionalities for reviews, enhanced by search and filtering capabilities.

This application demonstrates a robust understanding of modern web development principles, from database design and API development to responsive UI/UX and secure deployment.

## Features

### User Management & Authentication
* **Secure User Registration & Login:** Users can create accounts and log in securely using JWT (JSON Web Token) based authentication. Passwords are securely hashed with `bcryptjs`.
* **User Logout:** Clear session data and redirect unauthenticated users.
* **Global Authentication State:** Frontend utilizes React Context API to manage user login status across the application.
* **Protected Routes:** Both backend API endpoints and frontend UI routes are secured, ensuring only authenticated and authorized users can access sensitive functionalities (e.g., creating/editing/deleting reviews).

### Review Management (Full CRUD)
* **Create Reviews:** Logged-in users can submit new reviews for media titles with ratings and text.
* **View All Reviews:** Publicly accessible page displaying all reviews in the system.
* **View Single Review:** Ability to view details of a specific review.
* **Edit Reviews:** Users can update their own reviews via a dedicated form pre-filled with existing data.
* **Delete Reviews:** Users can remove their own reviews, with robust ownership checks on the backend.
* **User-Specific Reviews:** A "My Reviews" dashboard allows logged-in users to view only their submitted reviews.

### Content Discovery
* **Search Functionality:** Filter reviews by keywords in their media title.
* **Type Filtering:** Filter reviews by specific media types
* **Rating Filtering:** Filter reviews by a minimum star rating.
* **Toggleable Filters:** A clean UI to show/hide filter options.

### Technical & Architectural Highlights
* **Monorepo Structure:** Organized into `client/` (React frontend) and `server/` (Node.js backend) directories.
* **RESTful API Design:** Clear and well-defined API endpoints for all operations.
* **Centralized Error Handling:** Robust error management on the backend provides consistent JSON error responses.
* **Frontend-Backend Communication:** Seamless interaction between services using Axios and development proxy configuration.
* **Data Persistence:** User and review data stored securely in a cloud-hosted database.

## Technologies Used

### Frontend
* **React:** JavaScript library for building user interfaces.
* **Vite:** Fast frontend build tool.
* **React Router DOM:** Declarative routing for navigation.
* **Axios:** Promise-based HTTP client for API requests.
* **React Context API:** Global state management for authentication.
* **CSS:** For custom styling and responsive design.

### Backend
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated web framework for API development.
* **MongoDB (MongoDB Atlas):** Cloud-hosted NoSQL database.
* **Mongoose:** Object Data Modeling (ODM) for MongoDB and Node.js.
* **`bcryptjs`:** For password hashing.
* **`jsonwebtoken`:** For JWT creation and verification.
* **`cors`:** Middleware for handling Cross-Origin Resource Sharing.
* **`dotenv`:** For managing environment variables.
* **`express-async-handler`:** For simplified asynchronous error handling.

### Deployment
* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

## Getting Started (Local Development)

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mints1104/Media-Review-Platform.git](https://github.com/Mints1104/Media-Review-Platform.git)
    cd Media-Review-Platform
    ```

2.  **Backend Setup:**
    * Navigate into the `server` directory: `cd server`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `server` directory and add your MongoDB Atlas URI and JWT Secret (get these from MongoDB Atlas and generate a random string, respectively):
        ```
        PORT=5000
        MONGO_URI=mongodb+srv://YOUR_DB_USERNAME:YOUR_DB_PASSWORD@yourcluster.mongodb.net/?retryWrites=true&w=majority&appName=yourAppName
        JWT_SECRET=YOUR_VERY_LONG_RANDOM_SECRET_KEY
        ```
    * Start the backend server: `npm run dev`

3.  **Frontend Setup:**
    * Open a **new terminal window**.
    * Navigate into the `client` directory: `cd client`
    * Install dependencies: `npm install`
    * Start the frontend development server: `npm run dev`

4.  **Access the App:**
    * Open your browser and navigate to `http://localhost:5173/`.

## Challenges & Learnings
* **Managing Full-Stack Architecture:** Understanding how frontend and backend components interact (services, API design, middleware).
* **Authentication & Authorization:** Implementing secure JWT-based authentication and handling both backend (ownership checks) and frontend (private routes) authorization.
* **Deployment Workflow:** Navigating the challenges of deploying a monorepo across different services (Vercel for frontend, Render for backend) and troubleshooting cross-origin communication (CORS).
* **Debugging Complex Issues:** Pinpointing errors spanning multiple layers, from frontend `404`s due to proxy misconfiguration to backend `500`s and subtle CORS policy violations.
* **React State Management:** Effectively using `useState`, `useEffect`, and Context API for global state and dynamic UI updates.

---

## License

This project is licensed under the MIT License.
