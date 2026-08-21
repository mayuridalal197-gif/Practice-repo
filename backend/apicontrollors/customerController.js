const db = require("../config/database");

//for creating customer
const createCustomer = async (req,res) => {
    try{
        const {name,email,phone,address}=req.body;

        const[result] = await db.execute(
            `INSERT INTO customers (name, email, phone, address)
            values(?, ?, ?, ?)`,
            [name, email, phone, address] 
        );

        res.status(201).json({
            message: "Customer created successfully",
            customer_id : result.insertId
        });

    }catch(error){
        res.status(500).json({
            message: "failed to create customer",
            error: error.message
        });
    }
    
};

//get customers
const getCustomers = async(req,res)=>{
    try {
        const [rows] = await db.execute(
            `select * from customers`
        );

        res.status(200).json(rows);
    }catch(error){
        res.status(500).json({
            message: "failed to fetch customer",
            error: error.message
        })
    }
}

//get customer by id
const getCustomersById = async(req,res) =>{
    try{
        const {id} = req.params;

        const[rows] = await db.execute(
            `select * from customers where customer_id = ?`,[id]
        );

        if(rows.length === 0)
        {
            return res.status(404).json({
                message:"Customer not found"
            });
        }

        res.status(200).json(rows[0]);
    }
    catch(error){
        res.status(500).json({
            message:"Failed to fetch customer",
            error:error.message
        });
    }
};

const updatecustomer = async (req,res)=>{
    try{
        const[id] = req.params;
        const{name , email, phone, address} = req.body;

        const[result] = await db.execute(`
            update customers set name = ?, phone = ?, address = ?
            where customer_id = ?
            `,[name, email, phone, address,id]
        );
        if(result.affectedRows === 0){
            return res, status(404).json({
                message:"customer not found"
            });
        }

        res.status(200).json({
            message:"Customer updated successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to upgrade customer",
            error:error.message
        });
    }
};

const deletecustomer = async(req,res)=>{
    try{
        const{id} = req.params;

        const[rusult] = await db.execute(
            "Delete from customers where customer_id = ?",[id]
        );

        if(result.affectedRows === 0)
        {
            return res.status(404).json({
                message:"customer not found"
            });
        }

        res.status(200).json({
            message:"Costumer deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to delete customer",
            error:error.message 
        });
    }
};
module.exports = {
    createCustomer,
    getCustomers ,
    getCustomersById,
    updatecustomer,
    deletecustomer
};
