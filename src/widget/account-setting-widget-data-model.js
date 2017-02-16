define(function() {
    "use strict";

    var portfolioCommon = require("portfolio-components-common");
    var ModelBase = portfolioCommon.widget.ModelBase;

    var dataModel = ModelBase.extend({

        defaults: function() {
            return {

                requestSetting: {

                    //for common request
                    all_account_settings: {
                        cacheId: "all_account_settings",
                        resource: "paapi/v1/portfolios/setting/option",
                        type: "GET"
                    },

                    change_account_setting: {
                        resource: "paapi/v1/portfolios/{portfolioId}/setting",
                        type: "POST"
                    }
                }
            };
        },


        initialize: function() {


            ModelBase.prototype.initialize.apply(this, arguments);

            //==============================================
            this.requestAccountSettingData();
            return this;
        },


        requestAccountSettingData: function() {
            clearTimeout(this.timeout_request);
            var self = this;
            this.timeout_request = setTimeout(function() {
                self.requestAccountSettingDataNow();
            }, 10);

            return this;
        },

        requestAccountSettingDataNow: function() {
            var self = this;
            this.requestData("all_account_settings").done(function(data) {
                var accountSettingData = self.getAccountSetting(data);
                self.set("all_account_settings", accountSettingData);
                self.requestDefaultAccountData();
            }).fail(function(info) {
                self.hideLoading();
                self.showErrorInfo("Setting now available, please try aigain");
                console.log("Request account setting  fail:", info);
            });
        },

        requestDefaultAccountData: function() {
            var self = this;
            var portfolioId = this.getSetting("portfolioId");
            var groupId = this.getSetting("groupId");
            var source = this.getSetting("source");
            var d_accountSetting = this.service.requestAccountSettingData({
                portfolioId: portfolioId,
                groupId: groupId,
                source: source
            });
            d_accountSetting.done(function(accountSetting) {
                self.set("portfolio_account_setting", accountSetting);
            }).fail(function(info) {
                self.hideLoading();
                self.showErrorInfo("Setting now available, please try aigain");
                console.log("Request default account setting fail:", info);
            });
        },

        putDefaultAccountData: function(putData) {
            var portfolioId = this.getSetting("portfolioId");
            var replaceOption = {
                portfolioId: portfolioId,
                postData: putData
            };
            return this.requestData("change_account_setting", replaceOption);
        },

        removeAccountSettingDataCache: function(option) {
            if (!option) {
                return this;
            }
            var requestOption = this.getRequestOption("account_setting", option);
            var cacheId = requestOption.cacheId;
            this.removeCache(cacheId);
        },

        getAccountSetting: function(data) {
            if (!data) {
                return this;
            }
            var accountData = {};

            for (var item in data) {
                if (data.hasOwnProperty(item)) {
                    accountData[item] = {};
                    accountData[item].id = item;
                    accountData[item].list = data[item];
                }
            }

            return accountData;
        }
    });

    return dataModel;
});