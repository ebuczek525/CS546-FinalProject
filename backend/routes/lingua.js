const express = require('express');
const router = express.Router();

router.get('/:phrase', async (req, res) => {
    try {
	const ret = await fetch(`http://lingua-robot.p.rapidapi.com/language/v1/entries/en/${req.params.phrase}`, {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "lingua-robot.p.rapidapi.com",
		"x-rapidapi-key": "66185dfefamshd8a7fc1cbe5b318p186497jsn901b72cdd11f"
	    }
	});
	res.send(ret);
    } catch(e) {
	res.status(500).send(e.message);
    } finally {
	console.log('completed GET /lingua');
    }
});

router.get('/', async (req, res) => {
    res.status(400).send('missing required query');
});

module.exports = router;
