/**
 * Updates the expiration date on a Cap Id object.
 *
 * @param {string} date
 * @param {object} capIdObj
 * @returns {boolean}
 */
function updateExpirationDate(date, capIdObj) {
	var functTitle = "updateExpirationDate(): ";
	var retVal = true;
	var licObj = {};
	try {
		licObj = new licenseObject(null, capIdObj);
	}
	catch (err) {
		logDebug(functTitle + "Error creating license object. Message: " + err.Message);
		return false;
	}
	if (licObj != null &&
		typeof date !== "undefined"
		&& date != null
		&& date != "") {
		try {
			licObj.setExpiration(date);
		}
		catch (err) {
			logDebug(functTitle + "Unable to set expiration date. Message " + err.Message);
			return false;
		}
	}
	else {
		logDebug(functTitle + "Date parameter is incorrect.");
		return false;
	}
	return retVal;
}
