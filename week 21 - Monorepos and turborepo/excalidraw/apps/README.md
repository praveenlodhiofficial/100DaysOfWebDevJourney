Here’s the improved and well-aligned version of your README:

---

# Project Structure and Setup Guide

This document outlines the steps and structure for initializing and setting up the Turborepo-based project with a single frontend, an HTTP server, a WebSocket server, and a shared database package.

---

## **Steps to Set Up the Project**

### **1. Initialize the Turborepo**
- Start by creating an empty Turborepo:
  ```bash
  npx create-turbo@latest
  ```
- Follow the prompts to set up the repository.

---

### **2. Remove Unnecessary Apps**
- Delete the default `docs` app since only one frontend is required for this project:
  ```bash
  rm -rf apps/docs
  ```

---

### **3. Add `http-server` and `ws-server` Apps**
- Inside the `apps` directory, create two new applications:
  ```bash
  mkdir -p apps/http-server apps/ws-server
  ```

---

### **4. Configure `http-server` and `ws-server`**

1. **Add `package.json`:**
   - In each app, create a `package.json` file:
     ```bash
     pnpm init -y
     ```

2. **Add `tsconfig.json`:**
   - Add a `tsconfig.json` file in both apps that extends the base configuration:
     ```json
     {
       "extends": "@repo/typescript-config/base.json",
       "compilerOptions": {
         "rootDir": "./src",
         "outDir": "./dist"
       }
     }
     ```

3. **Add Scripts and Dependencies:**
   - Add `@repo/typescript-config` as a dependency in `package.json`:
     ```json
     "scripts": {
       "build": "tsc -b",
       "start": "tsc -b && node dist/index.js",
       "dev": "tsc -b && node dist/index.js"
     },
     "devDependencies": {
       "@repo/typescript-config": "workspace:*"
     }
     ```

4. **Update `turbo.json`:**
   - Add build pipelines for `http-server` and `ws-server` (optional step):
     ```json
     {
       "extends": ["//"],
       "tasks": {
         "build": {
           "outputs": ["dist/**"]
         }
       }
     }
     ```

5. **Initialize Servers:**
   - Create a `src/index.ts` file in each app to initialize basic HTTP and WebSocket servers.

---

### **5. HTTP Server Setup (`apps/http-server`)**

1. **Install Express:**
   ```bash
   pnpm add express
   ```

2. **Create Skeleton Routes:**
   - Add the following routes:
     - `POST /signup`
     - `POST /signin`
     - `POST /create-room`

3. **Middleware for Token Decoding:**
   - Create a middleware to decode JWT tokens and gate the `create-room` endpoint.

---

### **6. WebSocket Server Setup (`apps/ws-server`)**

1. **Install WebSocket Library:**
   ```bash
   pnpm add ws
   ```

2. **Decode Token in WebSocket Server:**
   - Implement logic to decode the JWT token in the WebSocket server.
   - Pass the token as a query parameter to the WebSocket server for now.

---

### **7. Shared Database Package (`packages/db`)**

1. **Initialize Database Package:**
   ```bash
   mkdir -p packages/db
   ```

2. **Write Project Schema:**
   - Use this package to define the database schema, ensuring no code duplication across the project.

3. **Import Database Package:**
   - Import the `db` package into the `http-server` for database interactions.

---

## **Directory Structure**

```plaintext
.
├── apps
│   ├── http-server
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ws-server
│   │   ├── src
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
├── packages
│   ├── db
│   │   ├── src
│   │   │   └── schema.ts
│   │   ├── package.json
│   │   └── tsconfig.json
├── turbo.json
├── package.json
└── tsconfig.json
```

---

## **Key Scripts**

### HTTP Server & WebSocket Server `package.json` Scripts:
```json
{
  "scripts": {
    "build": "tsc -b",
    "start": "tsc -b && node dist/index.js",
    "dev": "tsc -b && node dist/index.js"
  }
}
```

---

This refined structure ensures clarity and provides step-by-step instructions for developers to easily onboard and contribute to the project.