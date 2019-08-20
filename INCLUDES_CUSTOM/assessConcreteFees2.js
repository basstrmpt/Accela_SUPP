/**
 *
 *
 */
function assessConcreteFees2() {
	// ScriptID 22 - Auto-Assess Fees for Concrete Permits
	try {
		//aa.print("Inside assessConcreteFees.");
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
			feeToCharge = 23.42;
			if (sidewalk > 0 && sidewalk <= 100) {
				feeSequence = updateFee("PWK_CON_01", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (sidewalk > 100) {
				var additional = sidewalk - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_01", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			//aa.print("PWK_CON_01 feeSequence = " + feeSequence);
			FeeSetQtyAmount("PWK_CON_01", payPeriod, sidewalk, feeToCharge);
		}
		if ((!matches(curb, " ", null) && (curb != 0))) {
			feeToCharge = 23.42;
			if (curb > 0 && curb <= 100) {
				feeSequence = updateFee("PWK_CON_02", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (curb > 100) {
				var additional = curb - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_02", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			//aa.print("PWK_CON_02 feeSequence = " + feeSequence);
			FeeSetQtyAmount("PWK_CON_02", payPeriod, curb, feeToCharge);
		}
		if ((!matches(resDrive, " ", null) && (resDrive != 0))) {
			updateFee("PWK_CON_03", feeSchedule, payPeriod, resDrive, invoice);
			FeeSetQtyAmount("PWK_CON_03", payPeriod, resDrive, "");
		}
		if ((!matches(commDrive, " ", null) && (commDrive != 0))) {
			updateFee("PWK_CON_04", feeSchedule, payPeriod, commDrive, invoice);
			FeeSetQtyAmount("PWK_CON_04", payPeriod, commDrive, "");
		}
		if ((!matches(pedRamp, " ", null) && (pedRamp != 0))) {
			updateFee("PWK_CON_05", feeSchedule, payPeriod, pedRamp, invoice);
			FeeSetQtyAmount("PWK_CON_05", payPeriod, pedRamp, "");
		}
		if ((!matches(crossPan, " ", null) && (crossPan != 0))) {
			updateFee("PWK_CON_06", feeSchedule, payPeriod, crossPan, invoice);
			FeeSetQtyAmount("PWK_CON_06", payPeriod, crossPan, "");
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
			//aa.print("PWK_CON_20 feeSequence = " + feeSequence);
			FeeSetQtyAmount("PWK_CON_20", payPeriod, medConcrete, feeToCharge);
		}
		if ((!matches(square, " ", null) && (square != 0))) {
			updateFee("PWK_CON_07", feeSchedule, payPeriod, square, invoice);
			FeeSetQtyAmount("PWK_CON_07", payPeriod, square, "");
		}
		if ((!matches(jointRad, " ", null) && (jointRad != 0))) {
			updateFee("PWK_CON_08", feeSchedule, payPeriod, jointRad, invoice);
			FeeSetQtyAmount("PWK_CON_08", payPeriod, jointRad, "");
		}
		if ((!matches(stormDrain, " ", null) && (stormDrain != 0))) {
			updateFee("PWK_CON_09", feeSchedule, payPeriod, stormDrain, invoice);
			FeeSetQtyAmount("PWK_CON_09", payPeriod, stormDrain, "");
		}
		if ((!matches(dropStruct, " ", null) && (dropStruct != 0))) {
			updateFee("PWK_CON_10", feeSchedule, payPeriod, dropStruct, invoice);
			FeeSetQtyAmount("PWK_CON_10", payPeriod, dropStruct, "");
		}
		if ((!matches(headWing, " ", null) && (headWing != 0))) {
			updateFee("PWK_CON_11", feeSchedule, payPeriod, headWing, invoice);
			FeeSetQtyAmount("PWK_CON_11", payPeriod, headWing, "");
		}
		if ((!matches(bridgeAbutment, " ", null) && (bridgeAbutment != 0))) {
			updateFee("PWK_CON_12", feeSchedule, payPeriod, bridgeAbutment, invoice);
			FeeSetQtyAmount("PWK_CON_12", payPeriod, bridgeAbutment, "");
		}
		if ((!matches(retainWall, " ", null) && (retainWall != 0))) {
			updateFee("PWK_CON_13", feeSchedule, payPeriod, retainWall, invoice);
			FeeSetQtyAmount("PWK_CON_13", payPeriod, retainWall, "");
		}
		if ((!matches(chaseSectGT4ft, " ", null) && (chaseSectGT4ft != 0))) {
			updateFee("PWK_CON_14", feeSchedule, payPeriod, chaseSectGT4ft, invoice);
			FeeSetQtyAmount("PWK_CON_14", payPeriod, chaseSectGT4ft, "");
		}
		if ((!matches(boxCulvert, " ", null) && (boxCulvert != 0))) {
			updateFee("PWK_CON_15", feeSchedule, payPeriod, boxCulvert, invoice);
			FeeSetQtyAmount("PWK_CON_15", payPeriod, boxCulvert, "");
		}
		if ((!matches(type1Manhole, " ", null) && (type1Manhole != 0))) {
			updateFee("PWK_CON_16", feeSchedule, payPeriod, type1Manhole, invoice);
			FeeSetQtyAmount("PWK_CON_16", payPeriod, type1Manhole, "");
		}
		if ((!matches(chaseSectLT4ft, " ", null) && (chaseSectLT4ft != 0))) {
			updateFee("PWK_CON_21", feeSchedule, payPeriod, chaseSectLT4ft, invoice);
			FeeSetQtyAmount("PWK_CON_21", payPeriod, chaseSectLT4ft, "");
		}
		if ((!matches(typeIIManhole, " ", null) && (typeIIManhole != 0))) {
			updateFee("PWK_CON_22", feeSchedule, payPeriod, typeIIManhole, invoice);
			FeeSetQtyAmount("PWK_CON_22", payPeriod, typeIIManhole, "");
		}
		if ((!matches(concreteSaddle, " ", null) && (concreteSaddle != 0))) {
			updateFee("PWK_CON_23", feeSchedule, payPeriod, concreteSaddle, invoice);
			FeeSetQtyAmount("PWK_CON_23", payPeriod, concreteSaddle, "");
		}
		if ((!matches(trickleChannel, " ", null) && (trickleChannel != 0))) {
			feeToCharge = 23.42;
			if (trickleChannel > 0 && trickleChannel <= 100) {
				feeSequence = updateFee("PWK_CON_24", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			else if (trickleChannel > 100) {
				var additional = trickleChannel - 100;
				feeToCharge = feeToCharge + (additional * .40);
				feeSequence = updateFee("PWK_CON_24", feeSchedule, payPeriod, feeToCharge, invoice);
			}
			//aa.print("PWK_CON_24 feeSequence = " + feeSequence);
			FeeSetQtyAmount("PWK_CON_24", payPeriod, trickleChannel, feeToCharge);
		}
		if ((!matches(foreBay, " ", null) && (foreBay != 0))) {
			updateFee("PWK_CON_25", feeSchedule, payPeriod, foreBay, invoice);
			FeeSetQtyAmount("PWK_CON_25", payPeriod, foreBay, "");
		}
		if ((!matches(outletStructure, " ", null) && (outletStructure != 0))) {
			updateFee("PWK_CON_26", feeSchedule, payPeriod, outletStructure, invoice);
			FeeSetQtyAmount("PWK_CON_26", payPeriod, outletStructure, "");
		}
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function assessConcreteFees(): " + err.message);
	}
}
