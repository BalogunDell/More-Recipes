import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import model from '../models';


const Users = model.Users;

const saltRounds = 10;

export default {
  // create user
  signup(req, res) {
    Users
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (user) {
          res.status(400).send({ message: 'Username already exists' });
        } else {
          Users
            .findOne({
              where: {
                email: req.body.email
              },
            })
            .then((email) => {
              if (email) {
                res.status(400).send({ message: 'Email already exists' });
              } else if (req.body.password !== req.body.cpassword) {
                res.status(400).send({ message: 'Password does not match' });
              } else {
                bcrypt.hash(req.body.password, saltRounds)
                  .then((hash) => {
                    Users.create({
                      fullName: req.body.fullName,
                      username: req.body.username,
                      email: req.body.email,
                      password: hash,
                      cpassword: hash
                    })
                      .then(display => res.status(201).send({
                        success: true,
                        message: 'You have successfully signed up',
                        username: display.username
                      }))
                      .catch(error => res.status(400).send(error));
                  });
              }
            });
        }
      });
  },


  // user signin
  signin(req, res) {
    Users
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ success: false, message: 'User not found' });
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.status(400).json({ success: false, message: 'Wrong password' });
        } else {
          const token = jwt.sign({ userId: user }, 'superSecret');
          res.status(201).json({
            success: true,
            message: 'You have successfully signed in!',
            token,
            userId: user.id
          });
        }
      });
  },

  // get all users
  getUsers(req, res) {
    Users
      .findAll({})
      .then((users) => {
        if (users.length < 1) {
          res.status(404).send({
            message: 'No User found'
          });
        } else {
          res.status(201).send(users);
        }
      })
      .catch(error => res.status(404).send(error));
  }
};
