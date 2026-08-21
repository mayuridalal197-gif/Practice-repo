const express = require("express");

const router = express.Router();

const {
    createTechnician,
    getTechnicians,
    getTechnicianById,
    updateTechnician,
    deleteTechnician
} = require("../apicontrollors/technicianController");

const {
    authMiddleware,
    roleMiddleware
} = require("../middleware/authMiddleware");


// Admin can create technician
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createTechnician
);


// Admin can view all technicians
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getTechnicians
);


// Admin can view technician by ID
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getTechnicianById
);


// Admin can update technician
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateTechnician
);


// Admin can delete technician
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteTechnician
);


module.exports = router;
