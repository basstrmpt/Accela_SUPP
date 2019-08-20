function updateTrafficControlSupervisor() {
	// accesses custom fields assigned to a contact of type Barricade Company
	// copies specific Traffic Control Supervisor fields from Contact Custom Fields to Record Custom Fields
	// uses current capId
	try {
		var c = aa.people.getCapContactByCapID(capId).getOutput();
		for (var i in c) {
			var con = c[i];
			var p = con.getPeople();
			//only contact type Barricade Company
			if (p.getContactType() == "Barricade Company") {
				p_Template = p.getTemplate();
				p_TemplateForms = p_Template.getTemplateForms();
				ptf = p_TemplateForms.toArray();
				for (iGrp in ptf) {
					// verifying custom field group, even though there is only one
					//aa.print(" Group = " + ptf[iGrp].getGroupName());
					if (ptf[iGrp].getGroupName() == "CON_BARACADE") {
						p_TemplateSubgroups = ptf[iGrp].getSubgroups();
						pts = p_TemplateSubgroups.toArray();
						for (iSbGrp in pts) {
							// verifying custom field subgroup in case more are added
							//aa.print("Subgroup = " + pts[iSbGrp].getSubgroupName());
							if (pts[iSbGrp].getSubgroupName() == "ADDITIONAL INFORMATION") {
								p_fields = pts[iSbGrp].getFields().toArray();
								for (iFld in p_fields) {
									var fieldName = p_fields[iFld].getFieldName();
									var fieldValue = p_fields[iFld].getDefaultValue();
									//aa.print("Field #" + iFld);
									//aa.print("getFieldName = " + fieldName);
									//aa.print("getDefaultValue = " + fieldValue);
									// updated record custom fields
									if (fieldName == "Traffic Control Supervisor Name")
										editAppSpecific("Traffic Control Supervisor Name", fieldValue);
									if (fieldName == "Traffic Control Supervisor Phone")
										editAppSpecific("Traffic Control Supervisor Phone", fieldValue);
								}
							}
						}
					}
				}
			}
		}
	}
	catch (err) {
		logDebug("A JavaScript Error occurred: function updateTrafficControlSupervisor: " + err.message);
		//aa.print("A JavaScript Error occurred: function updateTrafficControlSupervisor: " + err.message);
	}
}
