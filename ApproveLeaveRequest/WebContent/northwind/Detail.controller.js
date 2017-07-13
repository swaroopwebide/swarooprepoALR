sap.ui.controller("northwind.Detail", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf northwind.Detail
	 */
	onInit: function() {
		//console.log(sap.ui.getCore().getUIComponent());
		/*var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("localService/LeaveRequest.json", null, false);
		this.getView().setModel(oModel,"empobj");*/
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf northwind.Detail
	 */
	//  onBeforeRendering: function() {
	//
	//  },

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf northwind.Detail
	 */
	onAfterRendering: function(evt) {

		/* var oModel1 = new sap.ui.model.json.JSONModel();
		  $.ajax({
		    url: "http://192.168.2.6:8000/sap/opu/odata/SAP/YPROGRAM_APPROVE_REPORT_SRV/Program_DetailsSet?$format=json",
		    dataType:"json",
		    beforeSend: function (xhr){ 
		          xhr.setRequestHeader('Authorization', "Basic aWJzcGxfYWJhcDppYnMxMjM0");
		    }
		    ,
		    success:function(response)
		    {
		       
		      var data = response.d.results;
		      console.log(response);
		      oModel1.setData(data); //you can access it values like collection[index].keyName

		    }
		  })




		  sap.ui.getCore().byId("Detail--__table0").setModel(oModel1);
		  */

	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf northwind.Detail
	 */
	//  onExit: function() {
	//
	//  }

	onApproveConfirmation: function(dialog) {
		
		this.processConfirmation();
		dialog.close();
		//sap.m.URLHelper.triggerEmail("swaroop.ssce@gmail.com", "Testing", "Hi, This is testing");
		this.callSuccessMessage();
	},
	
	onApproveButtonPress: function() {
		var context = this;
		context.dialog = new sap.m.Dialog({
			title: 'Confirm',
			type: 'Message',
			content: new sap.m.Text({
				text: 'Do You want to Approve the Leave Request?'
			}),
			beginButton: new sap.m.Button({
				text: 'Submit',
				press: function() {
					context.onApproveConfirmation(context.dialog);
				}
			}),
			endButton: new sap.m.Button({
				text: 'Cancel',
				press: function() {
					context.dialog.close();
				}
			}),
			afterClose: function() {
				context.dialog.destroy();
			}
		});

		context.dialog.open();
	},

	callSuccessMessage: function() {
		
		sap.m.MessageToast.show("Leave Approved Successfully", {
			animationDuration: 10000
		});
	},

	onRejectButtonPress: function() {

		this.processConfirmation();
		sap.m.MessageToast.show("Leave Rejected", {
			animationDuration: 10000
		});

	},

	processConfirmation: function() {

		var list = sap.ui.getCore().byId("Master--idList");
		var myModel = list.getModel("myModel");
		var aItems = myModel.getProperty("/requests");
		var binding = window.globalVariable;
		var index = binding.toString().split("/")[2];
		aItems.splice(index, 1); // just 1 entry to remove
		myModel.setProperty("/requests", aItems);
		var currentCount = myModel.getProperty("/requests").length;
		sap.ui.getCore().byId("Master--masterPage").setTitle("Leave Requests (" + currentCount + ")");
		sap.ui.getCore().byId("Master--idList").setModel(myModel, "myModel");
	},

	onNavPress: function(evt) {

		sap.ui.getCore().byId("splitApp").toMaster("Master");
	},

	onNavBack: function() {

		/*  var oModel = new sap.ui.model.json.JSONModel();
    $.ajax({
      url: "proxy/http/services.odata.org/Northwind/Northwind.svc/Orders?$format=json",
      dataType:"json",
        
      beforeSend: function (xhr){ 
            xhr.setRequestHeader('Authorization', "Basic aWJzcGxfYWJhcDppYnMxMjM0");
      }
      ,
      success:function(response)
      {
        var data = response.d.results;
        console.log(response);
        oModel.setData(data);

      }
    });

    sap.ui.getCore().byId("northwind_appId").setModel(oModel);
    this.onNavPress();
*/
	},
	onActionButton : function() {
		
		sap.m.MessageToast("This Button has no action currently", {
			animationDuration: 10000
		});
		
	}

});