function FeeSetQtyAmount(fcode, fperiod, pQty, pAmount) {
	// Sets the fee amount and the quantity of a fee
	// uses the current fee amount if pAmount is ""
	try {
		var feeSeq = null;
		var feeAmount = pAmount;
		getFeeResult = aa.finance.getFeeItemByFeeCode(capId, fcode, fperiod);
		if (getFeeResult.getSuccess()) {
			var feeList = getFeeResult.getOutput();
			for (feeNum in feeList)
				if (feeList[feeNum].getFeeitemStatus().equals("NEW")) // found this fee item
				{
					feeSeq = feeList[feeNum].getFeeSeqNbr();
					fsm = feeList[feeNum].getF4FeeItem();
					if (feeAmount == "") {
						feeAmount = fsm.getFee();
					}
					//aa.print("Qty = " + pQty + ", Amount = " + feeAmount);
					fsm.setFeeUnit(pQty); //Quantity
					fsm.setFormula(feeAmount / pQty); //Calc Variable
					aa.finance.editFeeItem(fsm);
				}
		}
		else {
			logDebug("**ERROR: getting fee items (" + fcode + "): " + getFeeResult.getErrorMessage());
		}
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function FeeSetQtyAmount(): " + err.message);
	}
}
