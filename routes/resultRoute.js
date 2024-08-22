const express = require("express");
const router = express.Router();
const {createResult,getAllResults,getResult} = require("../controllers/resultController")
const authMiddleware = require('../middlewares/authMiddleware');


router.route("").post(authMiddleware,createResult)
router.route("/all").get(authMiddleware,getAllResults)
router.route("/").get(authMiddleware,getResult)

module.exports = router;