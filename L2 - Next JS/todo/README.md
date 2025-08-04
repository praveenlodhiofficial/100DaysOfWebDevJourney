# Todo List Application

This is a beginner-friendly Todo List Application built using Next.js with MongoDB integration. The app combines both frontend and backend functionality within a single Next.js application, using Next.js API routes for the backend and React components for the frontend. It's styled with Tailwind CSS and allows users to create, read, update, and delete tasks.

## Project Overview

The Todo List app enables users to:

- Add new tasks with a title
- View all tasks in a list
- Mark tasks as status or incomplete
- Delete tasks

This project is designed to strengthen your full-stack development skills while keeping the scope simple and achievable for a beginner.

## Tech Stack

- **Full Stack**: Next.js (Frontend + Backend API routes)
- **Database**: MongoDB (with Mongoose)
- **Styling**: Tailwind CSS
- **Additional Tools**: MongoDB Atlas (for cloud database)

## Prerequisites

- Node.js and npm installed on your system
- A MongoDB Atlas account or local MongoDB installation
- A code editor (e.g., VS Code)
- Basic understanding of JavaScript, React, and REST APIs

## Project Setup

### 1. Create Next.js Project

```bash
npx create-next-app@latest todo-app
cd todo-app
```

During setup, select:

- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ App Router
- ✅ Import alias

### 2. Install Dependencies

```bash
npm install mongoose
```

### 3. Set Up MongoDB

- Sign up for MongoDB Atlas (free tier) or install MongoDB locally
- Create a database (e.g., todoDB) and obtain the connection string
- Create a `.env.local` file in the root directory and add:
  ```
  MONGODB_URI=your_connection_string
  ```

## Database Schema Design

### Objective

Define the structure for storing tasks in MongoDB using Mongoose within Next.js.

### Steps

1. Create a `lib` folder in the root directory
2. Create `lib/mongodb.js` to handle MongoDB connection
3. Create `models/Task.js` to define the Task schema using Mongoose

### Schema Fields

- `title`: String, required (the task description)
- `status`: Boolean, default to false (indicates if the task is status)
- `createdAt`: Date, default to the current timestamp (tracks task creation time)

## API Development

### Objective

Build RESTful APIs for CRUD operations using Next.js API routes instead of Express.

### Steps

#### 1. Set Up MongoDB Connection

- Create `lib/mongodb.js` to handle database connection
- Use connection pooling for better performance

#### 2. Create API Routes

Create the following files in `app/api/` directory:

- `app/api/tasks/route.js` - Handle GET (all tasks) and POST (create task)
- `app/api/tasks/[id]/route.js` - Handle GET, PUT (update), and DELETE for specific tasks

#### 3. Implement API Logic

Write the following API endpoints:

- `GET /api/tasks`: Retrieve all tasks
- `POST /api/tasks`: Create a new task (expects title in the request body)
- `GET /api/tasks/[id]`: Retrieve a specific task by ID
- `PUT /api/tasks/[id]`: Update a task's title or status status by its ID
- `DELETE /api/tasks/[id]`: Delete a task by its ID

#### 4. Test APIs

Use Postman, Thunder Client, or browser dev tools to test each endpoint.

## Frontend Development

### Objective

Build a user interface using Next.js App Router and React components.

### Steps

#### 1. Create Main Page

- Use `app/page.tsx` as the main page to display the todo list
- Create a form for adding tasks
- Display the list of existing tasks

#### 2. Design UI with Tailwind CSS

Use Tailwind CSS classes to style:

- A form with a text input and submit button to add tasks
- A list of tasks, each showing the title, a checkbox for completion, and a delete button
- Responsive design for different screen sizes

#### 3. Implement Client-Side Logic

- Use React hooks (`useState`, `useEffect`) to manage state
- Create functions to interact with the API routes
- Handle form submissions and user interactions

#### 4. Data Fetching

Use Next.js built-in fetch or create custom functions to:

- `GET /api/tasks`: Fetch all tasks on page load
- `POST /api/tasks`: Create a new task when the form is submitted
- `PUT /api/tasks/[id]`: Update a task's completion status
- `DELETE /api/tasks/[id]`: Delete a task

#### 5. State Management

- Use `useState` to manage the task list and form input values
- Use `useEffect` to fetch tasks when the page loads
- Update the UI dynamically based on API responses

## Workflow

### API Workflow

1. Next.js API routes receive HTTP requests
2. Routes connect to MongoDB using the connection utility
3. Mongoose models interact with the database
4. API routes return JSON responses

### Frontend Workflow

1. The Next.js app loads and fetches all tasks using a GET request
2. User submits a form to add a task, triggering a POST request
3. User toggles a task's checkbox, triggering a PUT request
4. User clicks a delete button, triggering a DELETE request
5. UI updates dynamically based on API responses

## File Structure

```
todo-app/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.js              # GET all tasks, POST new task
│   │       └── [id]/
│   │           └── route.js          # GET, PUT, DELETE specific task
│   │
│   │
│   ├── globals.css                   # Tailwind CSS imports
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main todo list page
├── lib/
│   └── mongodb.js                    # MongoDB connection utility
├── models/
│   └── Task.js                       # Mongoose schema for tasks
├── components/                       # Optional: Reusable components
│   └── TaskItem.tsx                  # Individual task component
├── .env.local                        # Environment variables
├── package.json
└── next.config.js
```

## Database Operations

### Backend (API Routes)

Use Mongoose methods to interact with MongoDB:

- `Task.find()`: Fetch all tasks for the GET endpoint
- `Task.create()`: Save a new task for the POST endpoint
- `Task.findByIdAndUpdate()`: Update a task by ID for the PUT endpoint
- `Task.findByIdAndDelete()`: Delete a task by ID for the DELETE endpoint

### Error Handling

- Implement try-catch blocks in API routes
- Return appropriate HTTP status codes (201 for created, 200 for success, 400 for bad requests, 404 for not found, 500 for server errors)
- Handle database connection errors gracefully

## Frontend Implementation

### Data Fetching

Use Next.js fetch API or create custom functions:

- `fetch('/api/tasks')`: Fetch tasks on page load
- `fetch('/api/tasks', { method: 'POST', body: JSON.stringify({ title }) })`: Create a new task
- `fetch('/api/tasks/[id]', { method: 'PUT', body: JSON.stringify({ status }) })`: Update task status
- `fetch('/api/tasks/[id]', { method: 'DELETE' })`: Delete a task

### State Management

- Use React hooks to manage application state
- Handle loading states and error states
- Provide user feedback for successful/failed operations

## Additional Tips

- **Testing**: Test API routes with Postman or Thunder Client before integrating with the frontend
- **Error Handling**: Implement robust error handling in both API routes and frontend components
- **Loading States**: Show loading indicators during API calls
- **Validation**: Add input validation for task titles
- **Optimistic Updates**: Update UI immediately and revert on error for better UX

## Learning Goals

- Understand Next.js App Router and API routes
- Practice MongoDB CRUD operations with Mongoose
- Learn full-stack development within a single Next.js application
- Get comfortable with Tailwind CSS for responsive styling
- Understand client-side state management with React hooks

## Next Steps

After completing this project, consider adding features like:

- User authentication
- Task categories or tags
- Task deadlines and reminders
- Search and filtering functionality
- Dark mode toggle

## Running the Project

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local` with your MongoDB connection string

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the app

5. **Test the application:**
   - Add new tasks
   - Mark tasks as complete/incomplete
   - Delete tasks
   - Verify data persistence in MongoDB

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
