const express = require("express");

const router = express.Router();

const {
    getDashboard
} = require("../apicontrollors/dashboardController");

const {
    authMiddleware,
    roleMiddleware
} = require("../middleware/authMiddleware");

router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getDashboard
);

module.exports = router;