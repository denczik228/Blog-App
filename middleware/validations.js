const { body } = require('express-validator');

const loginValidator = [
    body('email', 'Incorrect format of email').isEmail(),
    body('password', 'Password should be min 5 characters').isLength({min: 5}),
]

const registerValidation = [
body('email', 'Incorrect format of email').isEmail(),
body('password', 'Password should be min 5 characters').isLength({min: 5}),
body('fullName',
'Type a name'). isLength({ min: 3 }),
body('avatarUrl',
'Bad url of avatar') .optional(). isURL(),
]

const postCreateValidation = [
  body("title", "Type a title of post").isLength({min:3}).isString(),
  body("text", "Type a text of post").isLength({ min: 3 }).isString(),
  body("tags", "Incorrect format of tags").optional().isString(),
  body("imageUrl", "Bad url of image").optional().isString(),
];

module.exports={loginValidator, registerValidation, postCreateValidation}
