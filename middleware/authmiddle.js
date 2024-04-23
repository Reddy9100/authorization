exports.checkBearerToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: Missing bearer token" });
    }
  
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: "Unauthorized: Invalid bearer token format" });
    }
  
    const bearerToken = tokenParts[1];
    console.log(bearerToken)
  
    if (!bearerToken) {
      return res.status(401).json({ message: "Unauthorized: Empty bearer token" });
    }
  
    next();
  };