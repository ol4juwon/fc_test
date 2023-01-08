# Adon Service
## Hosted on Heroku 
[](https:///api/v1)

## Tools
- **Nodejs**
- **Nestjs**
- **Typescript**
- **POSTGRESQL** - SQL Database
- **Jest** Test framework
- **Supertest** Test framework
- **Knexjs** DB Migration
- **ObjectionJS** ORM

## Endpoints
- Users [/users]
  1. Register new user [/register][POST]
  2. login [/login][POST]
- Brands [/brands]
  1. Add brands[/][POST]
  2. Add Addons [/brands/:brandId/addons][POST]
  3. Get Addons [/brands/:brandId/addons][POST]
  4. GET Addon [/brands/:brandId/addons/:addonId][GET]
  5. UPDATE ADDON [/brands/:brandId/addons/:addonId][PATCH]
  6. Delete Addon [/brands/:brandId/addons/:addonId][DELETE]
  7. Add Categroy [/brands/:brandId/addon-categories:][POST]


## Environment Variables
1. JWT_SECRET
5. DATABASE_HOST
6. DATABASE_TYPE
7. DATABASE_USER
8. DATABASE_PASS
9. DATABASE_PORT
10. DATABASE_NAME

are to be store in the .env file

## Run instructions
Download/ clone the main branch.
Run the following commands
npm run install - to install all dependecies
npx knex migrate:latest - To run migrations
npm run test - to run tests
npm run start:dev - to run in dev environment
register an account and specify roles.
login to generate a token...
use the token to validate request as Bearer Token

## PostMan Doc
[POSTMAN](https://elements.getpostman.com/redirect?entityId=14081034-6cdb9f12-54d0-422b-8a50-89a66172490e&entityType=collection)