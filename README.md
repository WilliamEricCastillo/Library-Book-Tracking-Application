# Library Book Tracking Application


This is a simple library management system built with React for the frontend and Express.js for the backend.

## Features

- View available books
- Check out books
- Check in books
- View checked out books

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/library-management-system.git
    ```

2. Install dependencies for both the frontend and backend:

    ```bash
    cd library-management-system/frontend
    npm install
    cd ../backend
    npm install
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

4. Start the frontend server:

    ```bash
    npm start
    ```

## Frontend Structure

- `App.js`: Main component containing routing logic.
- `BooksCatalog.jsx`: Component to display available books and handle book checkout.
- `CheckOutBook.jsx`: Component for checking out books.
- `CheckOutBookPage.jsx`: Component for checking in books.
- `Available.jsx`: Component to display available books.
- `CheckIn.jsx`: Component for checking in books.
- `CheckOutForm.jsx`: Form component for checking out books.
- `NotAvailable.jsx`: Component to display checked out books.

## Backend Structure

- `db.js`: Express server with MongoDB for storing book data.

## Dependencies

- React
- React Router
- Express.js
- MongoDB
