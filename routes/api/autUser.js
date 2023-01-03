const express = require("express");
const router = require("express").Router();
const authUser = require("../../controllers/authController.js");

router.route("/").post(authUser.authUser);


module.exports = router