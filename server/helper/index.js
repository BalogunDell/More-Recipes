import winston from 'winston';
import nodemailer from 'nodemailer';
import model from '../models/';

const { Recipes, Users, Votes } = model;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

/** Send notification each time recipe get review
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 */

export const reviewNotification = (req) => {
  Recipes
    .findOne({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      Users
        .findOne({ where: { id: recipe.userId } })
        .then((user) => {
          const mailOptions = {
            from: '"More-Recipes" <rukayatodukoya123@gmail.com>',
            to: user.email,
            subject: 'You have a new Review',
            html: `<img style='width: 250px' src='http://res.cloudinary.com/ruqoyah/image/upload/v1513611853/logo_nqwsny.png'><hr />
            <p style='font-size: 16px'>Someone just review your recipe</p>`
          };

          transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
              winston.info('Email not sent!');
              return winston.info(error);
            }
            winston.info('Email sent to: %s', response);
          });
        });
    });
};


/** Send a signup notification
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 */

export const signupNotification = (req) => {
  Users
    .findOne({
      where: {
        email: req.body.email
      },
    })
    .then((user) => {
      const mailOptions = {
        from: '"More-Recipes" <rukayatodukoya123@gmail.com>',
        to: user.email,
        subject: 'Your More-Recipes account has been created',
        html: `<img style='width: 250px' src='http://res.cloudinary.com/ruqoyah/image/upload/v1513611853/logo_nqwsny.png'><hr />
        <p style='font-size: 16px'>Your account has been created – now 
        you can share recipe and also benefit from other people's recipe.</p>
        <a href="https://more-recipes-app.herokuapp.com/user/recipe"><button style="font-size: 14px; 
        background-color: #ff9304; padding: 10px; color: #fff;">Get Started</button></ a>`,
      };

      transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
          winston.info(error);
        }
        winston.info('Email sent to: %s', response);
      });
    });
};

/** Count vote each time user vote for a recipe
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 */

const getRecipeVoteCount = (req) => Votes
  .findAndCountAll({
    where: {
      upvote: 1, recipeId: req.params.recipeId,
    },
  })
  .then((upvoteCount) => Votes
    .findAndCountAll({
      where: {
        downvote: 1, recipeId: req.params.recipeId,
      },
    }).then((downvoteCount) => Recipes.findById(req.params.recipeId)
      .then((recipe) => recipe.update({ upvotes: upvoteCount.count,
        downvotes: downvoteCount.count },
      { fields: ['upvotes', 'downvotes'] }))));

/** Send respond to user after a vote for recipe
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const afterVote = (msg, req, res, vote) => {
  getRecipeVoteCount(req, vote).then(() => {
    Recipes.findById(req.params.recipeId)
      .then((createVote) => {
        createVote.reload({
          include: [{
            model: model.Users,
            attributes: ['username']
          }]
        })
          .then(result => res.status(200).json({
            status: true,
            message: msg,
            data: result
          }));
      });
  });
};


//Check if user query is valid or not
export const validateQuery = (query, validQuery) => {
  for (let index = 0; index < validQuery.length; index += 1) {
    if (validQuery[index] === query) {
      return true;
    }
  }
  return false;
};

// Capitalize every first letter of each word in an array
export const capitalize = (userinput) => {
  const finalString = [];
  userinput.split(' ').forEach((word) => {
    finalString.push(word.replace(word[0], word[0].toUpperCase()));
  });
  return finalString.join(' ');
};
