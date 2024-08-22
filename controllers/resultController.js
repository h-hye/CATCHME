const asyncHandler = require("express-async-handler"); //try catch (err)
const Result = require("../models/resultModel");
const {runPythonScript} = require("../services/resultService");

// @desc 파이썬 결과 저장하고 응답으로 주기
// @route POST /result
// @access Public
const createResult = asyncHandler(async (req, res) => {
    const userId = req.session.userId;

    try {
        // Python 스크립트를 실행하고 결과를 받아옴
        const result = await runPythonScript();
        console.log(`Python Output: ${result}`);
        console.log({ userId, result })

        // 데이터베이스에 결과를 저장
        await Result.create({ userId, result });
        res.status(201).json({ message: "Result created successfully", result: { userId, result } });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

// @desc Get all results by name
// @route GET /result/all
// 전체 결과 보기
const getAllResults = asyncHandler(async (req, res) => {
    const userId = req.session.userId;
    
    // name이 일치하는 모든 문서 검색
    const results = await Result.find({ userId });
    res.status(200).json(results);
});

// @desc Get a result by name
// @route GET /result
// 최근 결과 하나 보기
const getResult = asyncHandler(async (req, res) => {
    const result = await Result.findOne({ name: req.session.userId});
    res.status(200).send(result);
});


module.exports = {
    createResult,
    getAllResults,
    getResult
};