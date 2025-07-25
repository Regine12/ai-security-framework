const express = require('express');
const router = express.Router();

// Example route: GET /
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AI Security Framework API!' });
});

// Add more routes as needed
// router.get('/example', (req, res) => { ... });

module.exports = router;