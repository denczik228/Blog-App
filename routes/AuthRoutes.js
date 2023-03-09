const express = require ("express");
const { UserRegistration, getLoggedIn } = require('../controllers/AuthLogic'); 
const { postCreation, findPost, allPosts, updPost, delPost } = require("../controllers/PostStates");
const { authMiddleware } = require("../middleware/checksOfAuth");
const { loginValidator, registerValidation, postCreateValidation } = require("../middleware/validations");

const router = express.Router();

router.post("/registration", registerValidation, UserRegistration);
router.post("/login", loginValidator, getLoggedIn);

router.get('/post-creation', authMiddleware, postCreateValidation, postCreation);
router.get('/find-post/:id', authMiddleware, findPost);
router.get('/all-posts', authMiddleware, allPosts);
router.put('/post-updating/:id', authMiddleware, updPost);
router.delete('/delete-post/:id', authMiddleware, delPost);

module.exports = router