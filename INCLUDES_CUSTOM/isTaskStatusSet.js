function isTaskStatusSet(pTask, pStatus) {
	//  looks through a task's workflow history to see if status was ever assigned
	try {
		//aa.print("Inside isTaskStatusSet ...");
		var returnStr = false;
		var wrkFlow = aa.workflow.getWorkflowHistory(capId, pTask, null).getOutput();
		for (i in wrkFlow) {
			if (wrkFlow[i].getDisposition() == pStatus) {
				//aa.print("wrkFlow[i].getDisposition() = " + wrkFlow[i].getDisposition());
				returnStr = true;
			}
		}
		return returnStr;
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function isTaskStatusSet(): " + err.message);
	}
}
