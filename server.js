require('dotenv').config(); // 환경 변수 설정 ->모든파일에서 환경변수 사용가능.
const express = require('express');
const session = require('express-session'); // 로그인 시 세션 필요
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 세션 미들웨어 설정
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // HTTPS 사용 시 true로 설정
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7일 동안 세션 유지
    }
}));

const dbConnect = require('./config/dbConnect'); // 데이터베이스 연결 함수 불러오기
const { requireLogin } = require('./middlewares/authMiddleware'); // 미들웨어
dbConnect(); // MongoDB 연결

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.use('/', require('./routes/authRoute')); // '/'경로로 들어오는 곳에 대해서 라우트디렉 아래 파일을 모두 실행
app.use('/', require('./routes/emailRoute'));
app.use('/', require('./routes/userRoute'));
app.use('/', require('./routes/hospitalRoute')); // 병원 검색 라우트 추가
app.use('/', require('./routes/kakaoLoginRoute')); //카카오 로그인 라우트 추가
app.use('/', require('./routes/pythonResultRoute'))
app.use('/', require('./routes/roleRoute'))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/login/reissuepass', (req, res) => {
    res.sendFile(__dirname + '/views/reissuePass.html');
});

app.get('/memberinfo',requireLogin, (req, res) => {
    res.sendFile(__dirname + '/views/memberInfo.html');
});

app.get('/memberinfo/more',requireLogin,(req,res)=>{
    res.sendFile(__dirname + '/views/memberInfoMore.html');
});

app.get('/memberinfo/more/update',requireLogin, (req, res) => {
    res.sendFile(__dirname + '/views/memberUpdate.html');
});

app.get('/memberinfo/more/updatepassword',requireLogin, (req, res) => {
    res.sendFile(__dirname + '/views/updatePassword.html');
});

app.get('/memberinfo/more/memberdelete',requireLogin, (req, res) => {
    res.sendFile(__dirname + '/views/memberDelete.html');
});
