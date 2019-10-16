const DB = require('../configs/db');
const DateUtils = require('../utils/date');

const TABLE_NAME = 'review';

const Save = (request_id, review) => {
    const response =  DB.one(
        'INSERT INTO ' + TABLE_NAME + '(' + 
            'request_id, ' + 
            'review, ' + 
            'is_active, ' + 
            'submitted_ts' + 
        ') VALUES(' + 
            '${request_id}, ' + 
            '${review}, ' + 
            '${is_active}, ' + 
            '${date}' + 
        ') ' + 
        'RETURNING id', 
        {
            request_id: request_id, 
            review: review, 
            is_active: true, 
            date: DateUtils.GetCurrentDateWithZoneInString
        }, 
        event => {
            return event.id;
        }
    ).then(reviewID => {
        return {status: 'success', data: reviewID};
    }).catch(error => {
        return {status: 'error', data: error};
    });
    return response;
}

module.exports = {
    Save: Save,
}