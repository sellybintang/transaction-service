const authRoutes = require("./authRoutes");
const transactionRoutes = require("./transactionRoutes");
const paymentRoutes = require("./paymentRoutes");

const router = require("express").Router();

router.use("/", authRoutes);
router.use("/", transactionRoutes);
router.use("/", paymentRoutes);

module.exports = router;
