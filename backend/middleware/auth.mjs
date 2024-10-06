import jwt from "jsonwebtoken";

// Secret used to sign the JWT
const secret = "this_secret_should_be_longer_than_it_is"; // Ideally, store this in environment variables

// Middleware function to authenticate JWT
const authenticateToken = (req, res, next) => {
  // Extract token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Authorization header format: "Bearer TOKEN"

  // Check if token is not provided
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  // Verify the token
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach user information to the request object (req.user)
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
