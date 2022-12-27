const express = require('express');
const router = express.Router();
const signin = require('../controller/user/signin');
const getUser = require('../controller/user/getUser');
const signup = require('../controller/user/signup');
const update = require('../controller/user/update');
const age = require('../middleware/age');
const auth = require('../middleware/auth');
const signupMiddleware = require('../middleware/signupMiddleware')
const updateMiddleware = require('../middleware/updateMiddleware')
const signinMiddleware = require('../middleware/signinMiddleware')
const logout = require('../controller/user/logout');
const checkEmail = require('../middleware/checkEmail');
router.post('/signup', [signupMiddleware, age, checkEmail], signup);
router.post('/signin', signinMiddleware, signin);
router.get('/get/:id', auth, getUser);
router.get('/logout/:id', auth, logout);
router.put('/update/:id', [updateMiddleware, age, auth], update);

module.exports = router;
