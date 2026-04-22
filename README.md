# Advanced React E-Commerce App with Firebase

This project is an advanced e-commerce web app built with React, TypeScript, Vite, Redux Toolkit, React Query, and Firebase. I originally started the project using the FakeStore API, and then updated it to use Firebase Authentication and Firestore for user data, products, and orders.

The app allows users to register, log in, manage their profile, browse products, add products, edit and delete products, use a shopping cart, place orders, and view their order history.

## What This Project Does

This app works like a simple online store. Users can create an account, log in, browse products, add items to their cart, and place an order. Product and user data are stored in Firebase Firestore instead of using an external API.

Main features include:

- user registration with email and password
- user login and logout
- creating a user document in Firestore when a new account is registered
- viewing and updating a user profile
- deleting a user account and Firestore profile data
- fetching products from Firestore
- adding new products
- editing existing products
- deleting products
- adding products to a shopping cart
- removing one item at a time from the cart
- showing total quantity and total price in the cart
- saving cart data in `sessionStorage`
- placing orders and saving them in Firestore
- viewing order history
- viewing individual order details
- showing fallback placeholder images when product image links do not load

## What I Learned

This project helped me practice a lot of important React and Firebase concepts. Some of the main things I worked on were:

- setting up a React project with TypeScript using Vite
- using React Router for page navigation
- using Redux Toolkit for cart state management
- using React Query for data loading and refresh
- working with Firebase Authentication
- storing and reading data from Firestore
- creating reusable components
- using TypeScript interfaces for products, users, and orders
- using `sessionStorage` for cart persistence
- debugging Firebase setup issues and TypeScript errors

## Tech Stack

This project was built with:

- React
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- React Query
- Firebase Authentication
- Firebase Firestore

## Firebase Features Used

This app uses Firebase for:

- Authentication with email and password
- Firestore user documents
- Firestore product collection
- Firestore orders collection

## Project Structure

Here is the main folder structure used in this project:

- `src/components` for reusable UI components
- `src/pages` for page components
- `src/store` for Redux Toolkit state
- `src/firebase` for Firebase config and Firestore functions
- `src/context` for authentication context
- `src/types` for shared TypeScript types

## How to Run the Project

1. Clone the repository.
2. Open the project folder.
3. Install dependencies:

```bash
npm install

Start the development server:
npm run dev
Open the local Vite URL in your browser.
Firebase Setup
To run this project, Firebase must be set up first.

Firebase steps:
Create a Firebase project in the Firebase Console.
Add a web app to the Firebase project.
Enable Authentication.
Enable Email/Password sign-in.
Create a Firestore Database.
Add your Firebase config to the project.
Firestore collections used:
users
products
orders
Firestore rules for testing
During development, Firestore may need test rules enabled so reads and writes work while building the app.

How to Use the App
Register a new account.
Log in with your email and password.
Browse products on the Home page.
Add products to the cart.
Open the cart page to review items.
Remove items if needed.
Checkout to place an order.
Open the Orders page to view previous orders.
Open the Profile page to update your name and address.
Use the Add Product page to create products.
Edit or delete products from the product list.
Notes
This app includes image fallback handling. If a product image URL does not load, a placeholder image is shown instead so the layout still looks clean.

The cart is stored in sessionStorage, so cart items remain after refreshing the page until checkout clears the cart.

Order timestamps in Firestore may briefly show as pending right after checkout until Firebase finishes writing the server timestamp.

Future Improvements
If I continue working on this project later, some things I would like to improve are:

add stronger Firestore security rules
restrict product management to admin users only
improve product image handling with Firebase Storage
add better validation messages for forms
improve styling and responsiveness more
add loading spinners and better success/error states
add search and category filtering back into the Firebase version
add tests
Author
Created by Kimberly Gadeberg as a learning project for an advanced React e-commerce assignment using Firebase.