## Manual Installation
    - Install Node.js locally 
    - Clone the repo
    -  Install dependencies `npm install`
    - Start thr DB locally:
        - `docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
        - or, go to neon.tech and get yourself a new DB
    - Change the DATABASE_URL in the .env file:
        - `DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"`
    - Migrate the DB: `npx prisma migrate dev`
    - Generate the Prisma client: `npx prisma generate`
    - Build the project: `npm run build`
    - Start the server: `npm run start`

## Docker Installation

## Docker Compose Installation Steps