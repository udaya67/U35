# Solar-Powered Trains Dashboard

This application is a dashboard for visualizing data about solar-powered trains, including their benefits, challenges, and implementation statistics.

## Project Structure

The project consists of two main parts:
- **Frontend**: Angular application with Chart.js for data visualization
- **Backend**: Node.js/Express API with MySQL database

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL database

## Running the Application

### Option 1: Using the provided scripts

#### For Windows users:
1. Double-click on `run-app.bat`
2. This will install dependencies and start both the frontend and backend servers

#### For Linux/Mac users:
1. Open a terminal in the project root directory
2. Run `./run-app.sh`
3. This will install dependencies and start both the frontend and backend servers

### Option 2: Manual setup

#### Backend:
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `node index.js`
4. The backend will be running at http://localhost:3000

#### Frontend:
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. The frontend will be running at http://localhost:80

## Features

- JWT Authentication
- Dashboard with multiple charts
- Data visualization for solar train benefits and challenges
- Responsive design

## API Endpoints

- `POST /api/login`: Authenticate user
- `GET /api/challenges`: Get summary chart data
- `GET /api/benefits`: Get benefits chart data
- `POST /api/challenges`: Add a new challenge
- `POST /api/benefits`: Add a new benefit

## Technologies Used

- **Frontend**: Angular, Chart.js, TypeScript
- **Backend**: Node.js, Express, MySQL
- **Authentication**: JWT

## Login Credentials

For testing purposes, use the following credentials:
- Username: udaya
- Password: udaya

## Project Structure

```
.
├── frontend/           # Angular frontend application
├── backend/           # Node.js backend application
├── nginx/            # NGINX configuration
├── docker-compose.yml # Docker Compose configuration
└── README.md         # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 