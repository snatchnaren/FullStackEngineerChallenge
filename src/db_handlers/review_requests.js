const DB = require('../configs/db');
const DateUtils = require('../utils/date');

const TABLE_NAME = 'review_request';
const REVIEW_REQUEST_STATUS = {
    ASSIGNED: 'ASSIGNED',
    SUBMITTED: 'SUBMITTED',
    DELETED: 'DELETED'
}

const Save = (assigned_to, request_sent_to) => {
    const response =  DB.one(
        'INSERT INTO ' + TABLE_NAME + '(' + 
            'assigned_to, ' + 
            'request_sent_to, ' + 
            'status, ' + 
            'assigned_ts' + 
        ') VALUES(' + 
            '${assigned_to}, ' + 
            '${request_sent_to}, ' + 
            '${status}, ' + 
            '${date}' + 
        ') ' + 
        'RETURNING id', 
        {
            assigned_to: assigned_to, 
            request_sent_to: request_sent_to, 
            status: REVIEW_REQUEST_STATUS.ASSIGNED, 
            date: DateUtils.GetCurrentDateWithZoneInString
        }, 
        event => {
            return event.id;
        }
    ).then(reviewRequestID => {
        return {status: 'success', data: reviewRequestID};
    }).catch(error => {
        return {status: 'error', data: error};
    });
    return response;
}

const GetByEmployees = (assigned_to, request_sent_to) => {
    /**
     * We're using limit as 1. So we going with db.oneOrNone
     */
    const response = DB.oneOrNone(
        `
            SELECT 
            id, 
            assigned_to, 
            request_sent_to, 
            status, 
            assigned_ts 
            FROM ${TABLE_NAME} 
            WHERE assigned_to='${assigned_to}' AND
            request_sent_to='${request_sent_to}' AND
            status='${REVIEW_REQUEST_STATUS.ASSIGNED}'
        `
    ).then(reviewRequest => {
        return {status: 'success', data: reviewRequest};
    }).catch(error => {
        return {status: 'error', data: error};
    });
    return response;
}

const UpdateStatusAsSubmitted = (review_id) => {
    const response = DB.oneOrNone(
        `
            UPDATE ${TABLE_NAME} 
            SET
            status='${REVIEW_REQUEST_STATUS.SUBMITTED}' 
            WHERE
            id=${review_id}
        `
    ).then(reviewRequest => {
        return {status: 'success', data: reviewRequest};
    }).catch(error => {
        return {status: 'error', data: error};
    });
    return response;
}

module.exports = {
    Save: Save,
    GetByEmployees: GetByEmployees,
    UpdateStatusAsSubmitted: UpdateStatusAsSubmitted
}