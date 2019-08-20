function assignTaskByUserDistrict(pDistrict, pWfTaskAssign) {
    /* 	Pass in district as entered in User Profile, and workflow task name
        Returns first user id if found, otherwise false
    */
	try {
		//aa.print("Inside assignTaskByGISUserDistrict()...");
		var retValue = false;
		var sysUserList;
		var sysUserResult = aa.people.getSysUserList(aa.util.newQueryFormat());
		if (sysUserResult.getSuccess()) {
			sysUserList = sysUserResult.getOutput();
		}
		else {
			logDebug("**ERROR: getUserObjsByDistrict: " + sysUserResult.getErrorMessage());
		}
		for (var iUser in sysUserList) {
			var userId = sysUserList[iUser].getUserID();
			if (userId) {
				var vUserObj = new userObj(userId);
				var vUserDistArray = vUserObj.getUserDistricts();
				if (exists(pDistrict, vUserDistArray)) {
					//aa.print("District found for user: " + userId);
					assignTask(pWfTaskAssign, userId);
					retValue = userId;
					break;
				}
			}
		}
		return retValue;
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function assignTaskByUserDistrict(): " + err.message);
		//aa.print("A JavaScript Error occurred: function assignTaskByUserDistrict(): " + err.message);
	}
}
