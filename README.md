# Simple Restful API using Node and MongoDB for Add, Get and Search Assignments

To run the app:
    - `docker-compose build` then `docker-compose up`


Api End points:
    - http://localhost:3000 : Health Check
        - method Get
    - http://localhost:3000/api-docs : Swagger UI
    - http://localhost:3000/api/v1/assignment : Add new assignment
        - method POST
        - body: {
            "name": "new assignment",
            "title": "new title",
            "type": "Daily",
            "tags": ["C#", ".net"]
            } 
    - http://localhost:3000/api/v1/assignment/:id : Get specific Assignment
        - method Get
    - http://localhost:3000/api/v1/assignment/search : Search assignments by tag
        - method POST
        - body: { "tags" : ["Java", ".net"] }
    - http://localhost:3000/api/v2/assignment/:id : Get specific Assignment V2 Api
        - method Get
