import db from '../models';

const { Reviews } = db;

export default {

  /** Post review
   * @param  {object} req - request
   * @param  {object} res - response
   */

  postReview(req, res) {
    Reviews
      .create({
        recipeId: req.params.recipeId,
        review: req.body.review,
        userId: req.body.userId
      })
      .then(review => res.status(201).json({
        review: (review.review)
      }))
      .catch(error => res.status(400).json(error));
  },

  /** Get reviews
   * @param  {object} req - request
   * @param  {object} res - response
   */

  getReviews(req, res) {
    Reviews
      .findAll({
        where: { recipeId: req.params.recipeId }
      })
      .then((reviews) => {
        if (reviews.length < 1) {
          res.status(404).json({
            message: 'No review found'
          });
        } else {
          res.status(201).json(reviews);
        }
      })
      .catch(error => res.status(404).json(error));
  }
};
