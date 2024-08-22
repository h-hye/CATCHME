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

exports.logout = asyncHandler((req, res) => { //logout export
    req.session.destroy(err => { //세션 destroy
        if (err) {
            return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
        }
        res.redirect('/'); //홈으로 redirect
    });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.session.userId); // DB에서 사용자 삭제

        if (!user) {
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }

        req.session.destroy((err) => { // 회원 탈퇴 후 세션 파괴하여 로그아웃 처리
            if (err) {
                return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
            }
            res.status(200).send('회원 탈퇴가 완료되었습니다.');
        });
    } catch (error) {
        res.status(500).send('회원 탈퇴 중 오류가 발생했습니다.');
    }
});