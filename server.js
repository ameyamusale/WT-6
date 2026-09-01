require("dotenv").config();

const express = require("express");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bookstore",
  waitForConnections: true,
  connectionLimit: 10
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET || "bookstore-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.get("/", async (req, res) => {
  try {
    const [books] = await pool.query("SELECT * FROM books ORDER BY id DESC LIMIT 6");
    res.render("home", { books });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error.");
  }
});

app.get("/catalogue", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    const category = (req.query.category || "").trim();

    let sql = "SELECT * FROM books WHERE 1=1";
    const params = [];

    if (search) {
      sql += " AND (title LIKE ? OR author LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    sql += " ORDER BY title";
    const [books] = await pool.query(sql, params);
    const [categories] = await pool.query("SELECT DISTINCT category FROM books ORDER BY category");

    res.render("catalogue", { books, categories, search, category });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error.");
  }
});

app.get("/register", (req, res) => {
  res.render("register", { error: null, success: null, form: {} });
});

app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const form = { name, email };

  if (!name || !email || !password || !confirmPassword) {
    return res.render("register", { error: "All fields are required.", success: null, form });
  }

  if (password.length < 6) {
    return res.render("register", { error: "Password must contain at least 6 characters.", success: null, form });
  }

  if (password !== confirmPassword) {
    return res.render("register", { error: "Passwords do not match.", success: null, form });
  }

  try {
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) {
      return res.render("register", { error: "An account with this email already exists.", success: null, form });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.render("register", {
      error: null,
      success: "Registration successful. You can now log in.",
      form: {}
    });
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Unable to register. Please try again.", success: null, form });
  }
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (!users.length || !(await bcrypt.compare(password, users[0].password))) {
      return res.render("login", { error: "Invalid email or password." });
    }

    req.session.user = {
      id: users[0].id,
      name: users[0].name,
      email: users[0].email
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Login failed. Please try again." });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

app.get("/api/books", async (req, res) => {
  try {
    const [books] = await pool.query("SELECT * FROM books ORDER BY title");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL connected successfully.");
    app.listen(PORT, () => {
      console.log(`Online Book Store running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Could not connect to MySQL.");
    console.error(err.message);
    process.exit(1);
  }
}

startServer();