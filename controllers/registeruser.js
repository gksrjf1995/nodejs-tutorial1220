const userDB = {
    user : require("../data/user.json"),
    setuser : function(user){this.user = user}
}
const fspromise = require('fs').promises;
const path = require('path');
const bcrpyt = require('bcrypt');

const handleNewUser = async(req,res)=>{
    const {user , pwd} = req.body;
    if(!user || !pwd){
        return res.json({"message": "dsads필수입니다."});
    }
    const duplicate = userDB.user.find((item)=>{item.user === user});
    if(duplicate) return res.json({"message":"중복된 유저가 있음"});
    

    try{
        const hashpwd = await bcrpyt.hash(pwd , 10)
        const newUser = {"username" : user , "password" : hashpwd}
        userDB.setuser([...userDB.user , newUser]);

        await fspromise.writeFile(
                path.join(__dirname,"..","data","user.json"),
               `${JSON.stringify(userDB.user)}\t`
        );

        console.log(userDB.user);
        res.status(200).json({"success":`New User ${newUser.username} ,${newUser.password}`});
    }catch(err){
        res.status(500).json({"message"  : err.message})
    }
}

module.exports =  {handleNewUser}

