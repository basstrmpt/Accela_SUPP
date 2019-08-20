function issueRecordPermitAsync_Truck() {
	// issuance sends notification and runs the report using async
	// this is necessary to capture the recent custom field updates in the report
	// uses custom functions runReportAndSendAsync() and calcExpirationDate_Truck()
	try {
		//aa.print("Testing running issueRecordPermitAsync_Truck().");
		logDebug("issueRecordPermitAsync_Truck(): updating Custom Fields");
		// update expiration date and push to custom field used for reports and expiration date for Renewal Info
		var expDate = calcExpirationDate_Truck();
		editAppSpecific("Expiration Date", expDate);
		//setExpiration("Pending",expDate);  commented out 5/30/19 - not in PROD version of this script
		//logDebug("newDate = " + newDate);
		editAppSpecific("Permit Effective Date", dateAdd(null, 0));
		// added 8/8/2017 per Erin's request
		var permitType = getAppSpecific("Permit Type");
		if (permitType == "Single Load") {
			editAppSpecific("Permit Effective Date", getAppSpecific("Trip Date"));
			//editAppSpecific("Expiration Date", getAppSpecific("Trip Date")); commented out 5/30/19 - not in PROD version of this script
		}
		var pReportName = "Permit-Truck";
		var pModule = "PublicWorks";
		var pItemCap = capId;
		var pEmailFrom = sysFromEmail;
		var pEmailTemplate = "PWK_TRK PERMIT ISSUED";
		var pEmailCC = "";
		// Report Parameters
		var permitReportParams = "p1value;$$altID$$";
		var parameters = aa.util.newHashMap();
		paramStr = permitReportParams.replace("$$altID$$", capId.getCustomID());
		repParams = paramStr.split(';');
		for (var i = 0; i < repParams.length; i = i + 2) {
			parameters.put(repParams[i], repParams[i + 1]);
		}
		// run report so attaches to record
		itemCapId = capId;
		reportResult = aa.reportManager.getReportInfoModelByName(pReportName);
		if (!reportResult.getSuccess()) {
			logDebug("**WARNING** couldn't load report " + pReportName + " " + reportResult.getErrorMessage());
		}
		else {
			var report = reportResult.getOutput();
			report.setModule(pModule);
			report.setCapId(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3());
			report.getEDMSEntityIdModel().setAltId(itemCapId.getCustomID());
			report.setReportParameters(parameters);
			var permit = aa.reportManager.hasPermission(pReportName, currentUserID);
			if (permit.getOutput().booleanValue()) {
				var reportResult = aa.reportManager.getReportResult(report);
				if (reportResult.getSuccess())
					logDebug("Report " + pReportName + " has been run for " + itemCapId.getCustomID());
			}
			else {
				logDebug("No permissions for report titled " + pReportName);
			}
		}
		// send notification with report attached
		var pReportParameters = parameters;
		// Email Parameters
		var notificationParams = "$$altID$$;";
		var eParams = aa.util.newHashtable();
		repParams = notificationParams.split(';');
		for (var i = 0; i < repParams.length; i = i + 2) {
			key = repParams[i];
			value = "";
			switch ("" + key) {
				case "$$altID$$":
					value = capId.getCustomID();
					break;
				default:
					value = "Unknown Key";
					break;
			}
			eParams.put(key, value);
		}
		var pEmailParameters = eParams;
		// Contact Emails
		emailAddrList = new Array();
		var notifyContactTypes = "ALL";
		if (notifyContactTypes.toUpperCase() != "ALL") {
			conTypeArray = notifyContactTypes.split(';');
		}
		var capContactResult = aa.people.getCapContactByCapID(capId);
		capContactArray = null;
		if (capContactResult.getSuccess()) {
			var capContactArray = capContactResult.getOutput();
		}
		cons = new Array();
		if (capContactArray) {
			for (var yy in capContactArray) {
				cons.push(new contactObj(capContactArray[yy]));
			}
		}
		for (var cIndex in cons) {
			con = cons[cIndex];
			if ((exists("Primary", notifyContactTypes) || exists("PRIMARY", notifyContactTypes)) && con.capContact.getPrimaryFlag() == "Y") {
				if (con.people.getEmail && con.people.getEmail != "")
					if (!exists(con.people.getEmail(), emailAddrList))
						emailAddrList.push(con.people.getEmail());
			}
			if (notifyContactTypes.toUpperCase().indexOf("ALL") > -1 || exists(con.type, conTypeArray)) {
				if (con.people.getEmail && con.people.getEmail != "")
					if (!exists(con.people.getEmail(), emailAddrList))
						emailAddrList.push(con.people.getEmail());
			}
		}
		var pEmailTo = emailAddrList.join(";");
		runReportAndSendAsync(pReportName, pModule, pItemCap, pReportParameters, pEmailFrom, pEmailTo, pEmailTemplate, pEmailParameters, pEmailCC);
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function issueRecordPermitAsync_Truck(): " + err.message);
		//aa.print("A JavaScript Error occurred: function issueRecordPermitAsync_Truck(): " + err.message);
	}
}
