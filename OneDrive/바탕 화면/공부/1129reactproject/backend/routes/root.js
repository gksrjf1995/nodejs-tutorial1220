const express = require('express');
const router = express.Router()
const path = require('path') 

// User just request "/","/index","/index.html" 세가지 경우 다 동작
router.get('^/$|/index(.html?)',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
});

module.exports = router