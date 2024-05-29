const express = require('express');
const userRouter = require("./user");
const adminRouter = require("./admin");
const superAdminRouter = require('./superAdmin')

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/superAdmin", superAdminRouter)


module.exports = router