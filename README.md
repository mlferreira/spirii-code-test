# Spirii Code Test

## Running locally

* `npm install` 
* `npm run build` 
* `npm run start:dev` 

You should then be able to access the project from this url: <https://localhost:3000/>

### Endpoints

"imports" the transactions from the API and saves to the database
`curl --location 'http://localhost:3000/transactions/api/import'`

returns a summary of all the user's payouts so far
`curl --location 'http://localhost:3000/transactions/payouts'`

returns a summary of all transactions for a specific user
`curl --location 'http://localhost:3000/transactions/summary/969'`


## Considerations

I used SQLite and Sequelize because it seemed like the easiest to use on an MVP - I wouldn't use them in production for this type of application.

Given more time, I would have created "integration" tests to check if the services are aggregating the data correctly.
