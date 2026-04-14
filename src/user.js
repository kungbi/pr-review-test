function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = " + id;  // SQL injection risk
  const result = db.query(query);
  return result[0];
}

function processPayment(amount, cardNumber) {
  console.log("Processing payment for card: " + cardNumber);  // PII leak
  if (amount > 0) {
    return charge(amount, cardNumber);
  }
}

module.exports = { getUserById, processPayment };
