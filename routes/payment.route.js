// Create Router
const { Router } = require('express');
const router = Router();
// Stripe
const Stripe = require('stripe');
const stripe = Stripe(process.env.PAYMENT_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
