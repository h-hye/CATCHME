const express = require("express");
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 데이터베이스 연결
const dbConnect = require("./config/dbConnect");
dbConnect();

// 세션 미들웨어 설정
app.use(session({
    secret: process.env.SECRET_KEY, // 환경 변수에서 비밀키 로드
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 로컬 개발 모드에서는 false
}));

// 미들웨어 설정
app.use(express.json()); // JSON 데이터 파싱
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱
app.use(cors()); // CORS 설정
app.use(bodyParser.json()); // JSON 데이터 파싱

// 기본 라우트: 로그인 여부 확인
app.get("/", (req, res) => {
    console.log('Session data:', req.session);

    if (req.session.userId) {
        res.send(`Logged in as ${req.session.userId}`);
    } else {
        res.send(`
            <script>
                alert('로그인되어있지 않습니다.');
                window.location.href = '/login/kakao';
            </script>
        `);
    }
});

// 라우터 설정
//app.use("/rawdatas", require("./routes/rawDataRoute"));
//app.use("/result", require("./routes/resultRoute"));
app.use("/", require("./routes/kakaoLoginRoute"));
app.use('/', require('./routes/userRoute'));

// 서버 시작
app.listen(3000, () => {
    console.log("서버 실행 중");
});
