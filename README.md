# tongpang

## How to set up (Windows)

Install postgreSQL for windows
https://www.enterprisedb.com/downloads/postgres-postgresql-downloads#windows
It will ask you to create the root password

Next, set up the windows environment variables so that you can access `psql` from the powershell window. (You will need to restart powershell for this to work.)
https://stackoverflow.com/questions/11460823/setting-windows-path-for-postgres-tools

You may want a GUI to do stuff, but you don't need it.
https://www.pgadmin.org/download/pgadmin-4-windows/

To create the DB (Yes, it's using the root user, no it's not good practice)
`$ createdb tongpang -U postgres`

All commands from here are within POSTGRES itself.

`$ psql -U postgres`


- `\list` or `\l`: list all databases
- `\dt`: list all tables in the current database
- `\connect database_name` Connect to the database you want.

**Creating tables**

```CREATE TABLE books (
    book_id   INTEGER UNIQUE,
    book_name VARCHAR(50),
    cost      DECIMAL(7,2)
);```

```
INSERT INTO books (book_id, book_name, cost) VALUES (1, 'Jello', 1.5);
```