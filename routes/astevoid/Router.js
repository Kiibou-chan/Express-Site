const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('astevoid/astevoid.pug');
});

module.exports = router;