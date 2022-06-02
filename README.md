# Rest API Application Challenge

> Project of Rest API handling users authentication allowing CRUD over tutorials model

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Configuration](#2-configuration)
  - [3. Database Creation](#3-database-creation)
  - [4. Install node packages](#4-install-node-packages)
  - [5. Database Connection Test](#5-database-connection-test)
  - [6. Database Schema](#6-database-schema)
  - [7. Running Server](#7-running-server)
- [Packages Used](#packages-used)
- [TODO List](#todo-list)

## Tech Stack

- [ExpressJS](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)
- [PhpMyAdmin](https://www.phpmyadmin.net/)
- [Postman](https://www.postman.com/)

## Installation

### 1. Clone Repository

Clone the GitHub

```
git clone git@github.com:rodrigo-techera/expressjs-api.git
```

### 2. Configuration

Currently there is a `.env` file uploaded to this repository, generally this type of variables containing sensitive information shouldn't be uploaded to repositories, but in this case since that this is just a test, as a part of the challenge was uploaded along the rest of the files to make this work.

Inside .env file we can find the following

```
ACCESS_TOKEN_SECRET => Hash to be used with jwt
SERVER_PORT => port where server will be running
MYSQL_HOST => host for database connection
MYSQL_USER => user used on database connection
MYSQL_USER_PASSWORD => password used on database connection
MYSQL_DATABASE => database name
```

### 3. Database Engine

There is a docker-compose.yml file intended to run a container for MySQL, and PhpMyAdmin as well, credentials for those are being consumed from `.env` file.

To install docker and docker-compose: https://docs.docker.com/compose/install/

After having it, run the following command:

```
docker-compose up -d
```

This will be exposing a MySQL database engine over `localhost:3306` and PhpMyAdmin installation on port 8889 so going to a browser accesing to `localhost:8889` we should see PhpMyAdmin UI asking for the credentials used on the `.env` file.

### 4. Install node packages

This Challenge was built using the following engines that we can find on package.json file:

```
"engines": {
    "npm": ">=8.1.2",
    "node": ">=16.13.2"
}
```

So having compatible engines run:

```
npm run i
```

### 5. Database Connection Test

There is a script specified in package.json intended to test db connection

```
npm run test-mysql-connection
```

Having an output like the following we can be sure that db connection is successfully:

```
Executing (default): SELECT 1+1 AS result
```

### 6. Database Schema

There is a script specified in package.json intended to create db schema.

```
npm run create-database-models
```

This script will also create some example users. those are specified on the `data/users.json` file.

### 7. Running Server

There is a script specified in package.json intended to run server.

```
npm run server
```

Once server is running we will have it available on `localhost` under the port specified on `.env` file:
localhost:3000

## Packages Used

- `bcrypt` => used to encrypt user password preventing to save plain text on the db
- `cors` => used as middleware to enable cors allowing api being consumed from a browser
- `dotenv` => used to extract values from .env file
- `express` => used to handle api routes
- `express-validator` => used to sanitize and validate data as a middleware
- `jsonwebtoken` used to handle json web tokens
- `mysql2` => mysql driver to handle database connection
- `sequelize` => ORM tool to handle models and CRUD actions

## TODO List

- Create endpoints for User Model
- Integrate Unit Test
- Create endpoint for Logout
- Create endpoint for RefreshToken
