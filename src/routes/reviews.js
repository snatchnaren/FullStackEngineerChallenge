const reviewRouter = require('express').Router();

const reviewRequestDBHandler = require('../db_handlers/review_requests');
const reviewDBHandler = require('../db_handlers/reviews');

/**
 * Retrieve all employee's performance review
 */
reviewRouter.get('/', (req, res) => {
    return res.json({ success: true, data: "TODO-API. S O R R Y! " });
});

/**
 * Add employee's performance review
 */
reviewRouter.post('/', async (req, res) => {

    /* Collecting data from API request */
    const { request_id, review } = req.body;

    /* Validating input data */
    if (
        !request_id || 
        request_id.length === 0 || 
        !review || 
        review.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'INVALID INPUTS',
        });
    }

    /**
     * Creating an entry to submit review by an another employee
     */
    dbResponse = await reviewDBHandler.Save(
        request_id, 
        review
    );
    switch(dbResponse.status) {
        case 'success':
            /** If transaction is success then 
             * we're returning any messages in this place 
             */
            break;
        case 'error':
        default:
            return res.status(500).json({ 
                success: false, 
                message: "Review is failed to submit! Sorry!" 
            });
    }
    dbResponse = await reviewRequestDBHandler.UpdateStatusAsSubmitted(
        request_id
    )
    switch(dbResponse.status) {
        case 'success':
            return res.status(200).json({ 
                success: true, 
                data: dbResponse.data, 
                message: "Review submitted successfully! Have a happy day!" 
            });
        case 'error':
        default:
            return res.status(500).json({ 
                success: false, 
                message: "Review is failed to submit! Sorry!" 
            });
    }
});

/**
 * Update performance review by an employee
 */
reviewRouter.put('/', (req, res) => {
    return res.json({ success: true, data: "TODO-API. S O R R Y! " });
});

/**
 * Assigning employee to participate in another employee's review 
 */
reviewRouter.post('/assign', async (req, res) => {
    const { assigned_to, request_sent_to } = req.body;

    if (
        !assigned_to || 
        assigned_to.length === 0 || 
        !request_sent_to || 
        request_sent_to.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: 'INVALID INPUTS',
        });
    }

    /**
     * Validate review request is already pending in the system
     */
    let dbResponse = await reviewRequestDBHandler.GetByEmployees(
        assigned_to, 
        request_sent_to
    )

    if(dbResponse) {
        if(dbResponse.status === 'error') {
            return res.status(500).json({
                success: false,
                message: "Review request is failed to send! Sorry!" 
            });
        } else if(dbResponse !== null) {
            return res.status(400).json({
                success: false,
                message: 'Employee is already assigned to the corresponding user.',
            });
        }
    }

    /**
     * Creating an entry which allows an employee 
     * to submit review for another employee
     */
    dbResponse = await reviewRequestDBHandler.Save(
        assigned_to, 
        request_sent_to
    );
    switch(dbResponse.status) {
        case 'success':
            return res.status(200).json({ 
                success: true, 
                data: dbResponse.data, 
                message: "Review request sent successfully! Have a happy day!" 
            });
        case 'error':
        default:
            return res.status(500).json({ 
                success: false, 
                message: "Review request is failed to send! Sorry!" 
            });
    }
});

reviewRouter.get('/', (req, res) => {
    return res.json({ success: true, data: "Y A Y!! W O R K I N G!!" });
});

module.exports = reviewRouter