# Chat Application

## Getting Started

This repository contains a chat application built with Node.js, Express, and PostgreSQL. Follow these steps to set up and run the application.

## Prerequisites

- Node.js and npm
- PostgreSQL

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/ajeeshcp/chat-application.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd chat-application
    ```

3. **Install the necessary packages**

    ```bash
    npm install express pg sequelize socket.io bcryptjs jsonwebtoken
    npm install --save-dev jest supertest
    ```

4. **Set up the PostgreSQL database**

   - Create a PostgreSQL database with the details specified in the `.env` file. Ensure the `.env` file contains the correct database connection details.

5. **Start the server**

    You can start the server using one of the following commands:

    ```bash
    npm start
    # or
    node .
    # or in debug mode
    ```

## API Documentation

For API reference, view the Postman collections here: [API Documentation](https://documenter.getpostman.com/view/26922886/2sA3kUF1wz)

## SQL Table Scripts

Table creation scripts are provided in the `SQL_script` file. Refer to this file for details on setting up the database schema.

## Running Tests

To run the tests, use:

```bash
npm test
