import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = 'user-jwt-secret';

interface AuthenticatedRequest extends Request {
  userDetails?: string | JwtPayload; // Add a custom field to store decoded token details
}

// function userAuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
          // @ts-ignore
function userAuthMiddleware(req: any, res: any, next) {
  const token = req.headers.authorization;

  try {
    if (token) {
      jwt.verify(token, JWT_SECRET, (err: any, decode: any) => {
        if (err) {
          return res.status(401).json({
            message: 'User Unauthorized',
          });
        } else {
          // @ts-ignore
          req.userDetails = decode;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: 'User Unauthorized',
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to proceed authorization process (user middleware).',
    });
  }
}

export { userAuthMiddleware, AuthenticatedRequest };




































// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

// const JWT_SECRET = 'user-jwt-secret';

// interface AuthenticatedRequest extends Request {
//   userDetails?: string | JwtPayload; // Add a custom field to store decoded token details
// }

// function userAuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
//   const token = req.headers.authorization;

//   try {
//     if (token) {
//       jwt.verify(token, JWT_SECRET, (err, decode) => {
//         if (err) {
//           return res.status(401).json({
//             message: 'User Unauthorized',
//           });
//         } else {
//           req.userDetails = decode;
//           next();
//         }
//       });
//     } else {
//       res.status(401).json({
//         message: 'User Unauthorized',
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Unable to proceed authorization process (user middleware).',
//     });
//   }
// }

// export { userAuthMiddleware, AuthenticatedRequest };
