const express = require("express");
const router = express.Router();
const {processResults} = require("../controllers/questionController");
const authMiddleware = require('../middlewares/authMiddleware');

router.route("/question/result'")
    .post(authMiddleware, processResults)

module.exports = router;