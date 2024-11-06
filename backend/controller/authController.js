const { db } = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Login function with callbacks
const login = (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists by email
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "An error occurred during login" });
    }

    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // Verify the password
    bcrypt.compare(password, user.password_hash, (err, isPasswordValid) => {
      if (err) {
        console.error("Error comparing password:", err);
        return res
          .status(500)
          .json({ error: "An error occurred during login" });
      }

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate a JWT token
      jwt.sign(
        { id: user.id },
        secretKey,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            console.error("Error generating token:", err);
            return res
              .status(500)
              .json({ error: "An error occurred during login" });
          }

          // Return the token and success message
          res.status(200).json({ message: "Login successful", token });
        }
      );
    });
  });
};

// Signup function with callbacks
const signup = (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user or email already exists
  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, rows) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .json({ error: "An error occurred during signup" });
      }

      if (rows.length > 0) {
        return res
          .status(409)
          .json({ error: "Username or email already exists" });
      }

      // Hash the password
      bcrypt.hash(password, saltRounds, (err, passwordHash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res
            .status(500)
            .json({ error: "An error occurred during signup" });
        }

        // Insert the new user into the database
        db.query(
          "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
          [username, email, passwordHash],
          (err, result) => {
            if (err) {
              console.error("Error inserting user:", err);
              return res
                .status(500)
                .json({ error: "An error occurred during signup" });
            }

            // Generate a JWT token for the new user
            jwt.sign(
              { id: result.insertId },
              secretKey,
              { expiresIn: "24h" },
              (err, token) => {
                if (err) {
                  console.error("Error generating token:", err);
                  return res
                    .status(500)
                    .json({ error: "An error occurred during signup" });
                }

                // Return the token and success message
                res
                  .status(201)
                  .json({ message: "User registered successfully", token });
              }
            );
          }
        );
      });
    }
  );
};

const getUser = (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT id, username, email FROM users WHERE id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).json({ message: "Error fetching user details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
};

module.exports = { login, signup, getUser };
