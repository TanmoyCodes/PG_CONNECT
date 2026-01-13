const jwt = require('jsonwebtoken');

const authMiddleware =(req, res, next) => {
   try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET); 
    if(!user){
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user=user;

    next(); 
    
   } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
}


const isAdmin = (req, res, next) => {
  const user = req.user; 
  if (user.role=='admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};


module.exports = {
    authMiddleware: authMiddleware,
    isAdmin:isAdmin
};