exports.createPostValidator = (req,res,next) => {
  //title
  req.check('title', "Title is required").notEmpty();
  req.check('title',"Title must be between 4 to 150 characters.").isLength({
    min:4, max: 150
  });
  //Body
  req.check('body', "Text is required").notEmpty();
  req.check('body',"body must be between 4 to 2000 characters.").isLength({
    min:4, max: 2000
  });
  //check for errors
  const errors = req.validationErrors();
  if(errors){
    const firstError = errors[0].msg;
    return res.status(400).json({error: firstError});
  }
  next();
};

exports.userSignUpValidator= (req,res,next) => {
  req.check('name',"Name is required").notEmpty();
  req.check('name',"Name must contain at least 5 characters").isLength({min: 5});
  req.check('email',"Write your Email right").isEmail();
  req.check('email',"Email must contain at least 6 characters").isLength({
    min: 6
  });
  req.check('password',"Password is required").notEmpty();
  req.check('password')
      .isLength({min: 6})
      .withMessage("Password must contain least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number");

  const errors = req.validationErrors();
  if(errors){
    const firstError = errors[0].msg;
    return res.status(400).json({error: firstError});
  }
  next();
};

exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("newPassword", "Password is required").notEmpty();
  req.check("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
      .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware or ...
  next();
};
