const TAX_RATE = 0.1; // 10% as a decimal ratio (e.g. 0.1 = 10%)
const DISCOUNT_THRESHOLD = 1000;

function calculateDiscount(amount) {
  if (amount >= DISCOUNT_THRESHOLD) {
    return amount * 0.05;
  }
  return 0;
}

function calculateTax(amount) {
  return amount * TAX_RATE;
}

function processPayment(amount) {
  const discount = calculateDiscount(amount);
  const discountedAmount = amount - discount;
  const tax = calculateTax(discountedAmount);
  return discountedAmount + tax;
}

module.exports = { processPayment, calculateTax, calculateDiscount };
