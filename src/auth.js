// auth.js
const jwt = require('jsonwebtoken');

function verifyToken(token) {
  // ISSUE: algorithm not specified - accepts none algorithm
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

function getUserById(userId) {
  // ISSUE: SQL injection vulnerability
  const query = "SELECT * FROM users WHERE id = " + userId;
  return db.query(query);
}

function logUserActivity(req) {
  // ISSUE: logging sensitive data
  console.log("User login:", req.body.password, req.body.username);
}

module.exports = { verifyToken, getUserById, logUserActivity };
