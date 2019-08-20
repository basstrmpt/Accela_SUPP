function taskCloseActive(pStatus, pComment) {
	// Closes all tasks in CAP with specified status and comment
	// Optional task names to exclude
	// 06SSP-00152
	//
	var taskArray = new Array();
	var workflowResult = aa.workflow.getTasks(capId);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
		return false;
	}
	var fTask;
	var stepnumber;
	var processID;
	var dispositionDate = aa.date.getCurrentDate();
	var wfnote = " ";
	var wftask;
	for (ii = wfObj.length - 1; ii >= 0; ii--) {
		fTask = wfObj[ii];
		//comment("i: " + ii);
		wftask = fTask.getTaskDescription();
		stepnumber = fTask.getStepNumber();
		processID = fTask.getProcessID();
		//comment("task: " + wftask + ": " + isTaskActive(wftask));
		if (isTaskActive(wftask)) {
			aa.workflow.handleDisposition(capId, stepnumber, processID, pStatus, dispositionDate, wfnote, pComment, systemUserObj, "U");
			setTask(wftask, "N", "Y");
			logDebug("Closing Workflow Task " + wftask + " with status " + pStatus);
			//comment("i: " + ii);
		}
	}
}
