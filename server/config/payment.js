// payment.js

const stripe = require('stripe')('your-stripe-secret-key');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Set to 'live' for production
  client_id: 'your-paypal-client-id',
  client_secret: 'your-paypal-client-secret',
});

module.exports = {
  createStripePayment: async (amount, currency, source) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: source,
        confirm: true,
      });
      return paymentIntent;
    } catch (error) {
      console.error('Error creating Stripe payment', error);
      throw new Error('Failed to create Stripe payment');
    }
  },
  createPayPalPayment: async (amount, currency, description, return_url, cancel_url) => {
    try {
      const create_payment_json = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url,
          cancel_url,
        },
        transactions: [
          {
            amount: {
              total: amount,
              currency,
            },
            description,
          },
        ],
      };

      const payment = await new Promise((resolve, reject) => {
        paypal.payment.create(create_payment_json, (error, payment) => {
          if (error) {
            console.error('Error creating PayPal payment', error);
            reject(new Error('Failed to create PayPal payment'));
          } else {
            resolve(payment);
          }
        });
      });

      return payment;
    } catch (error) {
      console.error('Error creating PayPal payment', error);
      throw new Error('Failed to create PayPal payment');
    }
  },
  executePayPalPayment: async (paymentId, payerId) => {
    try {
      const execute_payment_json = {
        payer_id: payerId,
      };

      const payment = await new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
          if (error) {
            console.error('Error executing PayPal payment', error);
            reject(new Error('Failed to execute PayPal payment'));
          } else {
            resolve(payment);
          }
        });
      });

      return payment;
    } catch (error) {
      console.error('Error executing PayPal payment', error);
      throw new Error('Failed to execute PayPal payment');
    }
  },
};
