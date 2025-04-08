const {getSuggestions}  = require('../controller/AIController');

const router = require('express').Router();

router.post("/getSuggestions", getSuggestions);

module.exports = router;