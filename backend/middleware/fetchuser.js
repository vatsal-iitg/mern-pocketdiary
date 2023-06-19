var jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "vatsaljain";


const fetchuser = (req, res, next) => {
  // get user from jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token/ token does not exist" });
  }

  try {
    

    // verification of token
  const data = jwt.verify(token,JWT_SECRET_KEY)
  req.user = data.user


  next(); // calls async


  } catch (error) {
    res.status(401).send({error:"Please authenticate using a valid token/ Token is invalid"})
  }
};

module.exports = fetchuser;
