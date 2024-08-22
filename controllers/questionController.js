const asyncHandler = require('express-async-handler');
const questionService = require('../services/questionService');

const processResults = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
    const answers = req.body.answers; // [y,y,y,y,n,n,y,n,y,n] 형태의 배열

    if (!Array.isArray(answers) || answers.length !== 14) {
        return res.status(400).send('유효한 답변 배열이 아닙니다.');
    }

    const result = questionService.analyzeResults(answers);

    // 결과를 데이터베이스에 저장
    await questionService.saveQuestionResult(userId, answers, result);
    res.status(200).send(result);
});

module.exports = {
    processResults
};