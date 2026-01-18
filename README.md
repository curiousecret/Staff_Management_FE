# Staff Management Frontend

A modern, responsive web application for managing staff information built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/logout)
- Staff CRUD operations (Create, Read, Update, Delete)
- Staff listing with sorting and search functionality
- Responsive design for mobile and desktop
- Form validation
- Malaysian Ringgit (RM) currency formatting
- Status management (Active/Inactive)

## Tech Stack

- **Framework:** Next.js 14.2.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **UI:** Custom components with Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** or **yarn** or **pnpm**
- **Backend API** running (default: `http://localhost:8000`)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Staff_Management_FE
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> **Note:** Adjust the `NEXT_PUBLIC_API_URL` to match your backend API URL.

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Script        | Description                   |
| ------------- | ----------------------------- |
| `npm run dev` | Starts the development server |

## Project Structure

```
Staff_Management_FE/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── login/             # Login page
│   │   ├── staff/             # Staff management pages
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── layout/            # Layout components (Header, etc.)
│   │   ├── staff/             # Staff-specific components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API service layer
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions (formatters, validators)
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this)
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## API Endpoints

The frontend expects the following API endpoints from the backend:

| Method | Endpoint                   | Description                                   |
| ------ | -------------------------- | --------------------------------------------- |
| POST   | `/api/v1/auth/login`       | User login                                    |
| POST   | `/api/v1/auth/logout`      | User logout                                   |
| GET    | `/api/v1/staff`            | Get all staff (with pagination, sort, search) |
| GET    | `/api/v1/staff/{staff_id}` | Get specific staff member                     |
| POST   | `/api/v1/staff`            | Create new staff                              |
| PUT    | `/api/v1/staff/{staff_id}` | Update staff                                  |
| DELETE | `/api/v1/staff/{staff_id}` | Delete staff                                  |

## Authentication

- The application uses Bearer token authentication
- Tokens are stored in `localStorage`
- The token is automatically attached to all API requests via Axios interceptors
- Unauthorized requests (401) automatically redirect to the login page

## Environment Variables

| Variable              | Description          | Default                 |
| --------------------- | -------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000` |

> **Important:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port 3000 is already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

### API connection errors

- Ensure the backend API is running
- Check that `NEXT_PUBLIC_API_URL` in `.env.local` is correct
- Verify CORS is enabled on the backend

### Build errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```
