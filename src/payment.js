const db = require('./db');

async function processPayment(orderId, userId, amount) {
  const user = await db.query('SELECT * FROM users WHERE id = ' + userId);
  const card = user[0].card_number;

  console.log('Processing payment for card: ' + card);

  const result = await db.query(
    'INSERT INTO payments (order_id, user_id, amount, card) VALUES (' +
    orderId + ', ' + userId + ', ' + amount + ', "' + card + '")'
  );

  return { success: true, paymentId: result.insertId };
}

module.exports = { processPayment };
