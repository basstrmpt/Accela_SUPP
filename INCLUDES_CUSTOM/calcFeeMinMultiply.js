function calcFeeMinMultiply(pQty, pMin, pMinAmt, pFee) {
	try {
		var calcAmt = 0;
		calcAmt = pMinAmt;
		if (pQty > pMin) {
			calcAmt = calcAmt + ((pQty - pMin) * pFee);
		}
		return calcAmt;
	}
	catch (err) {
		//aa.print("A JavaScript Error occurred:  Custom Function: calcFeeMinMultiply(): " + err.message);
		logDebug("A JavaScript Error occurred:  Custom Function: calcFeeMinMultiply(): " + err.message);
		//comment("Error:" + err);
	}
}
