const express = require('express');
const router = express.Router();
const { getUserInfo, updateUserInfo, logout, deleteUser} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/userinfo')
    .get(authMiddleware, getUserInfo)
    .patch(authMiddleware, updateUserInfo)
    
router.route('/logout').get(authMiddleware, logout)
router.route('/memberinfo/more/setting/memberdelete').delete(authMiddleware, deleteUser); //로그인 검사후 회원탈퇴

module.exports = router;