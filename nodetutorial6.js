const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const router = express.Router();
const {logger,logEvents} = require("./middleware/logEvent.js")
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler.js")


app.use(logger)


const whiltList = ['http://localhost:3500']
const corsoption = {
    origin : (origin , callback)=>{
        if(whiltList.indexOf(origin) !== -1 || !origin ) {
            callback(null , true)
        }else {
            callback(new Error('Not Allow by Cors'))
        }
    },
}

app.use(cors(corsoption));
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"./public")))

app.get("^/$|index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})
app.get("/new-page(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
});

app.get('/old-page(.html)?',(req,res)=>{
    res.status(301).redirect('/new-page.html');
});




//middleware 

const one = (req,res,next) => {
    console.log("one");
    next()
}
const two = (req,res,next) => {
    console.log("two");
    next()
}
const three = (req,res,next) => {
    console.log("three");
    res.sendFile(path.join(__dirname,'views','index.html'));
}

app.get('/chain(.html)?', [one , two , three ]);


app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({error : "404 오류 발생"})
    }else if(req.accepted('txt')){
        res.type('type').send("404오류 발생")
    }
    
});

app.use(errorHandler);

app.listen(PORT,()=>{`APP RUNNING in ${PORT}`});

