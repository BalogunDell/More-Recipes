import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default class AddRecipe extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/recipe">
            <img src="images/logo.png" width="270" height="59" alt="logo" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav col-lg-6">
              <input className="form-control mr-sm-2" type="text" placeholder="Search recipe" aria-label="Search" />
            </ul>
          </div>
          <a className="navbar-brand" href="#"><img src="images/bell.png" width="32" height="33" alt="bell" /></a>
          <NavLink className="navbar-brand" to="/profilepage"><img src="images/picture.png" width="45" height="45" alt="picture" /></NavLink>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Profile</button>
            <div className="dropdown-menu">
              <NavLink className="dropdown-item" to="/profilepage">View profile</NavLink>
              <NavLink className="dropdown-item" to="/addrecipe">My Recipes</NavLink>
              <NavLink className="dropdown-item" to="/favoriterecipe">Favorite Recipes</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item"to="/">Log out</NavLink>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="post-form">
                <h4>Recipe Name</h4>
                <textarea></textarea>
                <h4>Ingredients</h4>
                <textarea></textarea>
                <h4>Details</h4>
                <textarea></textarea>
              </div>
              <label className="custom-file">
                <input type="file" id="file2" className="custom-file-input" />
                <span className="custom-file-control">Upload Picture</span>
              </label>
              <div className="input-group">
                <a href="#" className="btn btn-outline-danger btn-lg">Post</a>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img className="card-img-top" src="images/dessert salad.png" alt="dessert salad" />
                <div className="card-body">
                  <h4 className="card-title">Dessert Recipe</h4>
                  <p className="card-text">A fun salad that kids, and just about everyone else, will love. Fruit cocktail, grapes, mandarin
                            oranges, whipped topping and mini marshmallows, are stirred together and chilled. Serves eight</p>
                  <Link to="/viewrecipe" className="btn btn-success">Read more</Link> <hr />
                  <a href="#" className="btn btn-outline-primary">Edit</a>
                  <a href="#" className="btn btn-outline-danger">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}


