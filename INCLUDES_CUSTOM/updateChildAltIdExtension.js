function updateChildAltIdExtension(pcapId, ccapId, suffix, childType) {
    /*---------------------------------------------------------------------------------------------------------/
    | Function Intent:
    |	This function is designed to update the AltId (b1permit.b1_alt_id) of an child record (ccapId).
    |	The new AltId will be created using the AltId of its parent record (pcapId) plus the suffix variable
    |	provided. The end of the new id will be the number of child records of that record type.
    |
    | Example:
    |	Parent AltId:	499-12-67872
    |	Child AltId:	499-12-67872-ELEC-01
    |					499-12-67872-ELEC-02
    |					499-12-67872-ELEC-03
    |
    | Returns:
    |	Outcome		Description					Return	Type
    |	Success:	New AltID of Childrecord	AltID	String
    |	Failure:	Error						null	null
    |
    | 02/24/2016 - GHess
    |	Version 1 Created for Clark Co
    | 05/02/2017: updated for generic usage
    |
    | Required parameters in order:
    |	pcapId - capId model of the parent record
    |	ccapId - capId model of the child record
    |	suffix - string that will be appended to the end of the parent AltId (ie. "-ELEC-")
    |	childType - string that will be used to search for child records by type (i.e. "Building/Permit/Amendment/*")
    |
    | Optional parameters:
    |	trimLen - number to identify the last digit of the parent cap AltID to keep
    | Example:
    |	Call: updateChildAltID(pcapId, ccapId, "-AMD", "Building/Permit/Amendment/*");
    |	Parent AltId:	PW16-00005-G02
    |	Child AltId:	PW16-00005-G02-AMD001
    |	Call: updateChildAltID(pcapId, ccapId, "-AMD", 11);
    |	Parent AltId:	PW16-00005-G02
    |	Child AltId:	PW16-00005-AMD001
    /----------------------------------------------------------------------------------------------------------*/
	try {
		var p_AltId = pcapId.getCustomID();
		//aa.print("AltID = " + p_AltId);
		if (arguments.length > 4) {
			// trim p_AltId to length specified in arguments
			var trimLen = parseInt(arguments[4], 10);
			p_AltId = p_AltId.substring(0, trimLen);
		}
		//Get the number of child records by type provided PublicWorks/Amendment/*/*
		var totChildren = getChildren(childType, pcapId);
		if (totChildren === null || totChildren.length === 0) {
			logDebug("**ERROR: getChildren function found no children");
			return null;
		}
		//Set the numeric suffix of the new AltId number to the actual number of child records that exists for the type.
		//var totalFound = totChildren.length;
		var totalFound = 0;
		for (x in totChildren) {
			//Check for any EST records, don't count
			if (totChildren[x].getCustomID().indexOf("TMP") < 0) {
				totalFound = totalFound + 1;
			}
		}
		//aa.print("totalFound = " + totalFound);
		//Increment so new id starts at next number
		totalFound = totalFound + 1;
		strAmendNumber = totalFound + "";
		//When using the clone feature multiple records can be created at the same time. When this happens the AltIds of the
		//children records are not set. To correctly set the AltIds we need to start with the last number and work backwards.
		//This ensures all the new child records receives a unique AltId.
		var i = 0;
		for (i = 0; i <= totChildren.length; i++) {
			//Add leading 0 if single digit
			if (totalFound < 10) {
				strAmendNumber = "0" + strAmendNumber;
			}
			//if (totalFound < 100) {strAmendNumber = "0" + strAmendNumber;} //comment out this line to only have 2 digits (-AMD01)
			var newAltId = p_AltId + suffix + strAmendNumber;
			//aa.print("Here: " + newAltId);
			var updateResult = aa.cap.updateCapAltID(ccapId, newAltId);
			if (updateResult.getSuccess()) {
				logDebug("Updated child record AltId to " + newAltId + ".");
				break;
			}
			else {
				if (i == totalFound) {
					logDebug("** ERROR: Failed to update the AltID for " + c_AltId + ". " + updateResult.getErrorType() + " : " + updateResult.getErrorMessage());
					return null;
				}
				//Might be duplicate because of multiple clones, try the next lower number
				totalFound = totChildren.length - (1 + i);
				//Check for negitive. 
				if (totalFound < 0) {
					logDebug("**ERROR: Number used for AltID would be less than 0. Failed to update the AltID for " + c_AltId + ". ");
					return null;
				}
				//logDebug("** Attempting the next number: " + totalFound + ".");
			}
		}
		return newAltId;
	}
	catch (err) {
		//aa.print("A JavaScript Error occurred: function updateChildAltIdExtension(): " + err.message);
		logDebug("A JavaScript Error occurred: function updateChildAltIdExtension(): " + err.message);
	}
}
