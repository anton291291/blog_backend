import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validateLoginInput from '../validation/login';
import validateRegisterInput from '../validation/register';

import User from '../models/User';

class UserController {

  register  (req, res)  {

      const { errors, isValid } = validateRegisterInput(req.body);

      if(!isValid) {
          return res.status(400).json(errors);
      }
      User.findOne({
          email: req.body.email
      }).then(user => {
          if(user) {
              return res.status(400).json({
                  email: 'Email уже зарегистрирован'
              });
          }
          else {
              const newUser = new User({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
              });

              bcrypt.genSalt(10, (err, salt) => {
                  if(err) console.error('There was an error', err);
                  else {
                      bcrypt.hash(newUser.password, salt, (err, hash) => {
                          if(err) console.error('There was an error', err);
                          else {
                              newUser.password = hash;
                              newUser
                                  .save()
                                  .then(user => {
                                      res.json(user)
                                  });
                          }
                      });
                  }
              });
          }
      });
  };

  login (req, res) {

      const { errors, isValid } = validateLoginInput(req.body);

      if(!isValid) {
          return res.status(400).json(errors);
      }

      const email = req.body.email;
      const password = req.body.password;

      User.findOne({email})
          .then(user => {
              if(!user) {
                  errors.email = 'Пользователь не найден'
                  return res.status(404).json(errors);
              }
              bcrypt.compare(password, user.password)
                      .then(isMatch => {
                          if(isMatch) {
                              const payload = {
                                  id: user.id
                              }
                              jwt.sign(payload, 'pomidorchik', {
                                  expiresIn: 3600
                              }, (err, token) => {
                                  if(err) console.error('There is some error in token', err);
                                  else {
                                      res.json({
                                          success: true,
                                          token: `Bearer ${token}`
                                      });
                                  }
                              });
                          }
                          else {
                              errors.password = 'Некорректный пароль';
                              return res.status(400).json(errors);
                          }
                      });
          });
  };

  auth(req,res) {
        return res.json({
            id: req.user.id,
            email: req.user.email
        });

  };

};

export default UserController;
