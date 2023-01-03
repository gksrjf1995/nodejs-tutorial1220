
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
app.use("/",express.static(path.join(__dirname,"./public")))
app.use("/subdir", express.static(path.join(__dirname,"./public")))

app.use("/",require("./routes/root.js"))
app.use('/subdir',require('./routes/subdir.js'))
app.use("/employees",require("./routes/api/employees.js"));
app.use("/newuser",require("./routes/api/registeruser.js"));
app.use("/auth",require("./routes/api/autUser.js"));


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

