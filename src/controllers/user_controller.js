/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';


dotenv.config({ silent: true });


export const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
};


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
  return next();
};


export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;


  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }


  User.find({ email })
    .then((result) => {
      console.log(result);
      console.log(result.length === 0);
      if (result.length === 0) {
        const user = new User();
        user.email = email;
        user.password = password;
        user.username = username;
        console.log('inside signup user controller');
        user.save()
          .then(() => {
            return res.send({ token: tokenForUser(user) });
          })
          .catch((err) => {
            console.log('inside user.save err');
            return res.status(500).json({ err });
          });
      } else {
        console.log('inside email already belongs to a user');
        return res.status(422).send('This email already belongs to a user');
      }
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
