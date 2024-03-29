# Simple RESTful API using Node, Express and MongoDB for Add, Get and Search Assignments

To run the app:
    - `docker-compose build` then `docker-compose up`

To run Tests `docker-compose run --rm app npm test`

Api End points:
   1. http://localhost:3000 : Health Check
      - method `GET`
   2. http://localhost:3000/api-docs : Swagger UI
   3. http://localhost:3000/api/v1/assignment : Add new assignment 
      - method `POST`
      - body: 
      ```
      {
         "name": "new assignment",
         "title": "new title",
         "type": "Daily",
         "tags": ["C#", ".net"]
      }
      ```
   4. http://localhost:3000/api/v1/assignment/:id : Get specific Assignment
      - method `GET`
   5. http://localhost:3000/api/v1/assignment/search : Search assignments by tag
      - method `GET`
      - body: `{ "tags" : ["Java", ".net"] }`
   6. http://localhost:3000/api/v2/assignment/:id : Get specific Assignment V2 Api
      - method `GET`
