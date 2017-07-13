sap.ui.jsview("northwind.App", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf northwind.App
	 */
	getControllerName: function() {
		return "northwind.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf northwind.App
	 */
	createContent: function(oController) {

		this.setDisplayBlock(true);
		
	//	var header = sap.ui.xmlview("Header", "northwind.Header");
		
		this.app = new sap.m.SplitApp("splitApp");

		var master = sap.ui.xmlview({
			id:"Master",
			viewName:"northwind.Master"
		});

		master.getController().nav = this.getController();
		this.app.addMasterPage(master, true);

		// load the empty page
		var detail = sap.ui.xmlview("Detail", "northwind.Detail");
		this.app.addDetailPage(detail, false);
		
	//	header.addContent(this.app);
		return this.app;

	}

});