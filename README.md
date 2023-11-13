# Chat App - NestJS, MongoDB, Docker, Socket.IO

Welcome to the Chat App built with NestJS, MongoDB, Docker, and Socket.IO. This application provides a simple and scalable solution for real-time messaging.

## How to Start the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project and update the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nestjs_chat_app
# RABBITMQ Configuration
RABBITMQ_URI=amqp://rabbitmq:5672
# JWT Secret Key
JWT_SECRET=your_jwt_secret_key
# Socket.IO Configuration
SOCKET_IO_PORT=4000
```

Make sure to replace `your_jwt_secret_key` with a secure secret key for JWT.

### 3. Start Docker

Ensure that Docker is installed on your machine. Then, run the following command to start the project:

```bash
docker-compose up --build
```

This command will build and start the Docker containers, including MongoDB, Redis, and the NestJS application.

If you encounter any issues or need to perform additional steps, please refer to the project documentation.

## Additional Steps (if necessary)

If you encounter any issues during the setup or want to perform additional steps, follow the instructions below:

### Update Docker Compose Configuration

If you need to modify the Docker Compose configuration, navigate to the `docker-compose.yml` file and make the necessary adjustments.

### Install Dependencies

If you need to install or update project dependencies, run the following command:

```bash
docker-compose run --rm app npm install
```

### Rebuild Docker Containers

If you make changes to the code or Docker configuration, rebuild the Docker containers with the following command:

```bash
docker-compose up --build
```

### Troubleshooting

If you encounter any issues, check the logs by running:

```bash
docker-compose logs
```

Review the error messages to identify and resolve any problems.

## Application Features

- User Registration and Authentication
- Real-time Messaging with Socket.IO
- MongoDB Database for User and Message Storage
- JWT Token Authentication
- Dockerized for Easy Deployment

## OpenAPI (Swagger) Documentation:

Run your NestJS application, and visit `http://localhost:3000/api` to see the Swagger UI.

### Register Endpoint:

- **URL:** `/api/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - HTTP Status: `201 Created`
  - Body:
    ```json
    {
      "message": "Registration successful"
    }
    ```

### Login Endpoint:

- **URL:** `/api/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - HTTP Status: `200 OK`
  - Body:
    ```json
    {
      "access_token": "string"
    }
    ```

### Get Profile Endpoint:

- **URL:** `/api/get-profile`
- **Method:** `GET`
- **Description:** Retrieve the user's profile.
- **Authorization Header:** `Bearer YOUR_ACCESS_TOKEN`
- **Response:**
  - HTTP Status: `200 OK`
  - Body:
    ```json
    {
      "userId": "string",
      "username": "string",
      "displayName": "string",
      "gender": "string",
      "birthday": "string",
      "horoscope": "string",
      "zodiac": "string",
      "heightValue": 0,
      "heightUnit": "string",
      "weightValue": 0,
      "weightUnit": "string",
      "interests": ["string"]
    }
    ```

### Update Profile Endpoint:

- **URL:** `/api/update-profile`
- **Method:** `PATCH`
- **Description:** Update the user's profile.
- **Authorization Header:** `Bearer YOUR_ACCESS_TOKEN`
- **Request Body:**
  ```json
  {
    "displayName": "string",
    "gender": "string",
    "birthday": "string",
    "horoscope": "string",
    "zodiac": "string",
    "heightValue": 0,
    "heightUnit": "string",
    "weightValue": 0,
    "weightUnit": "string",
    "interests": ["string"]
  }
  ```
- **Response:**
  - HTTP Status: `200 OK`

### View Messages Endpoint:

- **URL:** `/api/view-messages`
- **Method:** `GET`
- **Description:** Retrieve the user's messages.
- **Authorization Header:** `Bearer YOUR_ACCESS_TOKEN`
- **Response:**
  - HTTP Status: `200 OK`
  - Body:
    ```json
    [
        {
            "id": "1",
            "sender": {
            "id": "user1",
            "username": "john_doe"
            },
            "content": "Hello, how are you?",
            "timestamp": "2023-11-10T12:30:45Z"
        },
        {
            "id": "2",
            "sender": {
            "id": "user2",
            "username": "jane_doe"
            },
            "content": "I'm good, thank you!",
            "timestamp": "2023-11-10T12:32:18Z"
        }
    ]


### Send Message Endpoint:

- **URL:** `/api/send-message`
- **Method:** `POST`
- **Description:** Send a message to another user.
- **Authorization Header:** `Bearer YOUR_ACCESS_TOKEN`
- **Request Body:**
  ```json
  {
      "receiverId": "user2",
      "content": "Hey, what's up?"
  }
