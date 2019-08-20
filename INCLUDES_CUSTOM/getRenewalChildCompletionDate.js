function getRenewalChildCompletionDate(parentLicenseCAPID) {
	// pass in capId model
	// return custom field date or false if not found.
	try {
		var newCompletionDate = false;
		var parentAltId = parentLicenseCAPID.getCustomID();
		//aa.print("parentAltId="+parentAltId);
		var childList = aa.cap.getProjectByMasterID(parentLicenseCAPID, "Renewal", "Complete").getOutput();
		//var year = new Date().getFullYear().toString();
		//var count = 1;
		var lastChild = "";
		if (childList) {
			//aa.print("Child List ="+childList.length);
			for (x in childList) {
				renewcap = childList[x].getCapID();
				var cap = aa.cap.getCapID(renewcap.getID1(), renewcap.getID2(), renewcap.getID3()).getOutput();
				//var tmpString1 = cap.getCustomID().substring(0,8);
				var tmpString1 = cap.getCustomID();
				//aa.print("tmpString1 = " + tmpString1);
				lastChild = cap;
			}
		}
		if (lastChild != "") {
			newCompletionDate = getAppSpecific("New Completion Date", lastChild);
			//aa.print("newCompletionDate = " + newCompletionDate);	 
		}
		return newCompletionDate;
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function getRenewalChildCompletionDate(): " + err.message);
		//aa.print("A JavaScript Error occurred: function getRenewalChildCompletionDate(): " + err.message);
	}
}
