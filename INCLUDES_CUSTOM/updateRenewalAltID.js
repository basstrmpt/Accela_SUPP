function updateRenewalAltID(parentLicenseCAPID) {
	try {
		var strExtension = "-REN";
		var capAldId = capId.getCustomID();
		//aa.print("capAldId="+capAldId);
		var parentAltId = parentLicenseCAPID.getCustomID();
		//aa.print("parentAltId2="+parentAltId);
		var childList = aa.cap.getProjectByMasterID(parentLicenseCAPID, "Renewal", "Complete").getOutput();
		var count = 1;
		if (childList) {
			//aa.print("Child List ="+childList.length);
			count = childList.length;
		}
		if (count < 10) {
			count = "0" + count;
		}
		var newAltId = parentAltId + strExtension + count;
		//aa.print("newAltId = " + newAltId);
		var updateResult = aa.cap.updateCapAltID(capId, newAltId);
		if (updateResult.getSuccess()) {
			logDebug("Updated renewal record AltId to " + newAltId + ".");
		}
		return newAltId;
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function updateRenewalAltID(): " + err.message);
		//aa.print("A JavaScript Error occurred: function updateRenewalAltID(): " + err.message);
	}
}
