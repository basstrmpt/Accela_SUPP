function sendNotificationInternal(pEmail, pNotificationTemplate) {
	try {
		//sysFromEmail defined in INCLUDES_CUSTOM
		var altIdString = "";
		if (arguments.length == 3)
			altIdString = arguments[2]; // use record number specified in args
		var altId = capId.getCustomID();
		if (altIdString != "") {
			altId = altIdString;
		}
		var cap = aa.cap.getCap(capId).getOutput();
		var appTypeResult = cap.getCapType();
		//capStatus = cap.getCapStatus();
		capAlias = appTypeResult.getAlias();
		var acaSite = lookup("ACA_CONFIGS", "ACA_SITE");
		acaSite = acaSite.substr(0, acaSite.toUpperCase().indexOf("/ADMIN"));
		var params = aa.util.newHashtable();
		addParameter(params, "$$ALTID$$", altId);
		addParameter(params, "$$RECORDTYPE$$", capAlias);
		addParameter(params, "$$ACAURL$$", acaSite);
		//sendNotification(emailFrom,emailTo,emailCC,templateName,params,reportFile)
		sendNotification(sysFromEmail, pEmail, "", pNotificationTemplate, params, new Array());
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function sendNotificationInternal(): " + err.message);
	}
}
