const userDB = {
    users : require("../data/user.json"),
    Setusers : function(user){this.users = user}
}
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { sign } = require("crypto");
require('dotenv').config();
const fsPromise = require('fs').promises;
const path = require('path');


const authUser = async (req,res,next)=>{
    const { id , password } = req.body
    if(!id && !password){
        return res.json({"message":"아이디 및 패스워드 입력"});
    }
    const findUser = userDB.users.find(item=>{return item.username === id});
    if(!findUser){
        return res.json({"message":"계정없음"});
    }
    
    const originpsw = await bcrypt.compare(password , findUser.password);
    console.log(findUser.password);
    console.log(originpsw);
    if(originpsw){
        const accessToken = jwt.sign(
            {'username': findUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : '30s'}
        )
        const refreshToken = jwt.sign(
            {'username': findUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn : '1d'}
        )
        const otherUsers = userDB.users.filter((user)=>{user.user !== findUser.username});
        const curretUser = {...findUser , refreshToken}

        userDB.Setusers([...otherUsers , curretUser]);
        await fsPromise.writeFile(
            path.join(__dirname , '..', 'data' , 'user.json'),
            JSON.stringify(userDB.users)
        )
        res.cookie('jwt', refreshToken , {httpOnly : true , maxAge : 24 * 60 * 60 * 1000});
        return res.json({accessToken})
    }else {
        return res.sendStatus(401);
    }
    
    
    
    

}

module.exports = {authUser}