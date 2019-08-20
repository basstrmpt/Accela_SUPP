function updateParcelSubdivisionFromGIS() {
	// uses capId
	// gets the subdivision from GIS and populates the parcel field
	// assumes one parcel, but processes all
	try {
		//aa.print("Inside updateParcelSubdivisionFromGIS()...");
		//aa.print("sysGISServiceID = " + sysGISServiceID);
		var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
		if (capParcelResult.getSuccess()) {
			// get subdivision from GIS
			var gisSubdivisionValue = getGISInfo2(sysGISServiceID, "subdivisions", "NAME", 0, "feet");
			//var gisStreetAgeValue = getGISInfo(sysGISServiceID, "subdivisions", "NAME");
			//aa.print("gisSubdivisionValue = " + gisSubdivisionValue);
			var Parcels = capParcelResult.getOutput().toArray();
			var parcelObj = capParcelResult.getOutput();
			for (zz in Parcels) {
				//aa.print("Looking at parcel: " + Parcels[zz].getParcelNumber());
				//aa.print("Looking at subdivision: " + Parcels[zz].getSubdivision());
				Parcels[zz].setSubdivision(gisSubdivisionValue);
				var prcl = Parcels[zz];
				var capPrclObj = aa.parcel.warpCapIdParcelModel2CapParcelModel(capId, prcl);
				if (capPrclObj.getSuccess()) {
					var capPrcl = capPrclObj.getOutput();
					result = aa.parcel.updateDailyParcelWithAPOAttribute(capPrcl);
					//aa.print("Updated parcel Result:" + result.getSuccess());
				}
			}
		}
	}
	catch (err) {
		logDebug("A JavaScript Error occurred:  Custom Function: updateParcelSubdivisionFromGIS: " + err.message);
	}
}
