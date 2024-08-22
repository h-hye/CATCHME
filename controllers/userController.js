//사용자 정보 조회 및 수정
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.getUserInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.session.userId).select('-password'); //세션id를 통해 패스워드 필드 제외하고 조회
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }
    res.json(user); //비밀번호제외하고 전달.
});

exports.updateUserInfo = asyncHandler(async (req, res) => {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true }).select('-password');//new:true는 업데이트된 문서 반환
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }
    res.send("사용자 정보를 업데이트 하였습니다.");
});