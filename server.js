const http = require("http");
const os = require('os');
const path = require('path');
const {add} = require('./math.js');
const fs = require('fs');
const fsPromise = require('fs').promises
const devlog = require("./logEvent.js");
const EventEmitter = require('events');
const { da } = require("date-fns/locale");
const eventEmitter = new EventEmitter();


const PORT = process.env.PORT || 4500

const serverFile = async(filePath , contentType , response) =>{
  try{
    const data = await fsPromise.readFile(filePath,'utf-8');
    response.writeHead(200,{'Content-Type': contentType});
    response.end(data);
  }catch(err){
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
}

const server = http.createServer(async(req,res)=>{
    
 

  const extension = path.extname(req.url);
  console.log(extension)

  let contentType;

  switch(extension){
      case ".css":
      contentType = "text/css"
      case ".js":
      contentType = "text/javascript"
      case ".json":
      contentType = "application/json"
      case ".jpg":
      contentType = "image/jpeg"
      case ".png":
      contentType= 'image/png'
      case 'txt':
      contentType = 'text/plain'
      break;
      default:
      contentType ='text/html'
  }

  let filpath = 
  contentType === "text/html" && req.url ==="/" ?
  path.join(__dirname , 'views' , "index.html") :
  contentType === "text/html" && req.url.slice(-1) === "/" ?
  path.join(__dirname,"views",req.url , 'index.html') :
  contentType === "text/html" ?
  path.join(__dirname,'views',req.url) : path.join(__dirname,req.url)


  if(!extension && req.url.slice(-1) !== '/') filpath += '.html'

  const fileExits = fs.existsSync(filpath);

  if(fileExits){
    //파일 보여줌
    console.log("ㅇㅁㄴ")
    serverFile(filpath,contentType,res)
  }else{
    switch(path.parse(filpath).base){
      case 'old-page.html':
        res.writeHead(301,{'Loaction' : '/new-page.html'});
        break;
      case 'www-page.html':
        res.writeHead(301,{'Loaction' : '/'});
        break;
      default:
        console.log("dd")
        serverFile(path.join(__dirname , 'views','404.html'),'text/html',res);

    }
  }
  res.end();

  // if(!extension)



})

server.listen(PORT,()=>{
    console.log(`서버는 ${PORT}에서 돌아가고있다.`)
})
// eventEmitter.on('log', (msg)=>devlog(msg));
// eventEmitter.emit('log',"msg부분");


    









