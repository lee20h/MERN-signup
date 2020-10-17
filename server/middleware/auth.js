const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리
    
    // 1. client cookie token 받기
    const token = req.cookies.x_auth;
    // 2. Token decode, 유저 찾기
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });
        
        // 요청시에 사용할 수 있게 요청값에 넣어준다.
        req.token = token;
        req.user = user;
        next();
    })
    // 3. 유저 있으면 인증 o, 없으면 인증 x
    
}

module.exports = { auth }