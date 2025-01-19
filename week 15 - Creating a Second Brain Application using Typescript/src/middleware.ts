import jwt from 'jsonwebtoken'
const JWT_SECRET = 'user-jwt-secret';

// ------------------------------------------------------>

function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.authorization;

  try {
      if (token) {
          jwt.verify(token, JWT_SECRET, (err: any, decode: any) => {

              if (err) {
                  res.json({
                      message: 'token not provided in the headers.'
                  })

              } else {
                  req.userId = decode;
                  next()
              }
          })
          
      } else {
          res.json({
              message: 'user not authorized.'
          })
      }

  } catch (error) {

      res.json({
          message: 'middleware not working.'
      })

  }
}

// ------------------------------------------------------>

export { authMiddleware }