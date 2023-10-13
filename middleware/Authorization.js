const jwt = require("jsonwebtoken");
const firebaseAdmin = require("../config/auth");
// const { authAdmin, db } = require("../config/auth");

const authorization = async (req, res, next) => {
  try {
    const Bearer = req.headers.authorization;
    if (!Bearer) {
      res.status(403).json({
        status: "403",
        message: "Invalid Bearer-Token",
      });
    }

    const token = await Bearer.split("Bearer ")[1];
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenPayload.exp && tokenPayload.exp < Math.floor(Date.now() / 1000)) {
      return res.status(500).json({
        status: "403",
        message: "your token have expired. Please try again",
      });
    }
    const user = await firebaseAdmin.authAdmin.getUser(tokenPayload.uid);

    const credentials = await firebaseAdmin.db
      .collection("Users")
      .doc(tokenPayload.uid)
      .get();

    const newData = {
      uid: user.uid,
      email: user.email,
      nama: credentials.data().nama,
      address: credentials.data().address,
      no_telp: credentials.data().no_telp,
      role: credentials.data().role,
    };
    // console.log(credentials.data().nama);
    req.user = newData;

    next();
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const user_agen = async (req, res, next) => {
  try {
    if (req.user.role !== 1 && req.user.role !== 2)
      return res.status(403).json({
        status: "403",
        message: "otorisasi tidak sesuai",
      });

    next();
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 3)
      return res.status(403).json({
        status: "403",
        message: "otorisasi tidak sesuai",
      });

    next();
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};
module.exports = { authorization, user_agen, isAdmin };
