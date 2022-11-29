const express = require("express");
const app = express();
const path = require("path")
const POST = process.env.PORT || 3500

console.log(path.join(__dirname , 'public', 'test'))
app.use("/",express.static(path.join(__dirname , 'public')))
app.use("/",require("./routes/root"))
app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({ message : "404 Not FOUND"})
    }else {
        res.type("txt").send("404 Not FOUND")
    }
})

app.listen(POST,()=>{
    console.log(`서버 열림 ${POST} `)
})