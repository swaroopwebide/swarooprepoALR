sap.ui.controller("northwind.Master", {

	onInit: function() {
		//creates the JSON data model containing the employees data stored in 'localServices/LeaveRequest.json'
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("localService/LeaveRequest.json", null, false);
		this.getView().byId("Master--idList").setModel(oModel, "myModel");
		this.count = this.getView().byId("Master--idList").getModel("myModel").getProperty("/requests").length;
		this.getView().byId("masterPage").setTitle("Leave Requests (" + this.count + ")");
		
		// set device model
			var oDeviceModel = new sap.ui.model.json.JSONModel("sap.ui.Device");
			oDeviceModel.setDefaultBindingMode("OneWay");
			sap.ui.getCore().setModel(oDeviceModel, "device");

	},
	onUpdate: function() {

		//this method is for setting initial list item as selected and its corresponding data in the detail page.
		var firstItem = this.getView().byId("Master--idList").getItems()[0];
		// perform further neede code here..like modfieng detail page based upon first item
		this.getView().byId("Master--idList").setSelectedItem(firstItem, true);
		this.firstItemBinding = firstItem.getBindingContext("myModel");
		window.globalVariable = this.firstItemBinding;
		this.setDetailData(window.globalVariable);
	},

	onNavPress: function(evt) {
		
		sap.m.MessageToast.show("You cannot go back");
		sap.ui.getCore().byId("splitApp").toMaster("Master");
	},

	onSelect: function(oEvt) {
		
		//this method is called whenever a list item is selected explicitly by user.
		var item = oEvt.getParameter("listItem");
		var binding = item.getBindingContext("myModel");
		window.globalVariable = binding;
		this.setDetailData(window.globalVariable);
	},
	setDetailData: function(binding) {

		//this method sets Detail Page corresponding data of the  list item is selected in the master page.
		var empid = binding.getProperty("id");
		var empname = binding.getProperty("name");
		var leaveapplied = binding.getProperty("leaveApplied");
		var leavebalance = binding.getProperty("leaveBalance");
		var appliedon = binding.getProperty("appliedOn");
		var fromdate = binding.getProperty("fromDate");
		var todate = binding.getProperty("toDate");
		var leavereason = binding.getProperty("leaveReason");
		var leavetype = binding.getProperty("leaveType");
		var itemArray = this.getView().byId("Master--idList").getModel("myModel").getProperty("/requests");
		var myModel1 = new sap.ui.model.json.JSONModel();

		for (var i = 0; i < itemArray.length; i++) {

			if (itemArray[i].id === empid) {

				var request = {
					"id": empid,
					"name": empname,
					"leaveApplied": leaveapplied,
					"leaveBalance": leavebalance,
					"appliedOn": appliedon,
					"fromDate": fromdate,
					"toDate": todate,
					"leaveReason": leavereason,
					"leaveType": leavetype
				};

				myModel1.setData(request);
				sap.ui.getCore().setModel(myModel1, "empobj");
			}
		}
		this.nav.to("Detail", myModel1);
	},

	onSearch: function(oEvent) {

		// build filter array
		var sQuery = oEvent.getParameter("query");
		var oList = this.getView().byId("Master--idList");
		var binding = oList.getBinding("items");

		if (sQuery) {

			var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
			var oFilter1 = new sap.ui.model.Filter("id", sap.ui.model.FilterOperator.EQ, sQuery);
			var comFil = new sap.ui.model.Filter([oFilter, oFilter1]);

			binding.filter(comFil, sap.ui.model.FilterType.Application);
		} 
		else {
			binding.filter([]);
		}
	},
	
	onSortPress: function() {

		//It has three buttons to select sorting type and then after selecting a button navigates to another dialog box,
		//there it calls sortList.
		//method to sort list based on the selected radio button in the second dialog box.
		
		if (!this._Dialog) {
			this._Dialog = sap.ui.xmlfragment(
				"northwind.myFrag",
				this
			);
			this.getView().addDependent(this._Dialog);
		}

		sap.ui.getCore().byId("myDialog").open();
	},

	onCloseDialog: function() {

		sap.ui.getCore().byId("myDialog").close();
	},

	openSortDialog: function(oEvent) {
		
		//opens second dialog box to select a radio button 
		
		this.oList = this.getView().byId("Master--idList");
		this.binding = this.oList.getBinding("items");
		this.aSorter = [];
		this.aSorter2 = [];
		this.sortByWhich = oEvent.getSource().getId();
		
		if(this.sortByWhich!=="_noSortingId") {
			if (!this._SecondDialog) {
				this._SecondDialog = sap.ui.xmlfragment(
					"northwind.SortType",
					this
				);
				this.getView().addDependent(this._SecondDialog);
			}
	
			sap.ui.getCore().byId("sortType").open();
		}
		else {
			this.binding.sort(null);
			this.onCloseDialog();
		}
	},
	
	onRadioSelect: function(oEvent) {

		//calls this method by second dialog whenever user selects a radio button
		var radioButtonId = oEvent.getSource().getId();

		if (radioButtonId === "ASC") {

			this.setSortType(false,radioButtonId);
			
		} else {
			
			this.setSortType(true,radioButtonId);
		}

	},

	sorting: function() {

		//this method is called in the setSortType method to do actual sorting based on the boolean value of 'this.descending' variable.
		if (this.sortByWhich === "_nameSortingId") {
 
			var SORTKEY = "name",
				DESCENDING = this.descending,
				GROUP = false;

			this.aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUP));

			this.binding.sort(this.aSorter);
			
			this.onCloseDialog();
		}
		else {
			var SORTKEY2 = "id",
				DESCENDING2 = this.descending,
				GROUP2 = false;

			this.aSorter2.push(new sap.ui.model.Sorter(SORTKEY2, DESCENDING2, GROUP2));

			this.binding.sort(this.aSorter2);
			this.onCloseDialog();

		} 
	},
	
	setSortType : function(bsortType,radioButtonId) {
			
			//this method takes sort type 'descending : true/false' and radioButtonId 
			this.descending = bsortType;
			sap.ui.getCore().byId(radioButtonId).setSelected(false);
			sap.ui.getCore().byId("sortType").close();
			this.sorting();
	},
	
	onSettingsPress : function() {
		
			sap.m.MessageToast.show("This Button has no action currently", {
			animationDuration: 10000
		});
	}
});