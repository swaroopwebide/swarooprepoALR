sap.ui.define([
	] , function () {
		"use strict";

		return {

			/**
			 * Rounds the number unit value to 2 digits
			 * @public
			 * @param {string} sValue the number string to be rounded
			 * @returns {string} sValue with 2 digits rounded
			 */
			currencyValue : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},

			formatDate : function (sValue) {
				if (!sValue) {
					return "";
				}
				var date = parseInt(sValue.match(/\d/g).join(''),10);
				return new Date(date).toString();
			}
		};

	}
);