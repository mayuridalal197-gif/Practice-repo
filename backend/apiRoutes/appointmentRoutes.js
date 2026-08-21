const express = require("express");

const router = express.Router();

const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} = require("../apicontrollors/appointmentController");

const {
    authMiddleware,
    roleMiddleware
} = require("../middleware/authMiddleware");


// Admin can create appointment
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createAppointment
);


// Admin can view all appointments
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getAppointments
);


// Admin can view appointment by ID
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getAppointmentById
);


// Admin can update appointment
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateAppointment
);


// Admin can delete appointment
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteAppointment
);


module.exports = router;
