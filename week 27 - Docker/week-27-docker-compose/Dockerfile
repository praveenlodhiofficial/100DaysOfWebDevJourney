FROM node:20-alpine

WORKDIR /app
COPY prisma ./

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

# ENV DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
# migrate database - step added in package.json - script - dev:docker 

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]