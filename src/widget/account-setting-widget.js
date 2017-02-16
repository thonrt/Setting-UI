define(function() {
    'use strict';

    require('./account-setting-widget.css');
    var portfolioCommon = require('portfolio-components-common');
    var WidgetBase = portfolioCommon.widget.WidgetBase;
    var Util = portfolioCommon.util.Util;
    var DataModel = require("./account-setting-widget-data-model.js");
    var widgetHtml = require("./account-setting-widget.html");
    var accountSettingHtml = require("../html/account-setting-content.html");
    var generalSetting = require("../html/general_setting.html");
    var calculationSetting = require("../html/calculation_setting.html");
    var DomEventHandler = require("../js/event-handler-dom.js");
    var DomCreateHandler = require("../js/create_dom_handler.js");

    var AccountSettingWidget = WidgetBase.extend({
        DataModel: DataModel,
        template: widgetHtml,

        initialize: function(options) {
            this.accountSettingData = {};
        },

        domReady: function() {
            //implement
            this.settingsContainer = this.$(".ma-account-setting-content");
            this.model.showLoading();
            this._bindEvent();
            return this;
        },

        _bindEvent: function() {

            var self = this;
            this.model.on("change:portfolio_account_setting", function(model, data) {
                self.accountSettingData = data;
                self.renderAccountSetting();
                self.handleHidenAccountSetting();
                self.handlePerformanceShowing();
                self.model.hideLoading();
            });
        },

        //==================================================================
        renderAccountSetting: function() {

            var data = this.model.get("all_account_settings");
            var defaultSetting = this.model.get("portfolio_account_setting");
            if (!data || !defaultSetting) {
                return this;
            }
            var $generalSetting = this.renderGenernalSetting();
            var $calculationSetting = this.renderCalculateSetting();
            var $html = Util.replace(accountSettingHtml, {

                GeneralSetting: $generalSetting,
                CalculationSettting: $calculationSetting
            });
            this.settingsContainer.append($html);

        },

        renderGenernalSetting: function() {
            var data = this.model.get("all_account_settings");
            var defaultSetting = this.model.get("portfolio_account_setting");
            var self = this;
            var $html = Util.replace(generalSetting, {
                //when true,disable the click
                modelPortfolio: self.createSearch("modelPortfolio", true),
                separaManAcc: self.createSwitch(data.realSMAFlag, defaultSetting.realSMAFlag),
                portfolioIdentifier: self.createInputText()
            });
            return $html;
        },

        renderCalculateSetting: function() {
            var data = this.model.get("all_account_settings");
            var defaultSetting = this.model.get("portfolio_account_setting");
            var self = this;
            var $html = Util.replace(calculationSetting, {
                cashPerformance: self.createRadioList(data.isUseRiskFreeInAg, defaultSetting.isUseRiskFreeInAg),
                missingPerData: self.createRadioList(data.preMissingReturnOption, defaultSetting.preMissingReturnOption),
                gapsInAvaPerformance: self.createRadioList(data.afterMissingReturnOption, defaultSetting.afterMissingReturnOption),
                performanceSource: self.createRadioList(data.performanceSourceId, defaultSetting.performanceSourceId),
                subPerformanceSource: self.createSubPerfSource(data.performanceSourceId, defaultSetting.performanceSourceId),
                rebFrequency: self.createSelectList(data.rebalanceFrequencyId, defaultSetting.rebalanceFrequencyId),
                portfolioCurrency: self.createSelectList(data.baseCurrency, defaultSetting.baseCurrency),
                performanceBenchmark: self.createSearch("benchmark"),
                riskFreeProxy: self.createSearch("freePoxy"),
                importSource: self.createSelectList(data.customDataPointForDRI, defaultSetting.customDataPointForDRI)
            });
            return $html;
        },

        handlePerformanceShowing: function() {
            var selectPerformance = this.$(".performance_source .mas_parent_radio.selected").attr("data-id");
            var selectSubPerformance = this.$(".performance_source .mas_sub_radio.selected").attr("data-id");
            var $importSource = this.$(".import_source");
            if (selectPerformance === "0" && selectSubPerformance) {
                if (selectSubPerformance !== "1") {
                    $importSource.removeClass("hidden");
                }
            }
            if (selectPerformance !== "0") {
                this.$(".sub_performance_source").hide();
                $importSource.removeClass("hidden");
            }
        },

        handleHidenAccountSetting: function() {
            var hidenAccSettingList = this.getHidenAccSettingList();
            if (!Util.islist(hidenAccSettingList)) {
                this.$(".item_calculation").hide();
                return this;
            }
            for (var i = 0, l = hidenAccSettingList.length; i < l; i++) {
                var item = hidenAccSettingList[i];
                var hidenDom = this.$("." + item);
                hidenDom.hide();
                hidenDom.css("height", 0);
            }

            var self = this;
            this.$(".item_general .content_body_item").each(function(index, e) {
                self.handlerShowBorderLine(index, e);
            });
            this.$(".item_calculation .content_body_item").each(function(index, e) {
                self.handlerShowBorderLine(index, e);
            });
            this.$(".item_calculation").hide();
        },

        handlerShowBorderLine: function(index, e) {
            var target = $(e);
            var height = target.height();
            if (height > 0) {
                return this;
            }
            if (index === 0) {
                target.next(".borderItem").hide();
            }
            target.prev(".borderItem").hide();
        },

        getHidenAccSettingList: function() {
            var investment = this.model.getSetting("investment");
            if (!investment) {
                return this;
            }
            var portfolioType = investment.portfolioType;
            if (portfolioType === "model portfolio") {
                return ["modelPortfolio", "separaManAcc"];
            }

            if (portfolioType === "custom benchmark") {
                return ["modelPortfolio", "separaManAcc", "cashPerformance", "riskFreeProxy"];
            }

            return [];
        }


    });

    $.extend(AccountSettingWidget.prototype, DomEventHandler, DomCreateHandler);
    return AccountSettingWidget;
});