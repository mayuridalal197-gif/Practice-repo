const db = require("../config/database");

const getDashboard = async (req, res) => {
    try {
        const [customers] = await db.execute(
            "SELECT COUNT(*) AS total FROM customers"
        );

        const [serviceRequests] = await db.execute(
            "SELECT COUNT(*) AS total FROM service_requests"
        );

        const [appointments] = await db.execute(
            "SELECT COUNT(*) AS total FROM appointments"
        );

        const [technicians] = await db.execute(
            "SELECT COUNT(*) AS total FROM technicians"
        );

        const [completed] = await db.execute(
            "SELECT COUNT(*) AS total FROM service_status WHERE status = 'Completed'"
        );

        const [pending] = await db.execute(
            "SELECT COUNT(*) AS total FROM service_status WHERE status = 'Pending'"
        );

        res.status(200).json({
            customers: customers[0].total,
            service_requests: serviceRequests[0].total,
            appointments: appointments[0].total,
            technicians: technicians[0].total,
            completed_services: completed[0].total,
            pending_services: pending[0].total
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch dashboard data",
            error: error.message
        });
    }
};

module.exports = {
    getDashboard
};