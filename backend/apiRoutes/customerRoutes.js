const express = require("express");

const router = express.Router();

const {
    createCustomer,
    getCustomers,
    getCustomersById,
    updatecustomer,
    deletecustomer
} = require("../apicontrollors/customerController");

const {
    authMiddleware,
    roleMiddleware
} = require("../middleware/authMiddleware");


// Admin can view all customers
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getCustomers
);


// Admin can view customer by ID
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getCustomersById
);


// Admin can create customer
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createCustomer
);


// Admin can update customer
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updatecustomer
);


// Admin can delete customer
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deletecustomer
);


module.exports = router;
