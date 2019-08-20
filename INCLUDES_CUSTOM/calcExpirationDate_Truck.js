function calcExpirationDate_Truck() {
	//determines expiration date for truck permits
	//uses current capId
	//returns expiration date in format mm/dd/yyyy
	//see Testing below for force entry of the current date
	try {
		var permitType = getAppSpecific("Permit Type");
		var applicationType = getAppSpecific("Application Type");
		var isRenewal = false;
		var singleLoadExpDate = getAppSpecific("Trip Date");
		if (matches(applicationType, "Renewal with Changes", "Renewal without Changes")) {
			isRenewal = true;
		}
		var thisDate = new Date();
		//Testing
		//thisDate = new Date("11/5/2017");
		thisMonth = thisDate.getMonth() + 1;
		thisYear = thisDate.getFullYear() + 0;
		newDate = thisDate;
		endOfYearDate = new Date("12/31/2017");
		//aa.print("permitType = " + permitType);
		//aa.print("thisMonth = " + thisMonth);
		//aa.print("thisYear = " + thisYear);
		//aa.print("endOfYearDate = " + endOfYearDate);
		if (permitType == "Annual Load") {
			//one year from today
			newDate.setFullYear(thisYear + 1);
		}
		if (permitType == "Single Load") {
			//expiration is current date, expiration status is Inactive, maybe make it for 30 years since defaults to Pending
			//newDate.setFullYear(thisYear + 30);
			newDate = new Date(singleLoadExpDate);
			newDate.setDate(newDate.getDate() + 1);
		}
		if (permitType == "Long Vehicle Combination") {
			//if month Jan-Nov (1-11) or renewal, expiration is 12/31 same year
			if (thisMonth >= 1 && thisMonth <= 11) {
				endOfYearDate.setFullYear(thisYear);
				newDate = endOfYearDate;
			}
			else
				// if month Dec (12), expiration is 12/31 next year
				endOfYearDate.setFullYear(thisYear + 1);
			newDate = endOfYearDate;
		}
		newDate = (newDate.getMonth() + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear();
		//aa.print("newDate = " + newDate);
		// update custom field used for reports
		editAppSpecific("Expiration Date", newDate);
		thisLic = new licenseObject(capIDString, capId);
		thisLic.setExpiration(dateAdd(newDate, 0));
		return newDate;
	}
	catch (err) {
		//aa.print("A JavaScript Error occurred:  Custom Function: calcExpirationDate_Truck(): " + err.message);
		logDebug("A JavaScript Error occurred:  Custom Function: calcExpirationDate_Truck(): " + err.message);
	}
}
