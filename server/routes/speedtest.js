const express = require('express');
const router = express.Router();
const speedtestController = require('../controllers/speedtest-controller')

router.get('/', (req, res) => {
	res.sendFile('index.html', { root: 'public' });
})

router.get('/empty', (req, res) => {
    speedtestController.getEmpty(req, res)
})
router.post('/empty', (req, res) => {
    speedtestController.postEmpty(req, res)

})
router.get('/garbage', (req, res) => {
    speedtestController.getGarbage(req, res)
})
router.get('/getIP', (req, res) => {
    speedtestController.getIP(req, res)
})


module.exports = router;
