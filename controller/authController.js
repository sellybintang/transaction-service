const { authAdmin, db, authClient } = require("../config/auth");
const { signInWithEmailAndPassword } = require("firebase/auth");
const jwt = require("jsonwebtoken");
// Register
const register = async (req, res) => {
  try {
    const { email, password, nama, address, no_telp, role } = req.body;
    const credential = await authAdmin.createUser({ email, password });

    const user = credential.uid;
    const userCollection = await db.collection("Users").doc(user);

    await userCollection.set({
      nama,
      address,
      role,
      no_telp,
    });

    const roles = [1, 2, 3];

    if (!roles.includes(role)) {
      return res.status(400).json({
        status: "400",
        message: "role is not available ",
      });
    }
    res.status(200).json({
      status: "200",
      message: "Successfully created user",
      data: {
        email,
        password,
        nama,
        address,
        role,
        no_telp,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userLogin = await signInWithEmailAndPassword(
      authClient,
      email,
      password
    );
    console.log(userLogin.user.uid);
    console.log(userLogin.user.email);
    const tokenPayload = {
      uid: userLogin.user.uid,
      email: userLogin.user.email,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

    res.status(200).json({
      status: "200",
      message: "Successfully signed the user",
      data: {
        token,
        uid: userLogin.uid,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

const listUser = async (req, res) => {
  try {
    const list = await authAdmin.listUsers();
    res.status(200).json({
      status: "200",
      message: "Successfully signed the user",
      list,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: error.message,
    });
  }
};

module.exports = { register, login, listUser };
