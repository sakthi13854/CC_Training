# Campus Connect Dashboard

Welcome to the **Campus Connect Dashboard**! This full-stack application serves as a central hub for university students, featuring a sleek, modern, dark-themed UI (glassmorphism design). 

## Features

1. **CGPA Calculator**
   - Accurately calculate semester GPA and overall CGPA.
   - Pre-loaded with department templates (CSE, IT, AIDS, CIVIL) and semesters.
   - Support for custom subjects and easy-to-use dropdowns with custom styling.
   - Sticky floating summary bar for real-time results.

2. **Notes**
   - Quickly jot down important reminders, tasks, or study notes.
   - Clean, distinct visual separation with hover effects.

3. **Live Chat**
   - Connect with peers in real-time.
   - Built on robust WebSockets for instantaneous communication.

## Tech Stack

- **Frontend:**
  - React 18
  - Vite
  - Tailwind CSS (for styling and glassmorphism effects)
  - Headless UI (for custom accessible components)
  - Firebase Authentication

- **Backend:**
  - Python / FastAPI
  - WebSockets (for Live Chat)
  - Firebase Admin SDK (for token verification)

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Firebase Project Setup (for authentication keys)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Place your Firebase `serviceAccountKey.json` in the root of the `backend` directory.
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your Firebase client configuration.
4. Start the development server:
   ```bash
   npm run dev
   ```

## License
This project is open-source and available under the MIT License.
