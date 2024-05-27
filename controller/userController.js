const userModel = require("../model/userModel")

exports.registerFunction = (req,res)=>{
    const{name,email,password}  = req.body
    userModel.registerUser(name,email,password,(err,results)=>{
        if(err){
            return res.status(500).json({message : "Internal Server Error"})
        }
        if(results.code == 409){
            return res.status(409).json({message : results.message})
        }
        return res.status(200).json({message : results.message})
    })
}

exports.loginFunction = (req, res) => {
  const { email, password } = req.body;
  userModel.userLogin(email, password, (err, result) => {
      if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.code == 400) {
          return res.status(400).json({ message: result.message });
      }
      if (result.code == 401) {
          return res.status(401).json({ message: result.message });
      }

      // User is authenticated, generate a JWT
      const token = jwt.sign(
          {
              email: email
          },
         "DataEvolve@112",
          {
              expiresIn: '1h' // Defines the expiration time of the token
          }
      );

      // Send the JWT to the client
      return res.status(200).json({ message: result.message, token: token });
  });
};
