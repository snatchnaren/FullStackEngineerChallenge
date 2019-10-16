const employeeRouter = require('express').Router();

const employeeDBHandler = require('../db_handlers/employees');

/**
 * this is our create method
 * this method adds new data in our database
 */
employeeRouter.post('/', async (req, res) => {
    const { name, emailID } = req.body;
    if (!name || name.length === 0 || !emailID || emailID.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'INVALID INPUTS',
        });
    }

    /**
     * Checks for existing user present in DB with same email address
     */
    let dbResponse = await employeeDBHandler.GetByEmailID(emailID)
    if(dbResponse === 'error') {
        return res.status(500).json({
            success: false,
            message: "Employee is failed to add! Sorry!" 
        });
    } else if(dbResponse !== null) {
        return res.status(400).json({
            success: false,
            message: 'User already exist in DB.',
        });
    }

    /* Adding employee to DB */
    dbResponse = await employeeDBHandler.Save(name, emailID)
    switch(dbResponse.status) {
        case 'success':
            return res.status(200).json({ 
                success: true, 
                data: dbResponse.data, 
                message: "Employee is created successfully!" 
            });
        case 'error':
        default:
            return res.status(500).json({ 
                success: false, 
                message: "Employee is failed to add! Sorry!" 
            });
    }
});

/**
 * this is our get method
 * this method fetches all available data in our database
 */
employeeRouter.get('/', (req, res) => {
    return res.json({ success: true, data: "TODO-API. S O R R Y! " });
});

/**
 * Retrieve particular employee's performance review list
 */
employeeRouter.get('/:employeeID/reviews', (req, res) => {
    return res.json({ success: true, data: "TODO-API. S O R R Y! " });
});

/**
 * this is our delete method
 * this method removes existing data in our database
 */
employeeRouter.delete('/', (req, res) => {
    return res.json({ success: true, data: "TODO-API. S O R R Y! " });
});

/**
 * this method overwrites existing data in our database
 */
employeeRouter.put('/', (req, res) => {
    return res.json({ success: true, data: "TODO-API. S O R R Y! " });
});

module.exports = employeeRouter;