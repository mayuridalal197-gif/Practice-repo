const express = require("express");

const router = express.Router();

const {
    createServiceRequest,
    getServiceRequests,
    getServiceRequestById,
    updateServiceRequest,
    deleteServiceRequest,
    createServiceStatus,
    getServiceStatuses,
    updateServiceStatus
} = require("../apicontrollors/serviceController");

const {
    authMiddleware,
    roleMiddleware
} = require("../middleware/authMiddleware");


// ==================== SERVICE REQUESTS ====================

// Customer can create service request
router.post(
    "/",
    authMiddleware,
    roleMiddleware("customer"),
    createServiceRequest
);

// Admin can view all service requests
router.get(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    getServiceRequests
);

// Admin can view service request by ID
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    getServiceRequestById
);

// Admin can update service request
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateServiceRequest
);

// Admin can delete service request
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteServiceRequest
);


// ==================== SERVICE STATUS ====================

// Admin can create status
router.post(
    "/status",
    authMiddleware,
    roleMiddleware("admin"),
    createServiceStatus
);

// Admin can view statuses
router.get(
    "/status",
    authMiddleware,
    roleMiddleware("admin"),
    getServiceStatuses
);

// Admin + Technician can update status
router.put(
    "/status/:id",
    authMiddleware,
    roleMiddleware("admin", "technician"),
    updateServiceStatus
);


module.exports = router;
