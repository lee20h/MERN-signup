const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cors_origin = [`http://localhost:3000`];
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const config = require('./config/key');
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log(`Mongoose Conected`);
}).catch(err => {
    console.log(err)
})
// application/x-www-form-urlencode
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors({
        origin: cors_origin,
        credentials: true,
    })
);

app.get('/', (req,res) => {
    res.send('Main')
});

app.get('/api/hello', (req,res) => {
    res.send("hi");
})

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })

    })
})

app.post('/api/users/login', (req, res) => {
    // 이메일이 DB에 있나 체크
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        // 있다면 비밀번호가 맞나 체크
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."});
            
            // 맞으면 Token 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
    
                // 토큰을 저장한다. 쿠키, 로컬스토리지, 세션
                // 쿠키 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({ loginSuccess: true, userId: user._id});
            })
        })
    })
})

app.get('/api/users/auth', auth, (req,res) => {
    
    // 미들웨어를 통과해 여기까지 온다면 인증은 통과됨

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req,res) => {

    User.findOneAndUpdate({ _id: req.user._id},{ token: "" }, (err, user) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});