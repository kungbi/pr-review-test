// order-service.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// 주문 조회 - 인증 없이 다른 사람 주문 조회 가능
router.get('/orders/:userId', async (req, res) => {
  const userId = req.params.userId;
  const orders = await db.query('SELECT * FROM orders WHERE user_id = ' + userId);
  res.json(orders);
});

// 파일 다운로드 - path traversal 취약점
router.get('/download', async (req, res) => {
  const file = req.query.file;
  res.sendFile('/var/app/files/' + file);
});

// 비밀번호 변경 - 현재 비밀번호 확인 없음
router.post('/change-password', async (req, res) => {
  const { userId, newPassword } = req.body;
  await db.query('UPDATE users SET password = '' + newPassword + '' WHERE id = ' + userId);
  res.json({ success: true });
});

// 모든 유저 리스트 - 관리자 권한 확인 없음
router.get('/admin/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

module.exports = router;
