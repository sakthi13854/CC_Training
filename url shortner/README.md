# URL Shortener

A complete, production-ready URL Shortener built with Java 21, Spring Boot 3, Redis, MySQL, and a modern Vanilla JS frontend.

## Features
- **Premium Frontend UI:** Beautiful dark mode, glassmorphism design with a fully functional dashboard.
- **Generate short URLs:** Lightning-fast Base62 encoded links.
- **Custom Aliases:** Support for personalized short links.
- **Link Expiration:** Scheduled cleanup for expired links.
- **Click Analytics:** Track total clicks, daily clicks, browser, OS, and country distribution.
- **Caching:** Redis integration for rapid URL resolution.
- **Database Migrations:** Managed via Flyway.
- **Dockerized Deployment:** One-command setup using Docker Compose.
- **API Documentation:** Interactive Swagger UI.

## Tech Stack
- **Backend:** Java 21, Spring Boot 3.3, Spring Data JPA, Maven
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript, Google Fonts
- **Database:** MySQL 8.0 (Primary), Redis 7.0 (Cache)
- **Infrastructure:** Docker & Docker Compose

## Setup & Installation

### Prerequisites
- Docker and Docker Compose installed
- Maven (optional, if running locally outside Docker)
- Java 21 (optional, if running locally outside Docker)

### Run with Docker Compose (Recommended)

1. Clone this repository (or navigate to the directory).
2. Run the following command to start all services (App, MySQL, Redis):
   ```bash
   docker-compose up -d --build
   ```
3. The web application and API will be available at `http://localhost:8080`.

### Using the Frontend
Once running, simply navigate to `http://localhost:8080` in your browser.
- Use the main page to shorten URLs and create custom aliases.
- Click "Analytics" in the navigation bar to view stats for your shortened links.

### API Documentation (Swagger)
You can also access the Swagger UI to explore and test the APIs directly:
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI Docs:** `http://localhost:8080/api-docs`

## Example API Requests

### 1. Shorten a URL (POST /api/v1/urls)
```bash
curl -X 'POST' \
  'http://localhost:8080/api/v1/urls' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "originalUrl": "https://example.com/very/long/article/to/read",
  "customAlias": "read-me"
}'
```

### 2. Redirect (GET /{shortCode})
```bash
curl -i http://localhost:8080/read-me
```
*Note: This will return a 302 redirect to the original URL.*

### 3. Get Analytics (GET /api/v1/analytics/{shortCode})
```bash
curl -X 'GET' \
  'http://localhost:8080/api/v1/analytics/read-me' \
  -H 'accept: */*'
```

## Running Tests
To run unit and integration tests:
```bash
mvn clean test
```
