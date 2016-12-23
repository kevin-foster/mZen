# mZen
## Domain modeling with NodeJS and MongoDB 

mZen is a small NodeJS module that provides functionality for implementing an application domain model using MongoDB for persistence. It allows you to organise the different elements of your model into separate components and provides a mechanism for those components to interact. 

mZen can be used in any type application server-side, client-app or as a REST API. [mZen-Server](https://github.com/kevin-foster/mZen-Server) is a separate NodeJS module that exposes an mZen model as a REST API server.

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

- Document relation population
  - Common relations supported
    - hasOne 
    - hasMany
    - hasManyCount (count of the number of matching related documents)
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
      - field must be present 
    - notNull
    - notEmpty 
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
