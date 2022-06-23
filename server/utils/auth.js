const jwt = require('jsonwebtoken');

const secret = 'mysupersecretsecret';

const expirtation = '2h';

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expirtation });
  }, 

  authMiddleware: function ({ req }) {
      // allows token to be sent via req.body, req.query, or headers
      let token = req.body.token || req.query.token || req.headers.authorization;

      // separate "Bearer" from the token value in header
       if (req.headers.authorization) {
           token= token.split(' ').pop().trim();4
       }

       //if no toke, return request object as is
       if(!token) {
           return req;
       }

       try {
           //decode and attach user data to request object
           const { data} = jwt.verify(token, secret, { maxAge: expirtation});
           req.user = data;
       } catch{
           console.log('Invalid Token')
       }

       // return upated request object
       return req;
  }
};
