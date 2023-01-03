const express = require('express');
const router = require('express').Router();
const handleNewUser  = require("../../controllers/registeruser.js")

router.route('/').post(handleNewUser.handleNewUser);


module.exports = router