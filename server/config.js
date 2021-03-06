module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY,
    apiSecret: process.env.TWILIO_API_SECRET,
    chatService: process.env.TWILIO_CONVERSATIONS_SERVICE_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
  },
  port: process.env.PORT || 3001
};