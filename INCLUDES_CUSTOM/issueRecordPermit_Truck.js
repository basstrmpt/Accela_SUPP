function issueRecordPermit_Truck() {
	itemCapId = capId;
	if (arguments.length > 1)
		itemCapId = arguments[0];
	//itemCap = aa.cap.getCap(itemCapId).getOutput();
	//itemAppTypeResult = itemCap.getCapType();
	//itemAppTypeString = itemAppTypeResult.toString();
	itemAppTypeString = "PublicWorks/Truck/Permit/*";
	itemAppTypeArray = itemAppTypeString.split('/');
	// update expiration and custom field used for reports
	var expDate = calcExpirationDate_Truck();
	editAppSpecific("Expiration Date", newDate);
	//logDebug("newDate = " + newDate);
	editAppSpecific("Permit Effective Date", dateAdd(null, 0));
	// added 8/8/2017 per Erin's request
	var permitType = getAppSpecific("Permit Type");
	if (permitType == "Single Load") {
		editAppSpecific("Permit Effective Date", getAppSpecific("Trip Date"));
	}
	//TCH 19AUG2019 Added code to update record expiration date.
    /*try {
        licObject = new licenseObject(null, itemCapId);
        if (licObject != null) {
            licObject.setExpiration(expDate);
            }
        }
        
        catch (err) {
                logDebug("Exception updating expiration status and date : " + err);
            }
*/
	var updateExpirationDateResult = updateExpirationDate(newDate, itemCapId);
	logDebug("Update expiration date result =" + updateExpirationDateResult);
	//aa.print("capIDString = " + capIDString);
	//aa.print("capId.getCustomID() = " + capId.getCustomID());
	//issuePermitsJSON = getScriptText("ISSUE PERMIT INFO", null, false);
	issuePermitsJSON = {
		"PublicWorks/Truck/Permit/*": {
			"notificationTemplate": "PWK_TRK PERMIT ISSUED",
			"notificationParams": "$$altID$$;",
			"notificationReport": "Permit-Truck",
			"notificationReportParams": "p1value;$$altID$$;agencyid;COSPRINGS",
			"notifyContactTypes": "All",
			"permitReport": "",
			"permitReportParams": "p1value;$$altID$$",
			"updateDocumentCategory": "Permit",
			"updateRecordStatus": "Issued",
			"updateWorkflowTask": "Application Submittal",
			"updateWorkflowStatus": "Approved",
			"deactivateEntireWorkflow": "",
			"updateExpirationStatus": "Pending",
			"updateExpirationDate": expDate,
			"ASIFieldForCurrentDate": "Permit Effective Date",
			"ASIExpirationDateField": "",
			"ASIExpirationDateDays": ""
		}
	};
	if (issuePermitsJSON != "") {
		//		issuePermits = JSON.parse(issuePermitsJSON);
		//	issueSteps = issuePermits[itemAppTypeString];
		issueSteps = issuePermitsJSON[itemAppTypeString];
		// Update record fields used in report
		if (issueSteps.updateExpirationStatus != "" || issueSteps.updateExpirationDate != "") {
			try {
				licObject = new licenseObject(null, itemCapId);
				if (licObject != null) {
					if (issueSteps.updateExpirationStatus != "")
						licObject.setStatus(issueSteps.updateExpirationStatus);
					if (issueSteps.updateExpirationDate != "")
						licObject.setExpiration(issueSteps.updateExpirationDate);
				}
			}
			catch (err) {
				logDebug("Exception updating expiration status and date : " + err);
			}
		}
		if (issueSteps.ASIFieldForCurrentDate != "") {
			editAppSpecific(issueSteps.ASIFieldForCurrentDate, dateAdd(null, 0), itemCapId);
		}
		if (issueSteps.ASIExpirationDateField != "" && issueSteps.ASIExpirationDateDays != "") {
			try {
				if (!isNaN(issueSteps.ASIExpirationDateDays)) {
					editAppSpecific(issueSteps.ASIExpirationDateField, dateAdd(null, parseInt(issueSteps.ASIExpirationDateDays)), itemCapId);
				}
			}
			catch (err) {
				logDebug("Exception updating asi : " + err);
			}
		}
		if (issueSteps.notificationTemplate != "" && issueSteps.notifyContactTypes != "") {
			try {
				emailAddrList = new Array();
				if (issueSteps.notifyContactTypes.toUpperCase() != "ALL") {
					conTypeArray = issueSteps.notifyContactTypes.split(';');
				}
				var capContactResult = aa.people.getCapContactByCapID(itemCapId);
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
					if ((exists("Primary", issueSteps.notifyContactTypes) || exists("PRIMARY", issueSteps.notifyContactTypes)) && con.capContact.getPrimaryFlag() == "Y") {
						if (con.people.getEmail && con.people.getEmail != "")
							if (!exists(con.people.getEmail(), emailAddrList))
								emailAddrList.push(con.people.getEmail());
					}
					if (issueSteps.notifyContactTypes.toUpperCase().indexOf("ALL") > -1 || exists(con.type, conTypeArray)) {
						if (con.people.getEmail && con.people.getEmail != "")
							if (!exists(con.people.getEmail(), emailAddrList))
								emailAddrList.push(con.people.getEmail());
					}
				}
				if (emailAddrList.length > 0) {
					var eParams = aa.util.newHashtable();
					if (issueSteps.notificationParams != "") {
						repParams = issueSteps.notificationParams.split(';');
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
					}
					if (issueSteps.notificationReport == "") {
						sendNotification(sysFromEmail, emailAddrList.join(";"), "", issueSteps.notificationTemplate, eParams, null);
					}
					else {
						var parameters = aa.util.newHashtable();
						if (issueSteps.notificationReportParams != "") {
							paramStr = issueSteps.notificationReportParams.replace("$$altID$$", capId.getCustomID());
							//repParams = issueSteps.paramStr.split(';');
							repParams = paramStr.split(';');
							for (var i = 0; i < repParams.length; i = i + 2) {
								parameters.put(repParams[i], repParams[i + 1]);
							}
						}
						reportFiles = new Array();
						var report = aa.reportManager.getReportInfoModelByName(issueSteps.notificationReport);
						report = report.getOutput();
						if (report != null) {
							report.setModule(itemAppTypeArray[0]);
							report.setCapId(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3()); // was "rreport"
							report.setReportParameters(parameters);
							var permit = aa.reportManager.hasPermission(issueSteps.notificationReport, currentUserID);
							if (permit.getOutput().booleanValue()) {
								var reportResult = aa.reportManager.getReportResult(report);
								if (reportResult) {
									reportOutput = reportResult.getOutput();
									var reportFile = aa.reportManager.storeReportToDisk(reportOutput);
									reportFile = reportFile.getOutput();
									reportFiles.push(reportFile);
								}
							}
						}
						sendNotification(sysFromEmail, emailAddrList.join(";"), "", issueSteps.notificationTemplate, eParams, reportFiles);
					}
				}
			}
			catch (err) {
				logDebug("Exception generating permit report : " + err);
			}
		}
		if (issueSteps.permitReport != "") {
			try {
				var parameters = aa.util.newHashMap();
				if (issueSteps.permitReportParams != "") {
					paramStr = issueSteps.permitReportParams.replace("$$altID$$", capId.getCustomID());
					repParams = paramStr.split(';');
					for (var i = 0; i < repParams.length; i = i + 2) {
						parameters.put(repParams[i], repParams[i + 1]);
					}
				}
				reportResult = aa.reportManager.getReportInfoModelByName(issueSteps.permitReport);
				if (!reportResult.getSuccess()) {
					logDebug("**WARNING** couldn't load report " + issueSteps.permitReport + " " + reportResult.getErrorMessage());
				}
				else {
					var report = reportResult.getOutput();
					report.setModule(itemAppTypeArray[0]);
					report.setCapId(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3());
					report.getEDMSEntityIdModel().setAltId(itemCapId.getCustomID());
					report.setReportParameters(parameters);
					var permit = aa.reportManager.hasPermission(issueSteps.permitReport, currentUserID);
					if (permit.getOutput().booleanValue()) {
						var reportResult = aa.reportManager.getReportResult(report);
						if (reportResult.getSuccess())
							logDebug("Report " + issueSteps.permitReport + " has been run for " + itemCapId.getCustomID());
					}
					else {
						logDebug("No permissions for report titled " + issueSteps.permitReport);
					}
				}
			}
			catch (err) {
				logDebug("Exception generating permit report : " + err);
			}
		}
		if (issueSteps.updateDocumentCategory != "") {
			try {
				var capDocResult = aa.document.getDocumentListByEntity(itemCapId, "CAP");
				if (capDocResult.getSuccess()) {
					if (capDocResult.getOutput().size() > 0) {
						for (index = 0; index < capDocResult.getOutput().size(); index++) {
							var tmpDoc = capDocResult.getOutput().get(index);
							tmpDoc.setDocCategory(issueSteps.updateDocumentCategory);
							updateDocResult = aa.document.updateDocument(tmpDoc);
							if (updateDocResult.getSuccess()) {
								logDebug(tmpDoc.getDocName() + " category updated");
							}
							else {
								logDebug("Error updating document category " + updateDocResult.getErrorMessage());
							}
						}
					}
				}
			}
			catch (err) {
				logDebug("Exception updating document categories : " + err);
			}
		}
		if (issueSteps.updateRecordStatus != "")
			updateAppStatus(issueSteps.updateRecordStatus, itemCapId);
		if (issueSteps.updateWorkflowTask != "" && issueSteps.updateWorkflowStatus != "") {
			try {
				wTasks = issueSteps.updateWorkflowTask.split(';');
				wStatuses = issueSteps.updateWorkflowStatus.split(';');
				for (var i = 0; i < wTasks.length; i++) {
					logDebug(wTasks[i] + ":" + wStatuses[i]);
					var workflowResult = aa.workflow.getTaskItems(itemCapId, wTasks[i], "", null, null, null);
					if (workflowResult.getSuccess()) {
						var wfObj = workflowResult.getOutput();
						for (var x in wfObj) {
							var fTask = wfObj[x];
							if (fTask.getTaskDescription().toUpperCase().equals(wTasks[i].toUpperCase())) {
								var wfBiz = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
								taskAction = wfBiz.getTaskStatusFlag(itemCapId, fTask.getProcessCode(), wTasks[i], wStatuses[i]);
								if (taskAction)
									handleResult = aa.workflow.handleDisposition(itemCapId, fTask.getStepNumber(), fTask.getProcessID(), wStatuses[i], aa.date.getCurrentDate(), "", "", systemUserObj, taskAction);
								if (handleResult.getSuccess())
									logDebug(wTasks[i] + " updated to a status of " + wStatuses[i]);
								else
									logDebug("Error updating workflow task and status : " + handleResult.getErrorMessage());
							}
						}
					}
				}
			}
			catch (err) {
				logDebug("Exception updating workflow : " + err);
			}
		}
		if (issueSteps.deactivateEntireWorkflow != "") {
			try {
				var workflowResult = aa.workflow.getTasks(itemCapId);
				if (workflowResult.getSuccess()) {
					var wfObj = workflowResult.getOutput();
					for (var i in wfObj) {
						fTask = wfObj[i];
						aa.workflow.adjustTask(itemCapId, fTask.getStepNumber(), "N", fTask.getCompleteFlag(), null, null);
					}
				}
			}
			catch (err) {
				logDebug("Exception updating workflow : " + err);
			}
		}
	}
}
