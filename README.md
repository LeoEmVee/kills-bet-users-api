# Kills Bet Users API
  - Small sample of an API for managing users and stats in a bet game to guess how many kills will occur during an eSports competition finals.
  - The winner is the user whose bet is closer to (AND NOT OVER) the real result.
  - The API currently returns strings in some cases (stats and winner) just for a nicer output. When connected to a client app, you can change the strings to be only the requested values and format the outputs at the frontend

# To run with Docker
  - Clone the repo
  - `npm i`
  - `docker-compose up` (Docker must be running)
  - This runs on port 8080 (see docker-compose.yml)

# To run locally
  - Clone the repo
  - `npm i`
  - Create .env file for the environmental variables in app.module.ts and for the server port
  - In app.module.ts, uncomment lines from 17 to 21 and comment line 14 (Docker connection)
  - `npm run start:dev` (PostgreSQL must be running)
  - This runs on port defined in your .env file (I am using 3000)

# To try the API
  You can try the API with [Postman](https://www.postman.com/). It is much easier than from the browser address bar. Requests and routes:

  **REMEMBER: With Docker we are running on port 8080. If you run the API locally, replace the port 8080 in the urls for the one defined on your .env file (I am using 3000)**
  
  - POST addUser: Adds new user and bet (checking if mail is not already in use and bet is not already placed)
    Url: http://localhost:8080/users/
    
    Request body:
    {
      "email": string (required, cannot be repeated),
      "name": string (required, can be repeated),
      "kills": number (0 or more)
    }
  
  - GET getAllUsers: Retrieves all users and bets
    Url: http://localhost:8080/users/
  
  - GET getUser: Retrieves user by id
    Url: http://localhost:8080/users/id/`user.id` (number)

  - GET getTotalBets: Retrieves total number of bets
    Url: http://localhost:8080/users/totalbets

  - GET getTotalKillsBet: Retrieves total number of kills bet
    Url: http://localhost:8080/users/totalkillsbet

  - GET getMaxBet: Retrieves highest bet
    Url: http://localhost:8080/users/maxbet

  - GET getMinBet: Retrieves lowest bet
    Url: http://localhost:8080/users/minbet

  - GET getAvgBet: Retrieves average bet
    Url: http://localhost:8080/users/avgbet

  - GET getAllStats: Retrieves stats report
    Url: http://localhost:8080/users/allstats

  - GET getWinner: Retrieves winner
    Url: http://localhost:8080/users/winner/`number of kills` (number)

  - DELETE deleteUser: Deletes user by id
    Url: http://localhost:8080/users/delete/`user.id` (number)

# To test

  - `npm run test` or `npm run test:watch`
  - Check test cases in user.controller.spec.ts, user.service.spec.ts and app.controller.spec.ts
  - Check mock-data.ts file (under test folder)