function assessExcavationFees() {
	// ScriptID 19 - Auto Assess Fees for Excavation Permits
	try {
		//aa.print("Inside assessExcavationFees()");
		//var ageOfStreet = AInfo["Age of Street"];
		var roadwayClass = AInfo["Roadway Classification"];
		var jobType = AInfo["Type of Work"];
		var noOfIntersections = AInfo["No of Intersections Affected"];
		if (noOfIntersections == null || noOfIntersections == "")
			noOfIntersections = 0;
		var linearFt = AInfo["Linear Ft of Excavation"];
		var boringEx = AInfo["Boring Excavation Length"];
		var payPeriod = "FINAL";
		var thisYear = new Date();
		var ageOfStreetASI = new Date(AInfo["Age of Street"]);
		ageOfStreet = dateDiffInYears(ageOfStreetASI, thisYear);
		var isNotBehindCurb = true;
		if (AInfo["Work Location"] == "Behind Curb") {
			isNotBehindCurb = false;
		}
		var zoneOfInfluence = 6;
		var trenchLength = parseInt(AInfo["Trenching Excavation Length"]);
		var trenchWidth = parseInt(AInfo["Trenching Excavation Width"]);
		var trenchSqFt = trenchLength * trenchWidth;
		var trenchSqFtTotal = (trenchLength + zoneOfInfluence) * (trenchWidth + zoneOfInfluence);
		aa.print("Is your work Telecommunication related? = " + AInfo["Is your work Telecommunication related?"]);
		aa.print("ageOfStreet = " + ageOfStreet);
		aa.print("roadwayClass = " + roadwayClass);
		aa.print("jobType = " + jobType);
		aa.print("noOfIntersections = " + noOfIntersections);
		aa.print("linearFt = " + linearFt);
		aa.print("boringEx = " + boringEx);
		aa.print("payPeriod = " + payPeriod);
		aa.print("Work Location = " + AInfo["Work Location"]);
		aa.print("isNotBehindCurb = " + isNotBehindCurb);
		aa.print("trenchSqFt = " + trenchSqFt);
		aa.print("trenchSqFtTotal = " + trenchSqFtTotal);
		if (AInfo["Is your work Telecommunication related?"] == "Yes") {
			if (isNotBehindCurb && trenchSqFt > 0) {
				if (ageOfStreet <= 5) {
					if (roadwayClass == "Arterial") {
						updateFee("PWK_DEG_05", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
					else { // Residential
						updateFee("PWK_DEG_07", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
				}
				else { // > 5
					if (roadwayClass == "Arterial") {
						updateFee("PWK_DEG_06", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
					else { // Residential
						updateFee("PWK_DEG_08", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
				}
			}
			if (noOfIntersections == 0 && matches(jobType, "Trench", "Trench & Bore")) {
				if (linearFt == "< 100") {
					updateFee("PWK_ENG_05", "PWK_ENG", payPeriod, 1, "N");
				}
				if (linearFt == "100 - 500") {
					updateFee("PWK_ENG_06", "PWK_ENG", payPeriod, 1, "N");
				}
				if (linearFt == "> 500") {
					updateFee("PWK_ENG_07", "PWK_ENG", payPeriod, 1, "N");
				}
			}
			if (noOfIntersections > 0 && matches(jobType, "Trench", "Trench & Bore")) {
				//updateFee("PWK_ENG_08", "PWK_ENG", payPeriod, 1, "N");
			}
			if (noOfIntersections == 0 && matches(jobType, "Bore", "Trench & Bore")) {
				switch (true) {
					case (boringEx > 0 && boringEx < 200):
						updateFee("PWK_ENG_14", "PWK_ENG", payPeriod, 1, "N");
						break;
					case (boringEx >= 200 && boringEx < 550):
						updateFee("PWK_ENG_15", "PWK_ENG", payPeriod, 1, "N");
						break;
					case (boringEx >= 550):
						updateFee("PWK_ENG_16", "PWK_ENG", payPeriod, 1, "N");
						break;
					default: break;
				}
			}
			if (noOfIntersections > 0 && matches(jobType, "Bore", "Trench & Bore")) {
				//updateFee("PWK_ENG_17", "PWK_ENG", payPeriod, 1, "N");
			}
			if (jobType == "Core/Soil Sample") {
				updateFee("PWK_ENG_18", "PWK_ENG", payPeriod, 1, "N");
			}
		} // telecom = Yes
		else { // telecom = No
			if (isNotBehindCurb && trenchSqFt > 0) {
				if (ageOfStreet <= 5) {
					if (roadwayClass == "Arterial") {
						updateFee("PWK_DEG_01", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
					else { // Residential
						updateFee("PWK_DEG_03", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
				}
				else { // > 5
					if (roadwayClass == "Arterial") {
						updateFee("PWK_DEG_02", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
					else { // Residential
						updateFee("PWK_DEG_04", "PWK_DEG", payPeriod, trenchSqFtTotal, "N");
					}
				}
			}
			if (noOfIntersections == 0 && matches(jobType, "Trench", "Trench & Bore")) {
				if (linearFt == "< 100") {
					updateFee("PWK_ENG_01", "PWK_ENG", payPeriod, 1, "N");
				}
				if (linearFt == "100 - 500") {
					updateFee("PWK_ENG_02", "PWK_ENG", payPeriod, 1, "N");
				}
				if (linearFt == "> 500") {
					updateFee("PWK_ENG_03", "PWK_ENG", payPeriod, 1, "N");
				}
			}
			if (noOfIntersections > 0 && matches(jobType, "Trench", "Trench & Bore")) {
				//updateFee("PWK_ENG_04", "PWK_ENG", payPeriod, 1, "N");
			}
			if (noOfIntersections == 0 && matches(jobType, "Bore", "Trench & Bore")) {
				switch (true) {
					case (boringEx > 0 && boringEx < 200):
						updateFee("PWK_ENG_09", "PWK_ENG", payPeriod, 1, "N");
						break;
					case (boringEx >= 200 && boringEx < 550):
						updateFee("PWK_ENG_10", "PWK_ENG", payPeriod, 1, "N");
						break;
					case (boringEx >= 550):
						updateFee("PWK_ENG_11", "PWK_ENG", payPeriod, 1, "N");
						break;
					default: break;
				}
			}
			if (noOfIntersections > 0 && matches(jobType, "Bore", "Trench & Bore")) {
				//updateFee("PWK_ENG_12", "PWK_ENG", payPeriod, 1, "N");
			}
			if (jobType == "Core/Soil Sample") {
				updateFee("PWK_ENG_13", "PWK_ENG", payPeriod, 1, "N");
			}
		} // telecom = No
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function assessExcavationFees(): " + err.message);
	}
}
