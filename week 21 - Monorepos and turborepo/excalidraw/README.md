Steps

1. Initialize the empty turborepo

2. (apps)
    - delete docs
    - add http-server
    - add ws-server

3. (http-server & ws-server) 
    - add package.json
    - add tsconfig.json &  extend @repo/typescript-config/base.json
    - add @repo/typescript-config as a dependency in package.json
    - add a build, dev, start in package.json
    - create or update turbo.json for both (optional)
    -initialize a http server & ws server

4. apps/http-server
    - add express package
    - create skeleton route signup, signin, create-room endpoint
    - create a middleware that decode the token and gate the create room endpoint

5. apps/ws-backend
    - add ws package
    - decode the token in the ws wserver as well, send the token to the ws werver in a query params for now

6. packages
    - create common-backend (JWT_SECRET)
    - create common (zod schema)
    - create db

7. packages/db :
    - initialize prisma
        - pnpm i prisma
        - npx prisma init 
    - define the schema in schema.prisma
    - get yourself a DB url, paste it in .env
    - npm prisma migrate dev 
    - npx prisma db push
    - npx prisma generate