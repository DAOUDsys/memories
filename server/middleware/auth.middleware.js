import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token, isCustomAuth;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
    token = req.headers.authorization.split(" ")[1];
    isCustomAuth = token.length < 500;
    }

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth