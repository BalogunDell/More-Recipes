import express from 'express';
import usersController from '../controllers/users';
import recipesController from '../controllers/recipes';
import reviewsController from '../controllers/reviews';
import favoriteRecipesController from '../controllers/favoriteRecipes';
import * as auth from '../middleware/authentication';

const app = express.Router();


// signup
app.post('/api/users/signup', usersController.signup);

// signin
app.post('/api/users/signin', usersController.signin);

// route middleware to verify a token
app.use(auth.default);

// get all users
app.get('/api/users', usersController.getUsers);

// add recipe
app.post('/api/recipes', recipesController.addRecipe);

// get all recipes
app.get('/api/recipes', recipesController.getRecipes);

// modify recipe
app.put('/api/recipes/:recipeId', recipesController.modifyRecipe);

// delete recipe
app.delete('/api/recipes/:recipeId', recipesController.deleteRecipe);

// post review
app.post('/api/recipes/:recipeId/reviews', reviewsController.postReview);

// get reviews
app.get('/api/recipes/:recipeId/reviews', reviewsController.getReviews);

// post favorite recipes
app.post('/api/users/:userId/recipes', favoriteRecipesController.favoriteRecipe);

// get all favorite recipes
app.get('/api/users/:userId/recipes', favoriteRecipesController.getfavoriteRecipe);


export default app;
