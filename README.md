
# Product Inventory Management API

## Project Description
A REST API for managing product inventory using Node.js and Express.js.

## Technologies Used
- Node.js
- Express.js
- Postman

## Installation

npm install

## Run the server

node server.js

## Server URL

http://localhost:3000

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | /api/products | Get all products |
| POST | /api/products | Add a product |
| GET | /api/products/:id | Get product by ID |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| GET | /api/products/filter?category=value | Filter products |

## Data Storage
Products are stored in an in-memory JavaScript array.
