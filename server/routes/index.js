const express = require('express');
const router = express.Router();
const arubaController = require('../controllers/aruba-controller')

router.get('/', (req, res) => {
	// arubaController.handleLogin(req, res)
	res.sendFile('index.html', { root: 'public' });
})

module.exports = router;
