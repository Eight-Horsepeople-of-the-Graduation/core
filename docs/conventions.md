## Database Schema Conventions to Follow

All models at the beginning
Followed by the junction tables (describe the many to many realtions)
Ended with the enums

### Punctuations:

- maintain camelCase
- all model names start with a capital letter

## API Conventions to follow

### Routes:

- maintain order:
  get--> ID
  get--> title || other parameters
  get --> all
  post
  update
  delete
- maintain dynamic parameters
  ex: "/:id" , "/:title"
  where in the controller req.params is used to retrive it
  [check uefulNotes for more info about that]
- separate routes with same methods with different words
  a solution for the catch-all problem we encountered
  ex:
  get ALL = "/"
  get by ID = "id/:id"
  get by TITLE = "title/:title"
  where what is followed by ':' is the dynamic parameter and the other word is the differentiator

  ### WORDING

  - ID should be 'id' everywhere
  - use create NOT add
  - use get NOT list or show
