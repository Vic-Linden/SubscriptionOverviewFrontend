# School project (Frontend)

This web app gives users an overview of their subscriptions. This is the frontend. The backend is in a separate repository: [SubscriptionOverviewBackend](https://github.com/Vic-Linden/SubscriptionOverview).

## About the project

This was an individual assignment in my **fullstack .NET education**. The goal was to build and deploy a complete web application, with a backend API, a database and a frontend.

**What the assignment required:**

- A **REST API** with full CRUD, built with **ASP.NET Core** and **Entity Framework Core**.
- Authentication and authorization with **JWT** and roles.
- A React frontend that talks to the API, with protected routes.
- A responsive design and a custom 404 page.
- Deployment to **Azure**, with configuration kept out of the code.


## My design in Figma

<p>
  <img width="49%" alt="login-mockup" src="https://github.com/user-attachments/assets/5606c7a0-967d-4bd5-9d8c-07fbd33f18aa" />
  <img width="49%" alt="dashboard-mockup" src="https://github.com/user-attachments/assets/06c34063-9f4e-4b74-8030-2248fab31813" />
</p>

## Result

<p>
  <img width="49%" alt="login-new" src="https://github.com/user-attachments/assets/168c9656-cce2-43f8-a601-1e6d79e21f92" />
  <img width="49%" alt="dashboard" src="https://github.com/user-attachments/assets/25d53c9f-b5cc-4925-88bf-f779f3b96eb8" />
</p>


## Tech stack

- React with Vite
- Material UI
- React Router
- Axios
- Recharts
- JWT authentication *(decoded with jwt-decode)*
- Hosted on Azure

## Features

- Register and log in
- Add, edit and delete subscriptions and categories
- Log payments for a subscription
- Summary bar with monthly total, active subscriptions and top category
- Donut chart showing the price per category
- Admin page for viewing all users, only available to the Admin role
- Responsive design for mobile and desktop
- Custom 404 page

## Run locally

1. Clone the repo and run `npm install`
2. Create a `.env.development` file with `VITE_API_URL=http://localhost:5044/api`
3. Start the backend, then run `npm run dev`
