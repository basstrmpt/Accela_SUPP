/**
 *
 *
 */
function assessConcreteFees() {
	// this is old - retire - this original function is only specific to user GHess
	// ScriptID 22 - Auto-Assess Fees for Concrete Permits
	try {
		// get relevent ASI field values
		var sidewalk = AInfo["Sidewalk"];
		var curb = AInfo["Curb and Gutter"];
		var resDrive = AInfo["Residential D/W"];
		var commDrive = AInfo["Commercial D/W"];
		var pedRamp = AInfo["Pedestrian Ramp"];
		var crossPan = AInfo["Cross Pan"];
		var medConcrete = AInfo["Median Concrete Cover"];
		var square = AInfo["Square Return"];
		var jointRad = AInfo["Joint Radii w/Cross Pan (new subdivisions only)"];
		var stormDrain = AInfo["Storm Drain Inlet"];
		var dropStruct = AInfo["Drop Structure"];
		var headWing = AInfo["Headwall/Wingwall"];
		var bridgeAbutment = AInfo["Bridge Abutment"];
		var retainWall = AInfo["Retaining Wall"];
		var chaseSectGT4ft = AInfo["Chase Section gte 4 ft"];
		var boxCulvert = AInfo["Box Culvert"];
		var type1Manhole = AInfo["Type l Manhole"];
		var chaseSectLT4ft = AInfo["Chase Section lt 4 ft"];
		var typeIIManhole = AInfo["Type II Manhole"];
		var concreteSaddle = AInfo["Concrete Saddle / Piers of Pipe Support"];
		var trickleChannel = AInfo["Trickle Channel"];
		var foreBay = AInfo["Forebay"];
		var outletStructure = AInfo["Outlet Structure"];
		var feeSchedule = "PWK_CON";
		var payPeriod = "FINAL";
		var invoice = "N";
		var feeToCharge = 0;
		var feeSequence = "";
		var feeQty = 1;
		if ((!matches(sidewalk, " ", null) && (sidewalk != 0))) {
			feeToCharge = 0;
			feeToCharge = 23.42;
			if (sidewalk <= 100 && sidewalk > 0) {
				feeSequence = updateFee("PWK_CON_01", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (sidewalk > 100) {
				var additional = sidewalk - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_01", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			//FeeSetQtyAmount(capId, feeSequence, 1, feeToCharge);
		}
		if ((!matches(curb, " ", null) && (curb != 0))) {
			feeToCharge = 23.42;
			if (curb <= 100 && curb > 0) {
				feeSequence = updateFee("PWK_CON_02", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (curb > 100) {
				var additional = curb - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_02", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			//FeeSetQtyAmount(capId, feeSequence, 1, feeToCharge);
		}
		if ((!matches(resDrive, " ", null) && (resDrive != 0))) {
			updateFee("PWK_CON_03", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(commDrive, " ", null) && (commDrive != 0))) {
			updateFee("PWK_CON_04", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(pedRamp, " ", null) && (pedRamp != 0))) {
			updateFee("PWK_CON_05", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(crossPan, " ", null) && (crossPan != 0))) {
			updateFee("PWK_CON_06", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(medConcrete, " ", null) && (medConcrete != 0))) {
			feeToCharge = 23.42;
			if (medConcrete <= 100 && medConcrete > 0) {
				feeSequence = updateFee("PWK_CON_20", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (medConcrete > 100) {
				var additional = medConcrete - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_20", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			//FeeSetQtyAmount(capId, feeSequence, 1, feeToCharge);
		}
		if ((!matches(square, " ", null) && (square != 0))) {
			updateFee("PWK_CON_07", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(jointRad, " ", null) && (jointRad != 0))) {
			updateFee("PWK_CON_08", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(stormDrain, " ", null) && (stormDrain != 0))) {
			updateFee("PWK_CON_09", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(dropStruct, " ", null) && (dropStruct != 0))) {
			updateFee("PWK_CON_10", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(headWing, " ", null) && (headWing != 0))) {
			updateFee("PWK_CON_11", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(bridgeAbutment, " ", null) && (bridgeAbutment != 0))) {
			updateFee("PWK_CON_12", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(retainWall, " ", null) && (retainWall != 0))) {
			updateFee("PWK_CON_13", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(chaseSectGT4ft, " ", null) && (chaseSectGT4ft != 0))) {
			updateFee("PWK_CON_14", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(boxCulvert, " ", null) && (boxCulvert != 0))) {
			updateFee("PWK_CON_15", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(type1Manhole, " ", null) && (type1Manhole != 0))) {
			updateFee("PWK_CON_16", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(chaseSectLT4ft, " ", null) && (chaseSectLT4ft != 0))) {
			updateFee("PWK_CON_21", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(typeIIManhole, " ", null) && (typeIIManhole != 0))) {
			updateFee("PWK_CON_22", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(concreteSaddle, " ", null) && (concreteSaddle != 0))) {
			updateFee("PWK_CON_23", feeSchedule, payPeriod, feeQty, invoice);
		}
		if ((!matches(trickleChannel, " ", null) && (trickleChannel != 0))) {
			feeToCharge = 23.42;
			if (trickleChannel <= 100 && trickleChannel > 0) {
				feeSequence = updateFee("PWK_CON_24", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (trickleChannel > 100) {
				var additional = trickleChannel - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_24", feeSchedule, payPeriod, feeToCharge, invoice);
			}
		}
		if ((!matches(foreBay, " ", null) && (foreBay != 0))) {
			updateFee("PWK_CON_25", feeSchedule, payPeriod, feeQty, invoice);
			FeeSetQtyAmount("PWK_CON_25", payPeriod, foreBay, "");
		}
		if ((!matches(outletStructure, " ", null) && (outletStructure != 0))) {
			updateFee("PWK_CON_26", feeSchedule, payPeriod, feeQty, invoice);
			FeeSetQtyAmount("PWK_CON_26", payPeriod, outletStructure, "");
		}
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function assessConcreteFees2(): " + err.message);
	}
}
