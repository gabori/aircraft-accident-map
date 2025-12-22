📘 README – Architecture & Design Decisions
🛫 Aircraft Accident Map – Architecture Overview
📌 Overview

This project visualizes aircraft accident data on an interactive map for a selected year using the Aviation Accident Database & Synopses dataset.

The system consists of:

Backend API (FastAPI + Pandas)

Frontend (Angular + Leaflet)

Containerized deployment using Docker and Docker Compose

🧱 Backend Architecture
Technology Stack

FastAPI – lightweight, high-performance Python web framework

Pandas – CSV data processing and in-memory querying

Uvicorn – ASGI server

Docker – containerized deployment

Data Handling Strategy

The dataset is loaded once at application startup and stored in memory.

Reasons for this approach:

The dataset size is manageable

Avoids database setup overhead

Enables very fast filtering and aggregation

Ideal for a challenge-focused prototype

Trade-off:

Not suitable for extremely large datasets or frequent writes

Acceptable given the read-only, analytical nature of the application

API Design
Endpoint	Description
GET /api/accidents?year=YYYY	Returns all accidents with coordinates for the selected year
GET /api/accidents/stats?year=YYYY	Aggregated statistics (total, fatal)
GET /api/accidents/{event_id}	Detailed view of a single accident
Fatal Accident Detection

Fatal accidents are identified using the following logic:

Injury.Severity starts with "Fatal"


This avoids incorrect matches such as "Non-Fatal" while still supporting values like "Fatal(2)".

CORS Handling

CORS middleware is enabled to support local development and containerized environments.

In a production deployment behind an NGINX reverse proxy, this middleware can be removed, as frontend and backend are served from the same origin.

🗺️ Frontend Architecture (Summary)

Angular standalone components

Leaflet for map rendering

Marker clustering for performance

Color-coded markers:

🔴 Fatal

🟢 Non-fatal

Full-page map layout with fixed header and legend panel

🚀 Deployment

The entire application is deployed using Docker Compose, consisting of:

Backend service

Frontend service (Angular build served via NGINX)

Internal Docker network with reverse proxy for /api calls

✅ Key Design Trade-offs
Decision	Reason
CSV instead of DB	Faster development, fewer dependencies
In-memory dataset	High read performance
Separate stats endpoint	Simpler frontend logic
Marker clustering	Frontend performance optimization
🏁 Conclusion

The solution prioritizes:

clarity

performance

simplicity

strong architectural justification

It is intentionally designed as a clean, extensible prototype rather than a fully productionized system.