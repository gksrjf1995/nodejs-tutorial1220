const userDB = {
    users : require("../data/user.json"),
    Setusers : function(user){this.users = user}
}

const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleRefreshToken = (req,res,next)=>{
    // const cookies = req.cookies
    const {cookies} = req
    if(!cookies.jwt){
        return res.sendStatus(401).json({"message":"아이디 및 패스워드 입력"});
    }
    console.log(cookies.jwt);
    console.log("쿠키인증")
    const refreshToken = cookies.jwt
    const findUser = userDB.users.find(item=>{return item.refreshToken === refreshToken});
    if(!findUser){
        return res.json({"message":"계정없음"});
    }
    
    jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET , (err,decoded) =>{
        if(err || decoded.username !== findUser.username ) return res.sendStatus(403),json({'message' :"올바른 시크릿 키 X"})
        const accessToken = jwt.sign(
            {"username" : decoded.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn :'30s'}
        );
        console.log("ddd")
        return res.json({accessToken})
    });
    

   
    
    
    
    

}

module.exports = { handleRefreshToken }