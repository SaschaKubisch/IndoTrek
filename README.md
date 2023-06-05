# IndoTrek

IndoTrek is a web application for booking and customizing adventure trips in Indonesia.

## Prerequisites

Before running IndoTrek with Docker, make sure you have the following software installed on your system:

- Docker
- Docker Compose

## Getting Started

To run IndoTrek using Docker, follow these steps:

1. Clone the IndoTrek repository:

```
   git clone https://github.com/SaschaKubisch/IndoTrek.git
```
Navigate to the project directory:

```
cd IndoTrek
```
Build the Docker containers:

```
docker-compose build
```
Start the Docker containers:
```
docker-compose up
```
This command will start the IndoTrek application and its dependencies (database, backend server, and frontend client) in separate Docker containers.

Open your web browser and visit http://localhost:3000 to access the IndoTrek application.

## Configuration
By default, the IndoTrek Docker configuration uses the following environment variables:

- MONGODB_URI: MongoDB connection URI
- JWT_SECRET: Secret key for JWT token generation
- SENDGRID_API_KEY: API key for the SendGrid email service
- STRIPE_SECRET_KEY: Secret key for the Stripe payment gateway
- PAYPAL_CLIENT_ID: Client ID for the PayPal payment gateway

You can modify these variables in the docker-compose.yml file or provide your own .env file in the project root directory.

## Development
If you want to make changes to the IndoTrek application and test them locally, you can use Docker in development mode:

Edit the docker-compose.yml file and uncomment the volumes section for the backend and frontend services.

Run the Docker containers in development mode:

```
docker-compose -f docker-compose.dev.yml up
```
This command will mount the local project directory as a volume inside the containers, allowing you to see the changes immediately.

Make the necessary changes to the code using your preferred text editor or IDE. The changes will be reflected in the running application.

## Contributing
If you would like to contribute to the IndoTrek project, please follow the guidelines in CONTRIBUTING.md.

## License
IndoTrek is released under the MIT License.
