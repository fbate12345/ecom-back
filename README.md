# Amazona Fancis ECommerce Website

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:basir/amazona.git
$ cd amazona
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/amazona  
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products
- It creates 6 sample products

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin

## Features
  1. Setting forgot Password
  2. Setting Sellers screen
  3. Carousel
  4. google maps
  5. setting stripe payment
  6. chat screen
  7. security?
