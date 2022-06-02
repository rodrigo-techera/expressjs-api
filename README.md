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
- [TODO List](#todo-list)

## Tech Stack

- ExpressJS
- Sequelize
- Docker
- MySQL
- Postman

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

### 3. Database Creation

There is a docker-compose.yml file intended to run a container for MySQL, the credentials are being consumed from .env file.

To install docker and docker-compose: https://docs.docker.com/compose/install/

After having it run:

```
docker-compose up -d
```

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

## TODO List

- Create endpoints for User Model
- Integrate Unit Test
