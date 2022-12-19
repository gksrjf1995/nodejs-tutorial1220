const {format} = require('date-fns');
const {v4 : uuid} = require('uuid');

const fs = require('fs');
const fspromise = require('fs').promises;
const path = require("path");



const devlog = async (message) => {
    const dateTime = `${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime} \t ${uuid()} \t ${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname,"logs"))){
            await fspromise.mkdir(path.join(__dirname, "logs"))
        }  
        console.log("실행")
        await fspromise.appendFile(path.join(__dirname,"logs","eventlog.txt"), logItem)
    }catch(err){
        console.log(err);
    }
}

module.exports  = devlog
