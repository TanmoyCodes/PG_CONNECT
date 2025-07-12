const jwt = require('jsonwebtoken');

const authMiddleware =(req, res, next) => {
   try {
    const token = req.cookies.token; // Assuming the token is stored in cookies
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret key
    if(!user){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = user.id; 

    next(); // If verification is successful, proceed to the next middleware or route handler
    
   } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
   }
}



module.exports = {
    authMiddleware: authMiddleware
};