function setExpiration(pExpStatus, pExpDate) {
	// accesses capId
	// pExpDate in new Date() format
	try {
		// Set parent expiration status to Expired
		var b1ExpResults = aa.expiration.getLicensesByCapID(capId);
		if (b1ExpResults.getSuccess()) {
			var b1Exp = b1ExpResults.getOutput();
			var b1ExpModel = b1Exp.getB1Expiration();
			if (b1ExpModel) {
				//set the status
				if (pExpStatus != "") {
					b1ExpModel.setExpStatus(pExpStatus);
				}
				//set the date
				//var expOldDate = b1ExpModel.getExpDate();
				//aa.print("Current Exp Date: " + b1ExpModel.getExpDate());
				if (pExpDate != "") {
					b1ExpModel.setExpDate(pExpDate);
				}
				//need to use editB1Expiration to make changes
				var b1EditResult = aa.expiration.editB1Expiration(b1ExpModel);
				if (b1EditResult.getSuccess) {
					//aa.print("New Expiration: " + b1ExpModel.getExpDate());
					//aa.print("Record - " + capId + " has been updated");
				}
			}
		}
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function setExpiration(): " + err.message);
	}
}
