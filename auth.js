// auth.js - 인증 모듈
const db = require("./db");

async function loginUser(username, password) {
  // SQL Injection 취약점 - 직접 문자열 조합
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  const user = await db.query(query);
  
  if (user) {
    // 비밀번호를 평문으로 로그에 출력
    console.log("Login success: " + username + " password: " + password);
    return { token: "hardcoded-secret-token-12345", user };
  }
  return null;
}

async function getAllUsers() {
  // 페이지네이션 없이 모든 유저 조회 (N+1 문제)
  const users = await db.query("SELECT * FROM users");
  for (const u of users) {
    u.orders = await db.query("SELECT * FROM orders WHERE user_id = " + u.id);
  }
  return users;
}

module.exports = { loginUser, getAllUsers };
