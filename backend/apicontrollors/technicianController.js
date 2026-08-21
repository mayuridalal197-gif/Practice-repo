const db = require("../config/database");

// Create technician
const createTechnician = async (req, res) => {
    try {
        const {
            name,
            phone,
            specialization,
            availability
        } = req.body;

        const [result] = await db.execute(
            `INSERT INTO technicians
            (name, phone, specialization, availability)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                phone,
                specialization,
                availability || "Available"
            ]
        );

        res.status(201).json({
            message: "Technician created successfully",
            technician_id: result.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create technician",
            error: error.message
        });
    }
};

// Get all technicians
const getTechnicians = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM technicians"
        );

        res.status(200).json(rows);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch technicians",
            error: error.message
        });
    }
};

// Get technician by ID
const getTechnicianById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM technicians WHERE technician_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Technician not found"
            });
        }

        res.status(200).json(rows[0]);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch technician",
            error: error.message
        });
    }
};


// Update technician
const updateTechnician = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            phone,
            specialization,
            availability
        } = req.body;

        const [result] = await db.execute(
            `UPDATE technicians
             SET name = ?, phone = ?, specialization = ?, availability = ?
             WHERE technician_id = ?`,
            [
                name,
                phone,
                specialization,
                availability,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Technician not found"
            });
        }

        res.status(200).json({
            message: "Technician updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update technician",
            error: error.message
        });
    }
};


// Delete technician
const deleteTechnician = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.execute(
            "DELETE FROM technicians WHERE technician_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Technician not found"
            });
        }

        res.status(200).json({
            message: "Technician deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete technician",
            error: error.message
        });
    }
};

module.exports = {
    createTechnician,
    getTechnicians,
    getTechnicianById,
    updateTechnician,
    deleteTechnician
};
