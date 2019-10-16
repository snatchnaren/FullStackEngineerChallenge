const GetCurrentDateWithZoneInString = () => {
    return new Date().toUTCString()
}

module.exports = {
    GetCurrentDateWithZoneInString: GetCurrentDateWithZoneInString
}