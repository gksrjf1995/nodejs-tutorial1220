const userDB = {
    user : require("../data/user.json"),
    setuser : function(user){this.user = user}
}
const bcrpyt = require('bcrypt');

const authUser = async(req,res)=>{
    const { user , password } = req.body
    if(!user){
        res.json({"message":"id입력"});
    }
   
    const data = userDB.user.find((item)=>{return item.username === user});
    if(!data){
        return res.json({"message":"그런 유저 없음"});
    }
    console.log(password , data.password)
    const originpwd = await bcrpyt.compare(password , data.password);
    console.log(originpwd);
    if(originpwd){
        return res.status(200).json({"useranme" : data.username , "pwd" : data.password })
    
    }
       
    }  


module.exports = {authUser}