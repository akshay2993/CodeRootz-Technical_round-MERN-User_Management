import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
// export const authorize = (requiredMenus) => {
//   return async (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//       const decoded = jwt.verify(token, SECRET_KEY);
//       const user = await User.findById(decoded.id).populate('role');

//       if (!user) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }

//       const userMenus = user.role.menus;

//       const hasAccess = requiredMenus.every(menu => userMenus.includes(menu));
//       if (!hasAccess) {
//         return res.status(403).json({ message: 'Forbidden' });
//       }

//       req.user = user;
//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Unauthorized' });
//     }
//   };
// };

export const authenticate = (requiredRole) => {
    return async (req, res, next) => {
      const token = req.cookies.token;
  
      console.log(token)
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        if (requiredRole && decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Forbidden!' });
        }
  
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
    };
  };