const db = require("../config/database");

// Create appointment
const createAppointment = async (req, res) => {
    try {
        const {
            request_id,
            customer_id,
            technician_id,
            appointment_date,
            appointment_time
        } = req.body;

        const [result] = await db.execute(
            `INSERT INTO appointments
            (request_id, customer_id, technician_id, appointment_date, appointment_time)
            VALUES (?, ?, ?, ?, ?)`,
            [
                request_id,
                customer_id,
                technician_id,
                appointment_date,
                appointment_time
            ]
        );

        res.status(201).json({
            message: "Appointment created successfully",
            appointment_id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create appointment",
            error: error.message
        });
    }
};

// Get all appointments
const getAppointments = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM appointments"
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch appointments",
            error: error.message
        });
    }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM appointments WHERE appointment_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch appointment",
            error: error.message
        });
    }
};


// Update appointment
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            technician_id,
            appointment_date,
            appointment_time
        } = req.body;

        const [result] = await db.execute(
            `UPDATE appointments
             SET technician_id = ?, appointment_date = ?, appointment_time = ?
             WHERE appointment_id = ?`,
            [
                technician_id,
                appointment_date,
                appointment_time,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Appointment updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update appointment",
            error: error.message
        });
    }
};


// Delete appointment
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM appointments WHERE appointment_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Appointment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to deleted appointment",
            error: error.message
        });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
