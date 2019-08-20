function releaseDocumentsACA() {
	//For Police: this sets the ACA view settings for attached documents
	try {
		var docs = aa.document.getCapDocumentList(capId, "ADMIN").getOutput();
		for (x in docs) {
			if (docs[x].getDocCategory() == "Released Document") {
				docs[x].setViewRole("0111000000");
				docs[x].setViewTitleRole("0111000000");
				aa.document.updateDocument(docs[x]);
			}
		}
	}
	catch (err) {
		//aa.print("A JavaScript Error occurred:  Custom Function: releaseDocuments(): " + err.message);
		logDebug("A JavaScript Error occurred:  Custom Function: releaseDocuments(): " + err.message);
	}
}
