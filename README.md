# Advanced React E-Commerce App

This project is an advanced e-commerce web app that I built with React, TypeScript, Vite, React Query, and Redux Toolkit. I created it as part of a module project to practice working with APIs, state management, routing, and data persistence in a more realistic React application.

The app uses the FakeStoreAPI to load product and category data. Users can browse products, filter them by category, add items to a shopping cart, remove items from the cart, and complete a fake checkout.

## What This Project Does

This app works like a simple online store. It shows products from an API on the home page and lets the user interact with them through a shopping cart.

Main features include:

- displaying all store products on the home page
- showing product title, price, category, description, rating, and image
- loading categories dynamically from the API
- filtering products by category with a dropdown
- adding products to the cart
- removing products from the cart
- showing total quantity of items in the cart
- showing total price of items in the cart
- simulating checkout by clearing the cart
- saving cart data in `sessionStorage`
- showing a fallback placeholder image if an API image fails to load

## What I Learned

This project helped me practice a lot of important React concepts. Some of the main things I worked on were:

- setting up a React project with TypeScript using Vite
- using React Router to move between pages
- using React Query to fetch API data
- using Redux Toolkit to manage shopping cart state
- creating reusable components
- working with TypeScript interfaces for product data
- using `sessionStorage` to keep cart data after refreshing
- debugging layout issues and runtime errors

## Tech Stack

This project was built with:

- React
- TypeScript
- Vite
- React Router DOM
- React Query
- Redux Toolkit
- React Redux
- FakeStoreAPI

## API Endpoints Used

The app uses these FakeStoreAPI endpoints:

- `https://fakestoreapi.com/products`
- `https://fakestoreapi.com/products/categories`
- `https://fakestoreapi.com/products/category/{category}`

## Project Structure

Here is the basic folder structure I used:

- `src/api` for API request functions
- `src/components` for reusable UI components
- `src/pages` for page components
- `src/store` for Redux store setup and cart slice
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

How to Use the App
Open the home page.
Browse the list of products.
Use the category dropdown to filter products.
Click Add to Cart on any product.
Click the cart link in the navigation bar to open the cart page.
View the items in your cart.
Remove items if needed.
Click Checkout to clear the cart and simulate completing a purchase.
Notes
Some of the image links from FakeStoreAPI may not work because of API-side issues. To handle this, I added a fallback placeholder image so the layout still looks clean even when an image is broken.

The checkout in this app is only simulated because FakeStoreAPI does not actually process real orders.

Future Improvements
If I keep working on this project later, some things I would like to improve are:

add better styling and a more polished design
add quantity increase and decrease buttons in the cart
add loading spinners and better error messages
add a product details page
improve accessibility
add tests
Author
Created by Kimberly Gadeberg as a learning project for an advanced React module assignment.