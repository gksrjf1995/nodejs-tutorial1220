const express = require('express');
const router = require('express').Router();
const {getAllemploys,
createNewemploy,
updateEmploy,
getemploy,
deleteemploy} = require("../../controllers/employControllers.js")


router.route('/')
.get(getAllemploys)
.post(createNewemploy)
.put(updateEmploy)
.delete(deleteemploy);

router.route("/:id").get(getemploy);

module.exports = router