const express = require("express");
const router = express.Router();
const {searchHospitals} = require("../controllers/kakaoMapController");
const authMiddleware = require('../middlewares/authMiddleware');

router.route("/searchHospitals").get(authMiddleware, searchHospitals)

module.exports = router;