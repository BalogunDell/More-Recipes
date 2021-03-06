import axios from 'axios';
import {
  GET_USER_RECIPES,
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_FAVORITE_RECIPES,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  ADD_REVIEW,
  VIEW_RECIPE,
  GET_REVIEW,
  EDIT_RECIPE,
  DELETE_RECIPE,
  SAVE_RECIPE_IMAGE,
  LOAD_MORE_REVIEWS
} from './types';

/**
 * @description Save image
 *
 * @param  {object} response the response
 *
 * @return {object} dispatch object
 */
export const saveImage = (response) => ({
  type: SAVE_RECIPE_IMAGE,
  payload: response
});

/**
 * @description Request to save image to cloudinary
 *
 * @param  {object} image the image to be saved
 *
 * @return {object} dispatch object
 *
 */
export const saveImageToCloud = (image) => {
  const request = process.env.REQUEST;
  const cloudPreset = process.env.CLOUD_PRESET;

  const newFormData = new FormData();
  newFormData.append('file', image);
  newFormData.append('upload_preset', cloudPreset);
  delete axios.defaults.headers.common.Authorization; // eslint-disable-line
  return dispatch => axios.post(request, newFormData)
    .then(({ data }) => {
      let token = localStorage.getItem('token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(saveImage(data.public_id));
    })
    .catch((error) => {
      throw (error);
    });
};

/**
 * @description Request to the API to add recipe
 *
 * @param  {object} recipeDetails the recipe details to be saved
 *
 * @return {object} dispatch object
 */
export const addRecipeAction = (recipeDetails) =>
  axios.post('/api/v1/recipes', recipeDetails)
    .then((res) => { // eslint-disable-line
      return res.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * @description Request to the API to get user recipes
 *
 * @param  {Number} page the user id passed in the param
 *
 * @return {object} dispatch object
 */
export const getUserRecipeAction = (page) => (dispatch) =>
  axios.get(`/api/v1/users/recipes?page=${page}`)
    .then((res) => {
      dispatch({
        type: GET_USER_RECIPES,
        payload: res.data
      });
    })
    .catch(error => error.response);


/**
 * @description Request to the API to get all recipes
 *
 * @param  {Number} page the user id passed in the param
 *
 * @return {object} dispatch object
 */
export const getAllRecipeAction = (page) => (dispatch) =>
  axios.get(`/api/v1/recipes?page=${page}`)
    .then((res) => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(error => error.response);

/**
 * @description Request to the API to search for recipes
 *
 * @param  {string} search the value that need to be shown
 *
 * @return {object} dispatch object
 *
 */
export const searchRecipesAction = (search) => (dispatch) =>
  axios.get(`/api/v1/recipes?search=${search}`)
    .then((res) => {
      dispatch({
        type: SEARCH_RECIPES,
        payload: res.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * @description Request to the API to favorite recipe
 *
 * @param  {Number} recipeId the recipe id to be pass in the param
 *
 * @return {object} dispatch object
 *
 */
export const favoriteAction = (recipeId) =>
  axios.post(`/api/v1/recipes/${recipeId}/favorite`)
    .then(res => res.data.message)
    .catch(error => Promise.reject(error.response.data.message));

/**
 * @description Request to the API to get favorite recipe
 *
 * @param  {Number} page the user id to be pass in the param
 *
 * @return {object} dispatch object
 */
export const getFavoriteAction = (page) => (dispatch) =>
  axios.get(`/api/v1/users/recipes/favorite?page=${page}`)
    .then((res) => {
      dispatch({
        type: GET_FAVORITE_RECIPES,
        payload: res.data
      });
    })
    .catch(error => error.response);


/**
 * @description Request to the API to upvote recipes
 *
 * @param  {Number} recipeId the recipe id to be pass in the param
 *
 * @return {object} dispatch object
 *
 */
export const upvoteRecipeAction = (recipeId) => (dispatch) =>
  axios.post(`/api/v1/recipes/${recipeId}/upvote`)
    .then((res) => {
      dispatch({
        type: UPVOTE_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);

/**
 * @description Request to the API to downvote recipes
 *
 * @param  {Number} recipeId the recipe id to be pass to the param
 *
 * @return {object} dispatch object
 *
 */
export const downvoteRecipeAction = (recipeId) => (dispatch) =>
  axios.post(`/api/v1/recipes/${recipeId}/downvote`)
    .then((res) => {
      dispatch({
        type: DOWNVOTE_RECIPE,
        payload: res.data
      });
    })
    .catch(error => error.response);

/**
 * @description Request to the API to view recipe
 *
 * @param  {Number} recipeId the recipe id to be pass to the param
 *
 * @return {object} dispatch object
 *
 */
export const viewRecipeAction = (recipeId) => (dispatch) =>
  axios.get(`/api/v1/recipes/${recipeId}`)
    .then((res) => {
      dispatch({
        type: VIEW_RECIPE,
        payload: res.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * @description Request to the API to review recipe
 *
 * @param  {Number} recipeId the recipe id to be pass to the param
 *
 * @param  {string} details the review to be save in database
 *
 * @return {object} dispatch object
 *
 */
export const reviewRecipeAction = (recipeId, details) => (dispatch) =>
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, details)
    .then((res) => {
      dispatch({
        type: ADD_REVIEW,
        payload: res.data
      });
    })
    .catch(error => error.response);

/**
 * @description Request to the API to get recipe reviews
 *
 * @param  {Number} recipeId the recipe id to be pass in the param
 *
 * @param  {Number} page the recipe id to be pass in the param
 *
 * @return {object} dispatch object
 *
 */
export const getReviewAction = (recipeId, page) => (dispatch) =>
  axios.get(`/api/v1/recipes/${recipeId}/reviews?page=${page}`)
    .then((res) => {
      if (page === 1) {
        dispatch({
          type: GET_REVIEW,
          payload: res.data
        });
      } else {
        dispatch({
          type: LOAD_MORE_REVIEWS,
          payload: res.data
        });
      }
    })
    .catch(error => error.response);

/**
 * @description Request to the API to delete recipes
 *
 * @param  {Number} recipeId the recipe id to be pass in the param
 *
 * @return {object} dispatch object
 *
 */
export const deleteRecipeAction = (recipeId) => (dispatch) =>
  axios.delete(`/api/v1/recipes/${recipeId}`)
    .then((res) => {
      dispatch({
        type: DELETE_RECIPE,
        id: Number(res.data.data.id)
      });
    })
    .catch(error => error.response);

/**
 * @description Request to the API to edit recipes
 *
 * @param  {Number} recipeId the recipe id to be pass in the param
 *
 * @param  {object} editRecipes the details to be save in database
 *
 * @return {object} dispatch object
 *
 */
export const editRecipeAction = (recipeId, editRecipes) => (dispatch) =>
  axios.put(`/api/v1/recipes/${recipeId}`, editRecipes)
    .then((res) => {
      dispatch({
        type: EDIT_RECIPE,
        payload: res.data.data
      });
      return res.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
