# Freshkite_Project
## Getting Started with the Frontend:
After cloning the repository, you need to follow these steps to set up and run the project:

Install Dependencies: Use npm install to download all necessary packages and dependencies required for the project.

Configure Environment Variables: Create a .env file in the root directory and add the required environment variables. Make sure to include values for URL settings, database connections, and authentication keys, such as NEXTAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB, PORT, CLIENT_ID, CLIENT_SECRET, CLIENT_URL, and JWT_SECRET.

Start the Development Server: Use the appropriate command to launch the server in development mode. This will enable hot-reloading and easy testing. Start the development server by running npm run dev.

Access the Application: Open your browser and navigate to http://localhost:3000 to view the running project.

Notes: By default, the server runs on port 3000. Make sure your environment variables are set correctly, especially if you're using services like Google OAuth or any authentication library. Double-check that your database URI and other secrets are accurate and securely managed.

## Backend Setup

After cloning the repository, follow these steps to get the project running:

1. Run `npm install` to install all the required dependencies.
2.  Set up your `.env` file in the root directory with the necessary environment variables.
3. Start the development server by running `npm run dev`.

Once the server is running, you can access the application in your browser at [http://localhost:5000](http://localhost:5000).

  **Note:**
   ```plaintext
   DB=mongodb+srv://<username>:<password>@cluster0.mvum2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   CLIENT_ID=your_client_id_here
   CLIENT_SECRET=your_client_secret_here
   CLIENT_URL=http://localhost:3000/
   JWT_SECRET=your_jwt_secret_here 




