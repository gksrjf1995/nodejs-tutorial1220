const path = require('path');
const fspromises = require('fs').promises;
const fs = require("fs");


// const fileexist = async() => {
//     if(!fs.existsSync('./newfile')){
//         try{
//             await fspromises.mkdir("./newfile").then(()=>{return console.log("파일 만듦")}).then(()=>{
//                 if(fs.existsSync("./newfile")){
//                     fspromises.rmdir("./newfile");
//                     console.log("삭제완료")
//                 }
//             })
//         }catch(err){
//             console.log(err);
//         }
//     }else{
//         console.log("이미 있음")
//     }
// }

const fileexist =  async () => {
    await fspromises.stat('./newfile')
    .then((stats) => {
        console.log(stats);
      fspromises.rmdir("./newfile")
    })
    .catch(async(error) => {
      if (error.code === 'ENOENT') {
       await fspromises.mkdir("./newfile")
      } else {
        return console.log("나도몰라~");
      }
    });
} 

   fileexist()
