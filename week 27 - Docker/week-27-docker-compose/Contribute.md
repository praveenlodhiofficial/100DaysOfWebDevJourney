# Contributing

## Manual Installation

1. Install Node.js locally
2. Clone the repo
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the DB locally:
   ```bash
   docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   ```
   Or, go to neon.tech and get yourself a new DB

5. Change the DATABASE_URL in the .env file:
   ```env
   DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
   ```

6. Migrate the DB:
   ```bash
   npx prisma migrate dev
   ```
7. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
8. Build the project:
   ```bash
   npm run build
   ```
9. Start the server:
   ```bash
   npm run start
   ```

## Docker Installation

1. Install Docker Desktop

2. Create a new network:
   ```bash
   docker network create user_project_network
   ```

3. Start postgres in Docker:
   ```bash
   docker run --network user_project_network --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   ```

3. Build the image:
   ```bash
   docker build --network=host -t user_project .
   ```

4. Run the container / Start the image:
   ```bash
   docker run -e DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres" --network user_project_network -d -p 3000:3000 user_project
   ```

## Docker Compose Installation

1. Install Docker Desktop, docker-compose

2. Run the following command to start the project:
   ```bash
   docker-compose up
   ```

3. Stop the project:
   ```bash
   docker-compose down
   ```

*Coming soon...*