# Migrachu

Migrachu is a migration tool for Postgres DB's.

## Setup

To set up Migrachu, follow these steps:

1. Clone the repository:
  ```sh
  https://github.com/Feliperojas2601/Migrachu
  ```
2. Navigate to the project directory:
  ```sh
  cd migrachu
  ```
3. Install the required dependencies:
  ```sh
  npm install
  ```
4. Optional, use docker to run a simply db 
  ```sh
  docker run --name postgres-db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:latest
  ```
5. Optional, poblate DB
  ```sql
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
  );

  CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      total_amount DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO users (name, email) VALUES 
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com');

  INSERT INTO orders (user_id, total_amount) VALUES 
  (1, 99.99),
  (2, 49.50);
  ```
  6. Replace this vars in .env.dev, .env.stg and .env.prod files 
  ```sh
  DB_HOST=abc
  DB_USER=abc
  DB_PASSWORD=abc
  DB_NAME=abc
  DB_PORT=123
  ```
  7. Run the setup, he will use env.prod to create the schema models 
  ```sh
  npm run setup
  ```

## Use

After set up, to use Migrachu to control migrations, follow these steps and rules:

### Sync 

1. Modify the model needed in src/models.
2. Add the migration sync to sync.ts in src/,
  ```js
  await Model.sync({ alter: true });
  ```
3. Run sync:
  ```sh
  npm run sync-${NODE_ENV}
  ```
4. Note: Here we sync the model we want, comment the models you don't need to sync and uncomment the ones you modify

### Other type of migrations 
