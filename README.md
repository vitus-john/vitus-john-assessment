<h1> Vitus John's Niyo Group Assessment</h1>

<h1>Table of Contents</h1>

<i>Installation</i>

<Usage

Routes

Authentication

Dependencies

Contributing

License

git clone https://github.com/vitus-john/vitus-john-assessment.git

cd project-directory

npm install

Routes

Task Routes

GET /task: Retrieves all tasks.

GET /task/:id: Retrieves a task by ID.

POST /task: Creates a new task (Admin only).

POST /task/:id: Updates a task by ID (Admin only).

DELETE /task/:id: Deletes a task by ID (Admin only).

Authentication Routes

POST /register: Registers a new user.

POST /login: Logs in an existing user.

GET /logout: Logs out the current user.

Authentication

User authentication is implemented using JSON Web Tokens (JWT).

Sessions are managed using Express sessions and cookies.

Admin authentication is enforced using middleware (checkAdmin).

Token blacklist is used to invalidate tokens upon logout.

Dependencies
Express: ^version
Mongoose: ^version
bcrypt: ^version
jwt: ^version
nodemailer: ^version
multer: ^version
Other dependencies...
Contributing
Contributions are welcome! Please follow the contributing guidelines.

License
This project is licensed under the ISC License.

