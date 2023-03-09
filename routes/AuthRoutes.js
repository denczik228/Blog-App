const express = require ("express");
const { UserRegistration } = require('../controllers/AuthLogic'); 

const router = express.Router();

router.post("/registration", UserRegistration);
//router.post("/login", getLogin);

module.exports = router