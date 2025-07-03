# Project Working Steps

1. Define global types in the root (types.d.ts) of mongoose to get a persistent connection to the database.

2. Create the schema (use interfaces and mongoose types) for the project and export it.

3. Use Next-Auth for authentication (but next-auth only provide session login, we need to create our own custom registration logic)

4. create a route for registration (api/auth/register/route.ts)
    - get data from the request body (frontend)
    - validate the data
    - connect to the database (await connectDB())
    - check if the user already exists
    - hash the password
    - create a new user
    - return the user
