# ShopOne — Shop Management System

A full-stack MERN application designed to simplify shop operations through inventory management, sales tracking, and centralized shop administration.

**ShopOne** helps shop owners manage their products, monitor stock levels, track sales, and organize day-to-day business operations through a web-based interface.

<p align="center">
  <a href="https://shop-manager-lyart.vercel.app/">
    <strong>🚀 Live Demo — ShopOne</strong>
  </a>
</p>

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Live Demo](#-live-demo)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [Application Architecture](#-application-architecture)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Configuration](#-environment-configuration)
* [Running the Application](#-running-the-application)
* [API Configuration](#-api-configuration)
* [Deployment](#-deployment)
* [Security](#-security)
* [Troubleshooting](#-troubleshooting)
* [Future Improvements](#-future-improvements)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🌟 Overview

ShopOne is a full-stack shop management application built using the MERN stack.

The application separates the frontend and backend into two independent components:

* **Frontend:** A responsive React application powered by Vite.
* **Backend:** A REST API built with Node.js and Express.
* **Database:** MongoDB for persistent application data.
* **Authentication:** JWT-based authentication for protected operations.
* **Deployment:** Vercel for the frontend and Render for the backend.

The project follows a modular structure to make the codebase easier to maintain, extend, and deploy.

## 🚀 Live Demo

**Production URL:** https://shop-manager-lyart.vercel.app/

The application is deployed on Vercel.

> Note: Access to specific features may require authentication. Database connectivity and backend availability depend on the current production configuration.

---

## ✨ Features

### 📦 Inventory Management

* Organize and manage shop products.
* Maintain product information and stock quantities.
* Monitor inventory levels.
* Support inventory-related workflows.

### 💰 Sales Management

* Manage sales-related operations.
* Maintain sales records.
* Support tracking of business transactions.

### 👤 Authentication and Authorization

* User authentication using JSON Web Tokens (JWT).
* Protected API endpoints.
* Support for authenticated application workflows.

### 🖥️ Web Application

* React-based frontend.
* Client-side routing using React Router.
* Axios for communication with the backend.
* Tailwind CSS for styling.
* Vite for development and production builds.

### ⚙️ Backend API

* RESTful API architecture.
* Express.js routing and middleware.
* MongoDB integration through Mongoose.
* CORS configuration for frontend-backend communication.
* Helmet for HTTP security headers.

*Feature availability depends on the functionality implemented in the current codebase.*

---

## 🛠️ Technology Stack

| Category         | Technologies            |
| ---------------- | ----------------------- |
| Frontend         | React, Vite, JavaScript |
| Styling          | Tailwind CSS            |
| Routing          | React Router            |
| HTTP Client      | Axios                   |
| Backend          | Node.js, Express.js     |
| Database         | MongoDB, Mongoose       |
| Authentication   | JSON Web Tokens (JWT)   |
| Security         | Helmet, CORS            |
| Frontend Hosting | Vercel                  |
| Backend Hosting  | Render                  |
| Version Control  | Git, GitHub             |

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   Vite + Tailwind     │
                    │   Hosted on Vercel    │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │   Node.js + JWT      │
                    │   Hosted on Render   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB         │
                    │   Persistent Data    │
                    └──────────────────────┘
```

### Request Flow

1. A user interacts with the React frontend.
2. The frontend sends HTTP requests to the Express API.
3. The backend validates requests and checks authentication where required.
4. Mongoose communicates with MongoDB.
5. The backend returns a response to the frontend.
6. The frontend updates the interface based on the response.

---

## 📁 Project Structure

```text
easyshop/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── ...
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── app.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── .gitignore
├── package.json
├── render.yaml
└── README.md
```

*The directory listing above describes the expected structure. Some files or folders may differ depending on your current implementation.*

---

## 💻 Getting Started

Follow these instructions to run ShopOne locally.

### Prerequisites

Install the following tools:

* Node.js 18 or later.
* npm 9 or later.
* Git.
* MongoDB locally or a MongoDB Atlas database.
* Visual Studio Code or another code editor.

Verify your installations:

```bash
node --version
npm --version
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/ramu-codes/shop-Manager.git
```

Navigate into the project directory:

```bash
cd shop-Manager
```

### 2. Install Dependencies

If your root `package.json` defines an `install:all` script:

```bash
npm run install:all
```

Otherwise, install dependencies separately.

Backend:

```bash
cd server
npm install
```

Frontend:

```bash
cd ../client
npm install
```

Return to the project root when finished:

```bash
cd ..
```

---

## 🔐 Environment Configuration

ShopOne uses environment variables to configure database access, authentication, and communication between the frontend and backend.

**Never commit real environment variables or production secrets to GitHub.**

### 1. Backend Environment Variables

Create a file named `server/.env`.

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret

CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your actual local configuration.

| Variable     | Purpose                            |
| ------------ | ---------------------------------- |
| `PORT`       | Port used by the backend server    |
| `NODE_ENV`   | Application environment            |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret used to sign JWTs           |
| `CLIENT_URL` | Allowed frontend origin or origins |

For multiple frontend origins, use a comma-separated list if supported by your backend configuration.

Example:

```env
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
```

Check the backend code for the exact environment variable names it reads.

### 2. Frontend Environment Variables

Create a file named `client/.env`.

```env
VITE_API_URL=
```

During local development, leave this value empty if the Vite development server is configured to proxy `/api` requests to the backend.

For production, use your deployed backend's base URL:

```env
VITE_API_URL=https://your-render-service.onrender.com
```

**Important:** Do not append `/api` if your Axios client already adds `/api` to request paths.

Only expose public configuration through `VITE_*` variables. Never store database credentials, JWT signing secrets, or other private information in frontend environment variables.

---

## ▶️ Running the Application

Start the backend and frontend in separate terminals.

### Terminal 1: Start the Backend

From the project root:

```bash
npm run dev --prefix server
```

If your backend does not define a development script, check `server/package.json` and use the appropriate command.

For example:

```bash
npm start --prefix server
```

The backend should be available at:

```text
http://localhost:5000
```

### Terminal 2: Start the Frontend

From the project root:

```bash
npm run dev --prefix client
```

The frontend should be available at:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

### Production Build

Build the frontend:

```bash
npm run build --prefix client
```

Vite normally generates production files in:

```text
client/dist/
```

---

## 🔌 API Configuration

ShopOne uses an Express backend to provide API endpoints to the frontend.

### Local Development

The expected request flow is:

```text
React Frontend
      │
      ▼
Vite Development Proxy
      │
      ▼
Express Backend
      │
      ▼
MongoDB
```

Keep `VITE_API_URL` empty when your Axios configuration and Vite proxy are designed to support this setup.

### Production

The production request flow is:

```text
Vercel Frontend
      │
      ▼
Render Backend API
      │
      ▼
MongoDB Atlas
```

Configure the frontend with the backend's deployed URL.

If your backend implements a health endpoint, you can use it to check availability:

```text
https://your-render-service.onrender.com/api/health
```

Replace the example domain with your actual Render service URL. This endpoint will work only if the backend defines it.

---

## ☁️ Deployment

ShopOne is designed to support a split deployment:

* Frontend on Vercel.
* Backend on Render.
* Database on MongoDB Atlas.

### 1. Deploy the Backend on Render

1. Push your project to GitHub.
2. Sign in to Render.
3. Create a new Web Service.
4. Connect your GitHub repository.
5. Configure the service.

Recommended settings:

| Setting        | Value                     |
| -------------- | ------------------------- |
| Repository     | `ramu-codes/shop-Manager` |
| Root Directory | `server`                  |
| Build Command  | `npm install`             |
| Start Command  | `npm start`               |

Make sure `server/package.json` contains the appropriate `start` script.

Add the required environment variables through the Render dashboard:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_production_secret
NODE_ENV=production
CLIENT_URL=https://shop-manager-lyart.vercel.app
```

Deploy the service and copy the generated backend URL.

### 2. Deploy the Frontend on Vercel

1. Sign in to Vercel.
2. Import the same GitHub repository.
3. Configure the project.

Recommended settings:

| Setting          | Value                     |
| ---------------- | ------------------------- |
| Repository       | `ramu-codes/shop-Manager` |
| Framework Preset | Vite                      |
| Root Directory   | `client`                  |
| Build Command    | `npm run build`           |
| Output Directory | `dist`                    |

Add this environment variable:

```env
VITE_API_URL=https://your-render-service.onrender.com
```

Replace the example backend domain with your actual Render URL.

Deploy the frontend.

### 3. Connect the Frontend and Backend

Verify the following:

* The Vercel frontend URL matches the allowed origin configured in Render.
* `VITE_API_URL` points to the deployed backend.
* MongoDB accepts connections from the backend.
* Required production environment variables are configured.
* Both services are redeployed after environment variable changes.

### 4. Verify the Deployment

After deployment, check:

* The landing page loads successfully.
* Login and registration work, if implemented.
* API requests reach the backend.
* Protected endpoints enforce authentication.
* Database-backed operations work.
* No private credentials are exposed in browser requests or source files.

---

## 🔒 Security

Follow these practices when maintaining ShopOne:

* Keep `.env` files out of version control.
* Commit `.env.example` files containing placeholders.
* Use a strong, randomly generated production JWT secret.
* Validate incoming API requests.
* Protect sensitive endpoints with authentication and authorization middleware.
* Configure CORS to allow trusted frontend origins.
* Use HTTPS for production communication.
* Never expose MongoDB credentials or backend secrets to the frontend.
* Keep npm dependencies updated.
* Rotate any credentials accidentally committed to GitHub.

If a secret has been committed, removing it from the latest commit is not sufficient. Rotate the credential and review the repository history.

---

## 🧰 Troubleshooting

### Frontend Cannot Connect to the Backend

Check:

* The backend service is running.
* `VITE_API_URL` contains the correct backend origin.
* The Axios client constructs the correct API paths.
* The Vite proxy is configured for local development.

### CORS Errors

Verify that the backend's allowed frontend origins include the exact Vercel URL.

Remember that CORS origins should not include a path such as `/api`.

### MongoDB Connection Errors

Check:

* The `MONGO_URI` value.
* MongoDB Atlas network access rules.
* Database authentication credentials.
* Whether the database is available.

### Login Returns 401 Unauthorized

Check:

* Whether the user credentials are valid.
* Whether the frontend sends the expected authentication token.
* Whether the JWT secret is configured correctly.
* Whether the backend's authentication middleware accepts the token.

### Frontend Build Fails

Run:

```bash
npm install --prefix client
npm run build --prefix client
```

Review the terminal output for missing packages, invalid imports, and configuration errors.

### Backend Does Not Start

Run:

```bash
npm install --prefix server
npm start --prefix server
```

Verify that the required environment variables are configured and that the backend start script exists.

---

## 🛣️ Future Improvements

Potential improvements for ShopOne include:

* Dashboard analytics for sales and inventory.
* Low-stock alerts and inventory notifications.
* Product search, filtering, and pagination.
* Sales reports and date-based summaries.
* Exportable inventory and transaction reports.
* Improved mobile responsiveness.
* Role-based permissions for shop staff.
* Automated testing for critical workflows.
* Audit logs for inventory and sales changes.

These are potential enhancements, not claims that every feature is already implemented.

---

## 🤝 Contributing

Contributions, bug reports, and improvement suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test your changes locally.
5. Commit your work.
6. Open a pull request describing the changes.

Use descriptive commit messages and avoid including secrets or generated build files.

---

## 📄 License

No license is specified in this README.

If you plan to make the project open source, add an appropriate `LICENSE` file and update this section accordingly.

---

## 👨‍💻 Project

**ShopOne — Shop Management System**

Built with the MERN stack to explore full-stack development, API integration, authentication, database management, and production deployment.

**Live Demo:** https://shop-manager-lyart.vercel.app/

**GitHub Repository:** https://github.com/ramu-codes/shop-Manager
