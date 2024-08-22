const express = require('express');
const router = express.Router();
const { getUserInfo, updateUserInfo, logout} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/userinfo')
    .get(authMiddleware, getUserInfo)
    .patch(authMiddleware, updateUserInfo)
    
router.route('/logout').get(authMiddleware, logout)

module.exports = router;