# 7Days-back

## Description

7Days is an app that let's you plan your next 7 days interactively with your friends based on your free time

## User stories (MVP)

404 - Occupied - As users, we want to see a fun page when URL does not exist
500 - As users, we want to be told when an error has occured and it is not our fault
Login - As users, we would like a page where we can easily login
Sign Up - As users, we want to be able to quickly and easily join the platform
Map - As users, we would like to browse a map to see what's event are taking place.
Planner - As users, we want to be able to search for plans we might be interested in and propose our own to our friends.
Profile page (editable) - As users, we want to be able to update our details, display our plans and see our connections.

## Backlog / Nice to have

Social media sign up
Groups

## Routes

| Method | Route                  | Description                                 | Body                         |
| ------ | ---------------------- | ------------------------------------------- | ---------------------------- |
| GET    | /                      | Homepage/documenation for the API           |                              |
| ------ | **auth routes**        | ---------------------------------           | ---------------------------- |
| POST   | /Sign-up               | Creates new user using body ============>   | username,email,password      |
| POST   | /auth/login            | Checks credentials in DB, creates JWT token | username,password            |
| GET    | /auth/verify           | Used to verify JWT stored on the client     | username,password            |
| ------ | **users routes**       | ---------------------------------           | ---------------------------- |
| GET    | /api/users             | List of Users                               |                              |
| GET    | /api/users/:id         | One user                                    |                              |
| PUT    | /api/users/:id/edit    | Edits one user                              |                              |
| DELETE | /api/users/:id/delete  | Deletes one user                            |                              |
| ------ | **events routes**      | ---------------------------------           | ---------------------------- |
| GET    | /api/events            | List of events                              |                              |
| GET    | /api/events/new        | Creates a new event                         |                              |
| GET    | /api/events/:id        | One event                                   |                              |
| PUT    | /api/events/:id/edit   | Edits an event                              |                              |
| DELETE | /api/events/:id/delete | Deletes an event                            |                              |

## Models

```
const { Schema, model } = require(‘mongoose’);
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    favourites: [
        {
            type: Schema.Types.ObjectId,
            ref: “favourites”
        }
    ]
});
const User = model(‘User’, userSchema);
module.exports = User;

const { Schema, model } = require(‘mongoose’);
const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    taste: {
        type: Array,
        items: {
            “type”: String,
            “enum”: [Sweet, Salty, Sour, Bitter, Savory, Fatty]
        }
    }
});
const Recipe = model(‘Recipe’, recipeSchema);
module.exports = Recipe;
```

## Links
