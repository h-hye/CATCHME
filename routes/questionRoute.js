const express = require("express");
const router = express.Router();
const {processResults,getAllQuestionResults} = require("../controllers/questionController");
const authMiddleware = require('../middlewares/authMiddleware');

router.route("/question/result'").post(authMiddleware, processResults)
router.route("/question/results'").get(authMiddleware, getAllQuestionResults)

module.exports = router;