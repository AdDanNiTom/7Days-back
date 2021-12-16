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

### User

    username
    - type: String
    - required: true

    email
    - type: String
    - unique: true
    - required: true

    password
    - type: String

    firstName
    - type: String

    lastName
    - type: String

    biography
    - type: String

    profilePhoto
    - type: String
    - default: "https://180dc.org/wp-content/uploads/2016/08/default-profile.png"

### Event

    title
    - type: String

    description
    - type: String

    owner
    - type: Schema.Types.ObjectId
    - ref: "User"

    location
    - type: Array
        - type: Number
        - type: Number

    address
    - type: String

    attendees
    - type: Array
        - type: Schema.Types.ObjectId
        - ref: "User"

    icon
    - type: String

    date
    - type: Object
        - fullDate: Object
        - weekday: Number
        - parsed: Number

    time
    - type: Date

    maxAtendees
    - type: Number

    comments
    - type: Array
        - type: Schema.Types.ObjectId
        - ref: "Comment"

### Comments

    content
    - type: String
    - required: true

    author
    - type: Schema.Types.ObjectId
    - ref: "User"

    {timestamps: true}
