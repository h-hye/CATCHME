const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//사용자 정보 조회
const getUserInfo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.session.userId).select('-password'); // 세션 ID를 통해 패스워드 필드 제외하고 조회
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }
    res.json(user); // 비밀번호 제외하고 전달
});

//사용자 정보 업데이트
const updateUserInfo = asyncHandler(async (req, res) => {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true }).select('-password'); // 업데이트된 문서 반환
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }
    res.send("사용자 정보를 업데이트 하였습니다.");
});

// 세션을 파괴하는 공통 함수
const destroySession = (req, res, successMessage, errorMessage) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send(errorMessage);
        }
        res.status(200).send(successMessage);
    });
};

//로그아웃
const logout = asyncHandler((req, res) => { // 로그아웃 처리
    destroySession(req, res, '로그아웃이 완료되었습니다.', '로그아웃 중 오류가 발생했습니다.');
});


//회원 탈퇴
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.session.userId); // DB에서 사용자 삭제

    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }

    // 회원 탈퇴 후 세션 파괴하여 로그아웃 처리
    destroySession(req, res, '회원 탈퇴가 완료되었습니다.', '회원 탈퇴 후 로그아웃 중 오류가 발생했습니다.');
});

module.exports = {
    getUserInfo,
    updateUserInfo,
    logout,
    deleteUser
};