# Health Information System

A system to manage clients and health programs eg Malaria, TB etc. Developed with React for the frontend and Django for the backend.

## Features

- User authentication (login/signup)
- Register clients with personal information
- Create health programs with descriptions
- Enroll clients in multiple programs
- Remove clients from programs
- Search and view client profiles


## Getting Started
Follow these instructions to get the project up and running on your local machine.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

## Installation
Clone the repository
   git clone https://github.com/sophiembanda/Health-info.git
   cd Health-info

## Backend Setup
1. Create and activate a virtual environment

# Windows
    python -m venv venv
    venv\Scripts\activate

# macOS/Linux
    python -m venv venv
    source venv/bin/activate

2. Install the required packages
    cd backend
    pip install -r requirements.txt

3. Run the migrations
    python manage.py migrate

4. run the server
    python manage.py runserver

The backend API will be available at http://localhost:8000/api/

## Frontend Setup
1. Open a new terminal window/tab

2. Navigate to the frontend directory
    cd frontend

3. Install the required packages
    npm install

4. Start the development server
    npm start

The frontend application will be available at http://localhost:3000


## Usage
1. Open your browser and navigate to http://localhost:3000

2. Sign up for a new account or log in with existing credentials

3. Use the navigation menu to access different features:

- Create health programs
- Register new clients
- Search for existing clients
- View client profiles
- Enroll clients in programs
- Remove clients from programs

## API Endpoints
/api/signup/ - Register new users
/api/login/ - Authenticate users
/api/logout/ - Log out users
/api/programs/create/ - Create health programs
/api/programs/ - List all health programs
/api/clients/register/ - Register new clients
/api/clients/ - List and search clients
/api/clients/<id>/ - View client details
/api/enrollments/create/ - Enroll clients in programs
/api/enrollments/remove/<client_id>/<program_id>/ - Remove clients from programs

## Technologies Used
- Frontend: React.js, React Router, CSS
- Backend: Django, Django REST Framework
- Database: SQLite (development)
- Authentication: Token-based authentication

## Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.