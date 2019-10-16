const DB = require('../configs/db');
const DateUtils = require('../utils/date');

/**
 * getEmployeeByEmailID will get user from DB 
 * as per emailID Param.
 * 
 * @param {string} emailID 
 */
const GetByEmailID = (emailID) => {
    /**
     * We're using limit as 1. So we going with db.one
     */
    const response = DB.oneOrNone(
        `
            SELECT 
            id, 
            name, 
            email_id, 
            is_active, 
            created_ts 
            FROM employee 
            WHERE email_id='${emailID}'
        `,
    ).then(employee => {
        return employee;
    }).catch(error => {
        return 'error'
    });
    return response;
}

const Save = (name, emailID) => {
    const response =  DB.one(
        'INSERT INTO employee(' + 
            'name, ' + 
            'email_id, ' + 
            'is_active, ' + 
            'created_ts' + 
        ') VALUES(' + 
            '${name}, ' + 
            '${email_id}, ' + 
            '${is_active}, ' + 
            '${date}' + 
        ') ' + 
        'RETURNING id', 
        {
            name: name, 
            email_id: emailID, 
            is_active: true, 
            date: DateUtils.GetCurrentDateWithZoneInString
        }, 
        event => {
            return event.id;
        }
    ).then(employee => {
        return {status: 'success', data: employee};
    }).catch(error => {
        return {status: 'error', data: error};
    });
    return response;
}

module.exports = {
    GetByEmailID: GetByEmailID,
    Save: Save
}