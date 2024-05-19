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

[GitHub stars](https://img.shields.io/github/stars/username/repo.svg?style=social)
```markdown

git clone  https://github.com/vitus-john/vitus-john-assessment.git
```

```
cd project-directory

npm install
```
<hr>

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
    "bcrypt": "^5.1.1",<
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-session": "^1.18.0",
    "express-validation": "^4.1.0",
    "express-validator": "^7.0.1",
    "fs": "^0.0.1-security",
    "googleapis": "^134.0.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.5.0",
    "mongoose": "^8.3.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.13",
    "nodemon": "^3.1.0",
    "npm": "^10.5.1",
    "path": "^0.12.7",
  },
  <hr>
Contributing
Contributions are welcome! Please follow the contributing guidelines.

License
This project is licensed under the ISC License.

