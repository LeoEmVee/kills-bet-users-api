# Kills Bet Users API

- Small sample of an API for managing users and stats in a bet to guess how many kills will occur during an eSports competition finals.
- The winner is the user whose bet is closer to (AND NOT OVER) the real result.

# To run with Docker

- Clone the repo
- `npm i`
- `docker-compose up` (Docker must be running)

# To run locally

- Clone the repo
- `npm i`
- `npm run start:dev` (PostgreSQL must be running)

# To try the API

You can try the API with [Postman](https://www.postman.com/). Requests and routes:

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
