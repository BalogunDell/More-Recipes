import bcrypt from 'bcrypt';
import db from '../models/';

const { Recipes, Users, Votes } = db;

/** Check if user recipe input is empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkRecipeInput = (req, res, next) => {
  if (!req.body.recipeName) {
    return res.status(400).json({ message: 'Enter recipe name' });
  }
  if (!req.body.ingredient) {
    return res.status(400).json({ message: 'Input ingredient' });
  }
  if (!req.body.details) {
    return res.status(400).json({ message: 'Input details' });
  }
  next();
};

/** Check if user signup input is empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkUserInput = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (!req.body.fullName) {
    return res.status(400).json({ message: 'fullName is required' });
  }
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  if (!req.body.cpassword) {
    return res.status(400).json({ message: 'You need to confirm your password' });
  }
  next();
};


/** Check if user signup with a valid username, email and password
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkValidUserInput = (req, res, next) => {
  req.checkBody(
    {
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: 'Please provide a username with atleast 5 characters.'
        }
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Provide a valid a Email Adrress'
        }
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Provide a valid password with minimum of 8 characters'
        }
      }
    }
  );
  const errors = req.validationErrors();
  if (errors) {
    const allErrors = [];
    errors.forEach((error) => {
      allErrors.push({
        error: error.msg,
      });
    });
    return res.status(409)
      .json(
        allErrors
      );
  }
  next();
};

/** Check if review and user id is empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkReviewInput = (req, res, next) => {
  if (!req.body.review) {
    return res.status(400).json({ message: 'Review can\'t be empty' });
  }
  if (!req.body.userId) {
    return res.status(400).json({ message: 'You need to enter your user Id' });
  }
  next();
};

/** Check if recipe id input in body exist or empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkRecipeId = (req, res, next) => {
  Recipes
    .findOne({
      where: {
        id: req.body.recipeId
      }
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'recipe Id does not exist'
        });
      }
    });
  if (!req.body.recipeId) {
    return res.status(400).json({ message: 'Recipe Id can\'t be empty' });
  }
  next();
};

/** Check if user id input in body exist or empty
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const checkUserId = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: 'User Id can\'t be empty' });
  }
  Recipes
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'user Id does not exist'
        });
      }
      next();
    });
};

/** Check if username and email already exist and password does not match
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateUsers = (req, res, next) => {
  Users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      Users
        .findOne({
          where: {
            email: req.body.email
          },
        })
        .then((email) => {
          if (email) {
            return res.status(400).json({ message: 'Email already exists' });
          }
          if (req.body.password !== req.body.cpassword) {
            return res.status(400).json({ message: 'Password does not match' });
          }
          next();
        });
    });
};

/** Check if user exist and if input an incorrect password
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateLoginUser = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({
      message: 'Please provide your username'
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      message: 'Please provide your password'
    });
  }
  Users
    .findOne({
      where: {
        username: req.body.username
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(400).json({ success: false, message: 'Wrong password' });
      }
      next();
    });
};

/** Check if recipe id input in param exist
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateRecipesId = (req, res, next) => {
  Recipes
    .findOne({
      where: { id: req.params.recipeId }
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({
          message: 'No recipe Id found'
        });
      }
      next();
    });
};

/** Check if user id input in param exist
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateUsersId = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: 'User Id can\'t be empty' });
  }
  Users
    .findOne({
      where: {
        id: req.body.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'No user Id found'
        });
      }
      next();
    });
};

export const validateParamUserId = (req, res, next) => {
  Users
    .findOne({
      where: {
        id: req.params.userId
      }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'No user Id found'
        });
      }
      next();
    });
};

/** Upvote vote table 
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateUpVote = (req, res, next) => {
  Votes
    .findOne({
      where: {
        userId: req.body.userId,
        recipeId: req.params.recipeId
      }
    })
    .then((vote) => {
      if (vote) {
        return res.status(400).json({
          message: 'You already upvoted'
        });
      }
      Votes
        .create({
          recipeId: req.params.recipeId,
          userId: req.body.userId
        });
      next();
    });
};

/** Destroy user id from vote table if user downvote
 * @param  {object} req - request
 * @param  {object} res - response
 * @param  {object} next - next
 */

export const validateDownVote = (req, res, next) => {
  Votes
    .findOne({
      where: {
        userId: req.body.userId,
        recipeId: req.params.recipeId
      }
    })
    .then((vote) => {
      if (!vote) {
        return res.status(400).json({
          message: 'You already downvoted'
        });
      }
      Votes
        .destroy({
          where: {
            userId: req.body.userId,
            recipeId: req.params.recipeId
          }
        });
      next();
    });
};

