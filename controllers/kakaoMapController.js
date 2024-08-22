const asyncHandler = require("express-async-handler"); //try catch (err)

const searchHospitals = asyncHandler(async (req, res) => {
    //앱으로부터 사용자의 위치를 받음
    const { latitude, longitude, query } = req.query;
    //반경 5km내 안에서 찾기
    const radius = 5000;

    //카카오지도 상에서 기준에 맞는 것들(병원) 찾기/요청하기
    try {
        const response = await fetch(
            `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&x=${longitude}&y=${latitude}&radius=${radius}`,
            {
                headers: {
                Authorization: `KakaoAK ${process.env.CLIENT_ID}`
                }
            } 
        );

        const data = await response.json();
        res.json(data.documents); // 병원 목록
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류');
  }
});

module.exports = {
    searchHospitals
};