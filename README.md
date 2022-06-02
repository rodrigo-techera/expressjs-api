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
- [Postman collection](#postman-collection)
- [Packages Used](#packages-used)
- [Available endpoints](#available-endpoints)
- [User Roles](#user-roles)
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

## Postman collection

There is a file in the root folder called `postman-collection-export.json` this could be used to import,inside Postman, a collection to handle every endpoint made by this Rest API

## Packages Used

- `bcrypt` => used to encrypt user password preventing to save plain text on the db
- `cors` => used as middleware to enable cors allowing api being consumed from a browser
- `dotenv` => used to extract values from .env file
- `express` => used to handle api routes
- `express-validator` => used to sanitize and validate data as a middleware
- `jsonwebtoken` used to handle json web tokens
- `mysql2` => mysql driver to handle database connection
- `sequelize` => ORM tool to handle models and CRUD actions

## Available endpoints

**Authenticate User** `POST /v1/auth`

**_Payload_**

|       Name | Required |  Type  | Description                  |
| ---------: | :------: | :----: | ---------------------------- |
|    `email` | required | string | email credential for user    |
| `password` | required | string | password credential for user |

**_Response_**

```
{
    "accessToken": "eyJhbGci5cCI6IkpXVCJ9.eyJlbWFpbCI6InRIjoiQWRtaW4iLCJpYXQiOjE2NTQxMjc5MzIsImV4cCI6MTY1NDEyOTEzMn0.K7iEVG0f-PZPuaZdptWBGJ5rhfDs"
}
```

**Request Creation Token** `GET /v1/tutorials/token`

**_Headers_**

|            Name | Required |  Type  |          Value          | Description                                |
| --------------: | :------: | :----: | :---------------------: | :----------------------------------------- |
| `Authorization` | required | string | `Bearer ${accessToken}` | valid accessToken obtained from `/v1/auth` |

**_Payload_**

None

**_Response_**

```
{
    "createAuthenticationToken": "eyJhbGciOipXVCJ9.eyJlbWFpbCI6InRvbnkuc3RhcmtAZXhhNTQxMjc5NDg2NDMsImlhdCI6MTY1NDEyNzk0OCwiZXhwIjoxNjU0MTI4MjQ4fQ.wxjeeVowQPk3sxuEnt26BQo0K0"
}
```

**Create Tutorial** `POST /v1/tutorials/`

**_Headers_**

|                          Name | Required |  Type  |             Value              | Description                                           |
| ----------------------------: | :------: | :----: | :----------------------------: | :---------------------------------------------------- |
|               `Authorization` | required | string |    `Bearer ${accessToken}`     | valid accessToken obtained from `/v1/auth`            |
| `custom-authentication-token` | required | string | `${createAuthenticationToken}` | valid accessToken obtained from `/v1/tutorials/token` |

**_Payload_**

|          Name | Required |  Type  | Description                 |
| ------------: | :------: | :----: | --------------------------- |
|       `title` | required | string | name for the tutorial       |
|    `videoUrl` | optional | string | valid url for youtube video |
| `description` | optional | string | description for tutorial    |

**_Response_**

```
{
    "publishedStatus": "published",
    "id": 9,
    "title": "Title 16",
    "videoUrl": null,
    "description": null,
    "updatedAt": "2022-06-02T03:07:56.391Z",
    "createdAt": "2022-06-02T03:07:56.391Z"
}
```

**List Tutorials** `GET /v1/tutorials/`

**_Headers_**

|            Name | Required |  Type  |          Value          | Description                                |
| --------------: | :------: | :----: | :---------------------: | :----------------------------------------- |
| `Authorization` | required | string | `Bearer ${accessToken}` | valid accessToken obtained from `/v1/auth` |

**_Query String_**

|                    Name | Required |  Type  |                Value                | Description                     |
| ----------------------: | :------: | :----: | :---------------------------------: | :------------------------------ |
|         `sort_by_field` | optional | string | one of ['id', 'title', 'updatedAt'] | sort field to apply             |
|               `sort_by` | optional | string |       one of ['ASC', 'DESC']        | ASC or DESC order               |
|       `filter_by_title` | optional | string |                                     | string to filter by title       |
| `filter_by_description` | optional | string |                                     | string to filter by description |

**_Payload_**

None

**_Response_**

```
[
    {
        "id": 1,
        "title": "Title 1",
        "videoUrl": null,
        "description": null,
        "publishedStatus": "published",
        "deletedAt": null,
        "createdAt": "2022-06-01T19:58:03.000Z",
        "updatedAt": "2022-06-01T19:58:03.000Z"
    },
    {
        "id": 2,
        "title": "Title 2",
        "videoUrl": null,
        "description": null,
        "publishedStatus": "published",
        "deletedAt": null,
        "createdAt": "2022-06-01T19:58:52.000Z",
        "updatedAt": "2022-06-01T19:58:52.000Z"
    },
    {
        "id": 3,
        "title": "Title 5",
        "videoUrl": null,
        "description": null,
        "publishedStatus": "published",
        "deletedAt": null,
        "createdAt": "2022-06-01T19:58:56.000Z",
        "updatedAt": "2022-06-01T19:58:56.000Z"
    }
]
```

**List Tutorial by Id** `GET /v1/tutorials/:id`

**_Headers_**

|            Name | Required |  Type  |          Value          | Description                                |
| --------------: | :------: | :----: | :---------------------: | :----------------------------------------- |
| `Authorization` | required | string | `Bearer ${accessToken}` | valid accessToken obtained from `/v1/auth` |

**_Payload_**

None

**_Response_**

```
{
    "id": 2,
    "title": "Title 2",
    "videoUrl": null,
    "description": null,
    "publishedStatus": "published",
    "deletedAt": null,
    "createdAt": "2022-06-01T19:58:52.000Z",
    "updatedAt": "2022-06-01T19:58:52.000Z"
}
```

**Logic Delete Tutorial by Id** `DELETE /v1/tutorials/:id`

**_Headers_**

|            Name | Required |  Type  |          Value          | Description                                |
| --------------: | :------: | :----: | :---------------------: | :----------------------------------------- |
| `Authorization` | required | string | `Bearer ${accessToken}` | valid accessToken obtained from `/v1/auth` |

**_Payload_**

None

**_Response_**

```
{
    "message": "Tutorial was deleted successfully"
}
```

**Update Tutorial by Id** `PUT /v1/tutorials/:id`

**_Headers_**

|            Name | Required |  Type  |          Value          | Description                                |
| --------------: | :------: | :----: | :---------------------: | :----------------------------------------- |
| `Authorization` | required | string | `Bearer ${accessToken}` | valid accessToken obtained from `/v1/auth` |

**_Payload_**

|          Name | Required |  Type  | Description                 |
| ------------: | :------: | :----: | --------------------------- |
|       `title` | required | string | name for the tutorial       |
|    `videoUrl` | optional | string | valid url for youtube video |
| `description` | optional | string | description for tutorial    |

**_Response_**

```
{
    "message": "Tutorial was updated successfully"
}
```

**Logic Mass Delete Tutorials** `DELETE /v1/tutorials/mass_delete`

**_Headers_**

|            Name | Required |  Type  |          Value          | Description                                |
| --------------: | :------: | :----: | :---------------------: | :----------------------------------------- |
| `Authorization` | required | string | `Bearer ${accessToken}` | valid accessToken obtained from `/v1/auth` |

**_Payload_**

None

**_Response_**

```
{
    "message": "Tutorials were deleted successfully"
}
```

## User Roles

The users has assigned a Role attribute wich currenlty supports "Admin" or "User" values.
This role is intended to handle the permissions at the time of create, update or delete resources
So "User" role can only use `/v1/auth` endpoint to get accessToken and then `/v1/tutorials/` via GET to get tutorials list.

## TODO List

- Create endpoints for User Model
- Integrate Unit Test
- Create endpoint for Logout
- Create endpoint for RefreshToken
- Implement better logging
- Handle db migrations and initial data from sequelize cli
- Create configuration for different environments such as dev, staging, prod
