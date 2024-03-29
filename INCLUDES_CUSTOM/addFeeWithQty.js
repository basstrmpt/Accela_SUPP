/**
 * // based off the master script addFee(), this creates the fee using the quantity and calc variable
 *
 * @param {*} fcode
 * @param {*} fsched
 * @param {*} fperiod
 * @param {*} fqty
 * @param {*} famt
 * @param {*} finvoice
 * @returns
 */
function addFeeWithQty(fcode, fsched, fperiod, fqty, famt, finvoice) {
	// based off the master script addFee(), this creates the fee using the quantity and calc variable
	// ghess: 01/27/14
	// Updated Script will return feeSeq number or null if error encountered (SR5112) 
	var feeCap = capId;
	var feeCapMessage = "";
	var feeSeq_L = new Array(); // invoicing fee for CAP in args
	var paymentPeriod_L = new Array(); // invoicing pay periods for CAP in args
	var feeSeq = null;
	if (arguments.length > 6) {
		feeCap = arguments[6]; // use cap ID specified in args
		feeCapMessage = " to specified CAP";
	}
	assessFeeResult = aa.finance.createFeeItem(feeCap, fsched, fcode, fperiod, fqty);
	if (assessFeeResult.getSuccess()) {
		feeSeq = assessFeeResult.getOutput();
		// update fee with quantity and calc variable
		//aa.print("Updating  fee: " + fcode + ", Quantity = " + fqty + ", Calc Variable = " + famt);
		fsm = aa.finance.getFeeItemByPK(feeCap, feeSeq).getOutput().getF4FeeItem();
		//fsm.setFeeNotes(sca[0]);
		//fsm.setFeeDescription(sca[1]);
		//fsm.setFee(feeAmount); //can't set fee amount for NEW fee.
		fsm.setFeeUnit(fqty); //Quantity
		fsm.setFormula(famt); //Calc Variable
		aa.finance.editFeeItem(fsm);
		logMessage("Successfully added Fee " + fcode + ", Qty " + fqty + feeCapMessage);
		//aa.print("Successfully added Fee " + fcode + ", Qty " + fqty + feeCapMessage);
		logDebug("The assessed fee Sequence Number " + feeSeq + feeCapMessage);
		//aa.print("The assessed fee Sequence Number " + feeSeq + feeCapMessage);
		if (finvoice == "Y" && arguments.length == 5) // use current CAP
		{
			feeSeqList.push(feeSeq);
			paymentPeriodList.push(fperiod);
		}
		if (finvoice == "Y" && arguments.length > 5) // use CAP in args
		{
			feeSeq_L.push(feeSeq);
			paymentPeriod_L.push(fperiod);
			var invoiceResult_L = aa.finance.createInvoice(feeCap, feeSeq_L, paymentPeriod_L);
			if (invoiceResult_L.getSuccess())
				logDebug("Invoicing assessed fee items" + feeCapMessage + " is successful.");
			else
				logDebug("**ERROR: Invoicing the fee items assessed" + feeCapMessage + " was not successful.  Reason: " + invoiceResult.getErrorMessage());
		}
		updateFeeItemInvoiceFlag(feeSeq, finvoice);
	}
	else {
		logDebug("**ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		//aa.print( "**ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage());
		feeSeq = null;
	}
	return feeSeq;
}
