/**
 * Takes expiration status and cap Id object and sets the expiration status.
 *
 * @param {string} status
 * @param {object} capIdObj
 * @returns {boolean}
 */
function updateExpirationStatus(status, capIdObj) {
	var functTitle = "updateExpirationStatus(): ";
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
		typeof status !== "undefined"
		&& status != null
		&& status != "") {
		licObj.setStatus(status);
	}
	else {
		logDebug(functTitle + "Status parameter is incorrect.");
		return false;
	}
	return retVal;
}
