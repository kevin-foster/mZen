# mZen

Domain modeling NodeJS module 
- Domain elements are separated into Entities, Services and Repositories
  - Entities are objects that represent your data. 
    - Elements of the model that have an identity. Your documents (users, products, orders, posts)
  - Services handle interaction between entities (checkout, authenticator, report-generator, email)
    - Entities operate only on their own data. If a entity needs to interact with another it does so via a service
  - Repositories are responsible for persisting entities. 
    - Services use repositories to save and load entities
- Schema
  - Validation
  - Type-casting
- Object Document Mapping (ODM)
  - Populate documents into constructor instances (e.g instance of an ES6 class)
  - Populate document relations
- Uses ES6 promises


- MongoDB persistence
- Document relation population
  - Common relations supported
    - hasOne 
    - hasMany
    - belongsToOne
    - belongsToMany (many-to-many using an embedded reference array)
  
  - Optimised to minimise queries. One query per relation. Even when populating a collection
  
  - Relations may be configured to auto-populate allowing a complex reference tree to be loaded with minimum code
    - Population of individual relations may be disabled in query options 
  
  - Relations may be auto-populated from initial query or manually populated onto an existing result set

- Data validation and type-casting 
  - Define document structure as a set of fields and embedded documents 

  - Built-in validators
    - required 
      - field must be present (null is accepted)
    - notNull
    - notEmpty 
      - An empty value is any falsey value
  
  - Specify default values 
    - Default value is used when an attempting to insert an document with an undefined field which has a default value
  
  - Type-casting 
    - When field type is configured, value is cast to the required type on insert or update
    - Cast failure produces a validation error
    - Supported types
      - string
      - number
      - boolean
      - Date
      - ObjectID
# mZen
