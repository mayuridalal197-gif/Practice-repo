const db = require("../config/database");

// Create service request
const createServiceRequest = async (req, res) => {
    try {
        const { customer_id, service_type, description } = req.body;

        const [result] = await db.execute(
            `INSERT INTO service_requests
            (customer_id, service_type, description)
            VALUES (?, ?, ?)`,
            [customer_id, service_type, description]
        );

        const requestId = result.insertId;

        await db.execute(
            `insert into service_Status
            (request_id, status)
            values(?,?)`,
            [requestId,"pending"]
    );

        res.status(201).json({
            message: "Service request created successfully",
            request_id: requestId,
            status:"pending"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create service request",
            error: error.message
        });
    }
};

// Get all service requests
const getServiceRequests = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM service_requests"
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service requests",
            error: error.message
        });
    }
};

//Get Service Request by ID
const getServiceRequestById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM service_requests WHERE request_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service request",
            error: error.message
        });
    }
};

//updateservicerequest
const updateServiceRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { service_type, description } = req.body;

        const [result] = await db.execute(
            `UPDATE service_requests
             SET service_type = ?, description = ?
             WHERE request_id = ?`,
            [service_type, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        res.status(200).json({
            message: "Service request updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update service request",
            error: error.message
        });
    }
};

//delete service function
const deleteServiceRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM service_requests WHERE request_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service request not found"
            });
        }

        res.status(200).json({
            message: "Service request deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete service request",
            error: error.message
        });
    }
};

// Create service status
const createServiceStatus = async (req, res) => {
    try {
        const { request_id, status } = req.body;

        const currentStatus = status || "Pending";

        const [result] = await db.execute(
            `INSERT INTO service_status
            (request_id, status)
            VALUES (?, ?)`,
            [request_id, currentStatus]
        );

        res.status(201).json({
            message: "Service status created successfully",
            status_id: result.insertId,
            status: currentStatus
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create service status",
            error: error.message
        });
    }
};


// Get all service statuses
const getServiceStatuses = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM service_status"
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch service statuses",
            error: error.message
        });
    }
};

//updateservicestatus
const updateServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const [result] = await db.execute(
            `UPDATE service_status
             SET status = ?
             WHERE status_id = ?`,
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Service status not found"
            });
        }

        res.status(200).json({
            message: "Service status updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update service status",
            error: error.message
        });
    }
};
module.exports = {
    createServiceRequest,
    getServiceRequests,
    getServiceRequestById,
    updateServiceRequest,
    deleteServiceRequest,
    createServiceStatus,
    getServiceStatuses,
    updateServiceStatus
};
