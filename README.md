<h1> Vitus John's Niyo Group Assessment</h1>

<h1>Table of Contents</h1>

<i>Installation</i>

<i>Usage</i>

<i>Routes</i>

<i>Authentication</i>

<i>Dependencies</i>

<i>Contributing</i>

<i>License</i>
<hr>

```markdown

git clone  https://github.com/vitus-john/vitus-john-assessment.git
```

```
cd project-directory

npm install
```
<hr>
<h2>Usage</h2>
Environment Variables
Create a .env file in the root of your project and add the following environment variables:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
REDIRECT_URL=your_google_redirect_url
REFRESH_TOKEN=your_google_refresh_token

```



<h2>Routes</h2>

Task Routes

GET /task: Retrieves all tasks.

GET /task/:id: Retrieves a task by ID.

POST /task: Creates a new task (Admin only).

POST /task/:id: Updates a task by ID (Admin only).

DELETE /task/:id: Deletes a task by ID (Admin only).
<hr>

Authentication Routes

POST /register: Registers a new user.

POST /login: Logs in an existing user.

GET /logout: Logs out the current user.
<hr>

Authentication

User authentication is implemented using JSON Web Tokens (JWT).

Sessions are managed using Express sessions and cookies.

Admin authentication is enforced using middleware (checkAdmin).

Token blacklist is used to invalidate tokens upon logout.
<hr>

Dependencies
 "dependencies": {
``
    "bcrypt": "^5.1.1",</br>
    "body-parser": "^1.20.2",</br>
    "cookie-parser": "^1.4.6",</br>
    "cors": "^2.8.5",</br>
    "crypto": "^1.0.1",</br>
    "dotenv": "^16.4.5",</br>
    "express": "^4.19.2",</br>
    "express-session": "^1.18.0",</br>
    "express-validation": "^4.1.0",</br>
    "express-validator": "^7.0.1",</br>
    "fs": "^0.0.1-security",</br>
    "googleapis": "^134.0.0",</br>
    "jsonwebtoken": "^9.0.2",</br>
    "mongodb": "^6.5.0",</br>
    "mongoose": "^8.3.0",</br>
    "multer": "^1.4.5-lts.1",</br>
    "nodemailer": "^6.9.13",</br>
    "nodemon": "^3.1.0",</br>
    "npm": "^10.5.1",</br>
    "path": "^0.12.7",
  },
  <hr>
Contributing
Contributions are welcome! Please follow the contributing guidelines.

![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
License

This project is licensed under the ISC License.

