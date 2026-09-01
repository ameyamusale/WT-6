# Online Book Store - Node.js + MySQL

This is an academic assignment implementing a responsive online book store with:

1. Home Page
2. Login Page
3. Catalogue Page
4. Registration Page
5. MySQL database

## Technologies

- Node.js
- Express.js
- EJS
- MySQL
- HTML5
- CSS3
- JavaScript
- bcryptjs
- express-session

## Features

- Responsive design for desktop, tablet and mobile
- User registration stored in MySQL
- Password hashing using bcrypt
- User login/logout using sessions
- Book catalogue loaded from MySQL
- Search books by title/author
- Filter books by category
- Demo Add button
- REST endpoint: `/api/books`

## Installation

### 1. Install Node.js

Install the current LTS version of Node.js.

Check:

```bash
node -v
npm -v
```

### 2. Install MySQL

Make sure the MySQL server is running.

### 3. Create the database

Open MySQL Workbench or MySQL Command Line and run the contents of:

`database.sql`

This creates the `bookstore` database, `users` table, `books` table and sample books.

### 4. Configure environment variables

Copy `.env.example` to `.env`.

Windows Command Prompt:

```cmd
copy .env.example .env
```

Then edit `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=bookstore
SESSION_SECRET=my_bookstore_secret
```

If your MySQL root account has no password, use:

```env
DB_PASSWORD=
```

### 5. Install dependencies

Inside the project folder:

```bash
npm install
```

### 6. Start the application

```bash
npm start
```

You should see:

```text
MySQL connected successfully.
Online Book Store running at http://localhost:3000
```

Open:

`http://localhost:3000`

## Development mode

Optional:

```bash
npm run dev
```

## Project structure

```text
online-book-store/
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── catalogue.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── 404.ejs
│
├── .env.example
├── database.sql
├── package.json
├── server.js
└── README.md
```

## Database tables

### users

- id
- name
- email
- password
- created_at

### books

- id
- title
- author
- category
- price
- description
- image_url
- created_at

## Important

Do not commit `.env` to GitHub because it can contain your database password.

Add this to `.gitignore`:

```text
node_modules/
.env
```
