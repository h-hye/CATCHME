const express = require('express');
const router = express.Router();
const { getUserInfo, updateUserInfo } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/userinfo')
    .get(authMiddleware, getUserInfo)
    .patch(authMiddleware, updateUserInfo);

module.exports = router;