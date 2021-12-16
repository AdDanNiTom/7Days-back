# 7Days-back

## Description

API for seven-app

## Routes

| Method | Route               | Description                                 | Body                                       |
| ------ | ------------------- | ------------------------------------------- | ------------------------------------------ |
| GET    | /                   | Homepage/documenation for the API           |                                            |
| ------ | **auth routes**     | ---------------------------------           | ----------------------------               |
| POST   | /auth/signup        | Creates new user using body ============>   | username,email,password                    |
| POST   | /auth/login         | Checks credentials in DB, creates JWT token | username,password                          |
| POST   | /auth/googleLogin   | Used to login with google                   | google token                               |
| GET    | /auth/verify        | Used to verify JWT stored on the client     |                                            |
| ------ | **users routes**    | ---------------------------------           | ----------------------------               |
| GET    | /api/users          | List of Users                               |                                            |
| GET    | /api/users/:id      | Gets information for one user               |                                            |
| PUT    | /api/users/:id      | Edits a user                                | firstName, lastName, description           |
| DELETE | /api/users/:id      | Deletes a user                              |                                            |
| ------ | **events routes**   | ---------------------------------           | ----------------------------               |
| GET    | /api/events         | List of events                              |                                            |
| POST   | /api/events         | Creates a new event                         | title, description, eventDate, maxAtendees |
| GET    | /api/events/:id     | Gets information for one event              |                                            |
| PUT    | /api/events/:id     | Edits an event                              | title, description, eventDate, maxAtendees |
| DELETE | /api/events/:id     | Deletes an event                            |                                            |
| ------ | **comments routes** | ---------------------------------           | ----------------------------               |
| POST   | /api/comments       | Creates a new comment                       | content, authorId, eventId                 |

## Models
