const authURL = 'https://kauth.kakao.com/oauth/authorize';
const tokenURL = 'https://kauth.kakao.com/oauth/token';
const userInfoURL = 'https://kapi.kakao.com/v2/user/me';
const clientId = process.env.CLIENT_ID;
const redirectUri = 'http://localhost:3000/callback';

module.exports = {
    authURL,
    tokenURL,
    userInfoURL,
    clientId,
    redirectUri
};
