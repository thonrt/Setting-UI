(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("morningstar"), require("portfolio-components-common"));
	else if(typeof define === 'function' && define.amd)
		define("portfolio-components-account-setting-widget", ["morningstar", "portfolio-components-common"], factory);
	else if(typeof exports === 'object')
		exports["portfolio-components-account-setting-widget"] = factory(require("morningstar"), require("portfolio-components-common"));
	else
		root["portfolio-components-account-setting-widget"] = factory(root["morningstar"], root["portfolio-components-common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var morningstar = __webpack_require__(1);
	var portfolioAccountSettingWidget = __webpack_require__(2);
	morningstar.asterix.register('portfolioAccountSettingWidget');
	morningstar.components.portfolioAccountSettingWidget = portfolioAccountSettingWidget;
	module.exports = portfolioAccountSettingWidget;
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    'use strict';
	
	    __webpack_require__(3);
	    var portfolioCommon = __webpack_require__(7);
	    var WidgetBase = portfolioCommon.widget.WidgetBase;
	    var Util = portfolioCommon.util.Util;
	    var DataModel = __webpack_require__(8);
	    var widgetHtml = __webpack_require__(9);
	    var accountSettingHtml = __webpack_require__(10);
	    var generalSetting = __webpack_require__(11);
	    var calculationSetting = __webpack_require__(12);
	    var DomEventHandler = __webpack_require__(13);
	    var DomCreateHandler = __webpack_require__(14);
	
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content);
	// Hot Module Replacement











/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	exports.push([module.id, ".ma-account-setting ul {\r\n    padding: 0px;\r\n}\r\n\r\n.ma-account-setting ul li {\r\n    list-style-type: none;\r\n    position: relative;\r\n}\r\n\r\n.ma-common-loading-center {\r\n    margin-top: 30%;\r\n}\r\n\r\n.ma-account-setting-popupLayout {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: #fff;\r\n    z-index: 3;\r\n    border-radius: 10px;\r\n    overflow-y: auto;\r\n}\r\n\r\n.ma-account-setting-header {\r\n    overflow: hidden;\r\n    margin: 15px 15px 5px 15px;\r\n    padding-bottom: 4px;\r\n    border-bottom: 2px solid #666;\r\n}\r\n\r\n.ma-account-setting-header .mas-ok-btn,\r\n.ma-account-setting-header .mas-cancel-btn {\r\n    margin: 0 5px 0 0;\r\n    font-size: 12px;\r\n    padding: 2px 10px;\r\n    width: 50px;\r\n}\r\n\r\n.ma-account-setting .ma-account-setting-popupLayout .ma-common-main-block {\r\n    position: absolute;\r\n    top: 50px;\r\n    left: 0px;\r\n    right: 0px;\r\n    z-index: 0;\r\n}\r\n\r\n.ma-account-setting-content {\r\n    position: relative;\r\n}\r\n\r\n.ma-account-setting-content .content_list {\r\n    position: absolute;\r\n    top: 0px;\r\n    left: 0px;\r\n    width: 130px;\r\n    overflow: hidden;\r\n}\r\n\r\n.ma-account-setting-content .content_list .item {\r\n    margin: 8px 15px;\r\n    padding-bottom: 5px;\r\n    border-bottom: 1px solid #666;\r\n}\r\n\r\n.ma-account-setting-content .content_list .item .item-icon {\r\n    margin-top: 5px;\r\n}\r\n\r\n.ma-account-setting-content .content_body {\r\n    margin-left: 150px;\r\n}\r\n\r\n.ma-account-setting .content_body .borderItem {\r\n    border-top: 1px solid #666;\r\n    margin: 15px 150px 10px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.ma-account-setting .content_body .sub_borderItem {\r\n    border-top: 1px solid #e0dcd7;\r\n    margin: 2px 0;\r\n    overflow: hidden;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item_left,\r\n.ma-account-setting .content_body_item .item_right {\r\n    margin-right: 25px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .sub_item {\r\n    position: relative;\r\n    width: 320px;\r\n    font-size: 15px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .switch.switch-inline {\r\n    padding-left: 0px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .radio,\r\n.ma-account-setting .content_body_item .item .checkout,\r\n.ma-account-setting .content_body_item .item .switch {\r\n    font-size: 13px;\r\n    padding: 5px 8px 0 24px;\r\n    margin: 5px 0;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item.switch_item {\r\n    width: 25%;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .title span {\r\n    padding-bottom: 5px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item.item_sub_radio {\r\n    padding-left: 15px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .mas_sub_radio {\r\n    margin-left: 15px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .input-text .select2-selection--single {\r\n    height: 25px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .mas_input .select-content {\r\n    max-height: 230px;\r\n    overflow: auto;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .select-text {\r\n    margin: 2px 0 0 5px;\r\n    font-size: 13px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .select-icon {\r\n    margin-right: 3px;\r\n    margin-top: 3px;\r\n}\r\n\r\n.ma-account-setting .content_body_item .item .mas_input {\r\n    position: absolute;\r\n    top: 25px;\r\n    left: 0px;\r\n    z-index: 4;\r\n    width: 100%;\r\n    background-color: #fff;\r\n    display: none;\r\n}\r\n\r\n.ma-account-setting .content_body_item .switch {\r\n    width: 100px;\r\n}", ""]);

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    "use strict";
	
	    var portfolioCommon = __webpack_require__(7);
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ma-account-setting\">\r\n    <div data-widget-view=\"default_view\" view-type=\"chart\" class=\"ma-account-setting-popupLayout\">\r\n        <div class=\"ma-account-setting-header clearfix\">\r\n            <div class=\"pull-left\">\r\n                <span>Account  Settings</span>\r\n            </div>\r\n            <div class=\"pull-right clearfix\">\r\n                <div class=\"pull-left\">\r\n                    <button data-id=\"cancel-btn\" class=\"mas-cancel-btn btn btn-default\">Cancel</button>\r\n                </div>\r\n                <div class=\"pull-left\">\r\n                    <button data-id=\"ok-btn\" class=\"mas-ok-btn btn btn-default\">Save</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"ma-account-setting-content ma-common-main-block\"></div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"account_setting_content\">\r\n    <div class=\"content_list\">\r\n        <div class=\"item mas_item_list clearfix\" data-id=\"item_general\">\r\n            <div class=\"item-text pull-left\">General</div>\r\n            <div class=\"item-icon ic-arrow-right-sm pull-right\"></div>\r\n        </div>\r\n        <div class=\"item mas_item_list clearfix\" data-id=\"item_calculation\">\r\n            <div class=\"item-text pull-left\">Calculation</div>\r\n            <div class=\"item-icon ic-arrow-right-sm pull-right\" style=\"display:none\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"content_body\">\r\n        <div  class=\"item_general\">{GeneralSetting}</div>\r\n        <div  class=\"item_calculation\">{CalculationSettting}</div> \r\n    </div>  \r\n</div>\r\n";

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div data-id=\"general_content\">\r\n    <div class=\"content_body_item clearfix\">\r\n        <div class=\"pull-left item_left portfolioIdentifier\">\r\n            <div class=\"title\">\r\n                <span>Portfolio Identifier</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{portfolioIdentifier}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pull-left item_right modelPortfolio\">\r\n            <div class=\"title\">\r\n                <span>Model Portfolio</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{modelPortfolio}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"borderItem\"></div>\r\n    <div class=\"content_body_item separaManAcc clearfix\">\r\n        <div class=\"title\">\r\n            <span>Separately Mananged Account</span>\r\n        </div>\r\n        <div class=\"item switch_item\">\r\n            <div class=\"sub_borderItem\"></div>\r\n            <div class=\"sub_item\">{separaManAcc}</div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "<div data-id=\"calculation_content\">\r\n    <div class=\"content_body_item clearfix\">\r\n        <div class=\"pull-left item_left portfolioCurrency\">\r\n            <div class=\"title\">\r\n                <span>Portfolio Currency</span>\r\n            </div>\r\n            <div class=\"item item_sub_select\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{portfolioCurrency}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pull-left item_right performanceBenchmark\">\r\n            <div class=\"title\">\r\n                <span>Performance Benchmark</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{performanceBenchmark}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"borderItem\"></div>\r\n    <div class=\"content_body_item clearfix\">\r\n        <div class=\"pull-left item_left riskFreeProxy\">\r\n            <div class=\"title\">\r\n                <span>Risk-Free Proxy</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=sub_item>{riskFreeProxy}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pull-left item_right cashPerformance\">\r\n            <div class=\"title\">\r\n                <span>Cash Performance</span>\r\n            </div>\r\n            <div class=\"pull-left item item_sub\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{cashPerformance}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"borderItem\"></div>\r\n    <div class=\"content_body_item clearfix\">\r\n        <div class=\"pull-left item_left performanceSource\">\r\n            <div class=\"title\">\r\n                <span>Performance Source</span>\r\n            </div>\r\n            <div class=\"sub_borderItem\"></div>\r\n            <div class=\"item performance_source\">\r\n                <div class=\"sub_item pull-left\">{performanceSource}</div>\r\n                <div class=\"sub_item pull-left sub_performance_source\">{subPerformanceSource}</div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"pull-left item_right import_source hidden importSource\">\r\n            <div class=\"title\">\r\n                <span>Import Source</span>\r\n            </div>\r\n            <div class=\"item item_sub\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{importSource}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"borderItem\"></div>\r\n    <div class=\"content_body_item clearfix\">\r\n        <div class=\"pull-left item_left missingPerData\">\r\n            <div class=\"title\">\r\n                <span>Missing Performance Data</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{missingPerData}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pull-left item_right gapsInAvaPerformance\">\r\n            <div class=\"title\">\r\n                <span>Gaps In Available Performance</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{gapsInAvaPerformance}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pull-left item_right rebFrequency\">\r\n            <div class=\"title\">\r\n                <span>Rebalancing Frequency</span>\r\n            </div>\r\n            <div class=\"item item_sub\">\r\n                <div class=\"sub_borderItem\"></div>\r\n                <div class=\"sub_item\">{rebFrequency}</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    "use strict";
	    var portfolioCommon = __webpack_require__(7);
	    var AutoComplete = portfolioCommon.ui.AutoComplete;
	
	    var eventHandler = {
	        events: {
	            "click .mas_select": "_showSelectList",
	            "click .mas_parent_radio.radio": "_onClickRadio",
	            "click .mas_sub_radio.radio": "_onClickSubsRadio",
	            "click .mas_switch": "_onClickSwitch",
	            "click .mas_input": "_onClickSelectList",
	            "click .mas_input_search": "_onShowBenchmark",
	            "click .mas-cancel-btn": "_onClickCloseBtn",
	            "click .mas-ok-btn": "_onClickSaveBtn",
	            "click .mas_item_list": "_onClickItemList",
	            "blur .mas-input-text": "_onClickInputText"
	        },
	
	        _onClickItemList: function(e) {
	            var $currentTarget = $(e.currentTarget);
	            var dataId = $currentTarget.attr("data-id");
	            var showContainer = this.$("." + dataId);
	            var hideContainer = this.$("." + dataId).siblings();
	            var showIcon = $currentTarget.find(".item-icon");
	            var hideIcon = $currentTarget.siblings().find(".item-icon");
	            showIcon.show();
	            hideIcon.hide();
	            showContainer.show();
	            hideContainer.hide();
	            return this;
	        },
	
	        _onShowBenchmark: function(e) {
	            var $elem = $(e.currentTarget);
	            if ($elem.hasClass("select2-container--disabled")) {
	                return this;
	            }
	            if (this.popup && this.popup.visible) {
	                this.popup.close();
	                return this;
	            }
	
	            var option = {
	                target: $elem,
	                type: "account_setting"
	            };
	            this.popup = new AutoComplete();
	            this.popup.setOption(option);
	            var self = this;
	            $(this.$el).one("click", function() {
	                if (self.popup && self.popup.visible) {
	                    self.popup.close();
	                }
	                return false;
	            });
	            this.popup.bind("close", function() {
	                this.popup = null;
	            }).bind("change", function(e, d) {
	                $elem.find(".select-text").html(d.name || "");
	                var dataValue = $elem.attr("data-value");
	                self.setSearchData(dataValue, d);
	            }).bind("search_data", function(e, keywords) {
	                self.model.requestData("search_portfolios", {
	                    keywords: keywords
	                }).done(function(d) {
	                    if (d && d.datas) {
	                        self.popup.setSearchResult(d.datas);
	                    }
	                }).fail(function() {
	                    console.log("requestData search_portfolios fail:", keywords);
	                });
	            });
	            this.popup.show();
	            return this;
	        },
	
	        setSearchData: function(dataValue, d) {
	            if (dataValue === "benchmark") {
	                this.accountSettingData.benchmarkName = d.name;
	                this.accountSettingData.benchmarkId = d.id;
	                return this;
	            }
	            if (dataValue === "freePoxy") {
	                this.accountSettingData.riskFreeProxyName = d.name;
	                this.accountSettingData.riskFreeProxyId = d.id;
	                return this;
	            }
	        },
	
	
	        _showSelectList: function(e, d) {
	            var target = e.currentTarget;
	            var nextNode = $(target).next();
	            if (nextNode.is(":visible")) {
	                nextNode.hide();
	                return;
	            }
	            this.$(".input-text .input-content").hide();
	            nextNode.show();
	            $(this.$el).one("click", function() {
	                nextNode.hide();
	                return false;
	            });
	        },
	
	        _onClickSelectList: function(e) {
	
	            var $elem = $(e.target);
	            var $curTarget = $(e.currentTarget);
	            var dataName = $curTarget.attr("data-value");
	            var dataId = $elem.attr("data-id");
	            var dataValue = $elem.attr("data-value");
	            this.accountSettingData[dataName] = dataId;
	
	            var slibingsNode = $elem.siblings();
	            $elem.addClass("select-option-selected");
	            slibingsNode.removeClass("select-option-selected");
	            $curTarget.hide();
	            var dataValueDom = $curTarget.prev().find(".select-text");
	            dataValueDom.html(dataValue);
	        },
	
	        getSubPerformanceId: function($elem, dataName) {
	            var $subRadios = this.$("[data-id=" + dataName + "]");
	            var dataId = $elem.attr("data-id");
	            //hide sub Performance source
	            // this.$(".sub_performance_source").hide();
	            $subRadios.hide();
	            $subRadios.parent().width(0);
	
	            if ($elem.hasClass("hasSubRadio")) {
	                //show sub Performance source
	                this.$(".sub_performance_source").show();
	                $subRadios.show();
	                $subRadios.parent().width(320);
	
	
	                var $subChild = $subRadios.find(".radio");
	                var $firstChild = $subChild.eq(0);
	
	                if (!$subChild.hasClass("selected")) {
	                    $firstChild.addClass("selected");
	                    dataId = $firstChild.attr("data-id");
	                } else {
	                    dataId = $subRadios.find(".radio.selected").attr("data-id");
	                }
	            }
	
	            return dataId;
	        },
	
	
	        _onClickRadio: function(e) {
	            var $elem = $(e.target);
	            var dataName = $elem.parent().attr("data-value");
	            var dataId = $elem.attr("data-id");
	
	            if (dataName === "performanceSourceId") {
	                var $importSource = this.$(".import_source");
	                $importSource.addClass("hidden");
	                dataId = this.getSubPerformanceId($elem, dataName);
	                if (dataId === "3" || dataId === "2") {
	                    $importSource.removeClass("hidden");
	                }
	            }
	            this.accountSettingData[dataName] = dataId;
	            var slibingsNode = $elem.siblings();
	            $elem.addClass("selected");
	            slibingsNode.removeClass("selected");
	
	        },
	
	        _onClickSubsRadio: function(e) {
	            var $elem = $(e.target);
	            var dataId = $elem.attr("data-id");
	            var dataName = $elem.parent().attr("data-id");
	            if ($elem.hasClass("disabled")) {
	                return this;
	            }
	            //show/hide import source
	            var $importSource = this.$(".import_source");
	            $importSource.addClass("hidden");
	            if (dataId !== "1") {
	                $importSource.removeClass("hidden");
	            }
	
	            this.accountSettingData[dataName] = dataId;
	            $elem.addClass("selected");
	            $elem.siblings().removeClass("selected");
	        },
	
	        _onClickSwitch: function(e) {
	            var target = e.currentTarget;
	            var nextNode = $(target).next();
	            var parentNode = $(target).parent();
	            var dataName = parentNode.attr("data-id");
	
	            if (parentNode.hasClass("selected")) {
	                parentNode.removeClass("selected");
	                this.accountSettingData[dataName] = false;
	                nextNode.html("Yes");
	                return this;
	            }
	            this.accountSettingData[dataName] = true;
	            parentNode.addClass("selected");
	            nextNode.html("No");
	        },
	
	
	        _onClickCloseBtn: function() {
	            this.model.actionHandlerSend("closeContainerModal", "cancel");
	            this.destroy();
	            this.model = null;
	        },
	
	
	        _onClickSaveBtn: function() {
	            var accountSettingData = this.accountSettingData;
	            this.model.showLoading();
	            this.$(".account_setting_content").remove();
	            this.model.setSetting("accountSettingData", accountSettingData);
	            var self = this;
	            var option = {
	                portfolioId: this.model.getSetting("portfolioId"),
	                groupId: this.model.getSetting("groupId"),
	                source: this.model.getSetting("source")
	            };
	            this.model.putDefaultAccountData(accountSettingData).done(function() {
	                self.model.actionHandlerSend("closeContainerModal", "save");
	                self.model.removeAccountSettingDataCache(option);
	                self.model = null;
	            }).fail(function() {
	                self.model.hideLoading();
	                self.model.showErrorInfo("Put setting failed, please try aigain");
	            });
	        },
	
	        _onClickInputText: function(e) {
	            var $target = $(e.target);
	            var dataName = $target.parent().attr("data-value");
	            if (!dataName) {
	                return this;
	            }
	            var textValue = $target.val();
	            this.accountSettingData[dataName] = textValue;
	
	        }
	    };
	
	    return eventHandler;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    'use strict';
	
	    var portfolioCommon = __webpack_require__(7);
	    var Util = portfolioCommon.util.Util;
	    var searchInputHtml = __webpack_require__(15);
	    var radioSelectHtml = __webpack_require__(16);
	    var comboxSelectHtml = __webpack_require__(17);
	    var switchHtml = __webpack_require__(18);
	
	    var eventHandler = {
	        createSelectList: function(data, value) {
	
	            var list = data.list;
	
	            var selcteValue = "";
	            var $ul = "";
	            if (Util.islist(list)) {
	                list.forEach(function(item, key) {
	                    var itemName = item.name;
	                    var className = "select-option";
	                    if (item.id === value) {
	                        selcteValue = itemName;
	                        className = "select-option select-option-selected";
	                    }
	                    $ul += "<li class='" + className + "' data-value='" + itemName + "' data-id='" + item.id + "'>" + itemName + "</li>";
	                });
	            }
	
	            var $html = Util.replace(comboxSelectHtml, {
	                selcteValue: selcteValue,
	                dataId: data.id,
	                $ul: $ul
	            });
	
	            return $html;
	        },
	
	        createRadioList: function(data, value) {
	            if (!data || !data.list) {
	                return this;
	            }
	            var list = data.list;
	            var listData = this.getListData(list, value);
	            if (!Util.islist(listData)) {
	                return this;
	            }
	            var $singleRadio = "<div class='{dataClassName}' data-id='{dataId}'>" +
	                " <span> {dataName} </span> </div>";
	            var $html = "";
	
	            listData.forEach(function(item) {
	                var dataClassName = "mas_parent_radio radio";
	                if (Util.islist(item.subs)) {
	                    dataClassName += " hasSubRadio";
	                }
	                if (item.selected) {
	                    dataClassName += " selected";
	                }
	                $html += Util.replace($singleRadio, {
	                    dataId: item.id,
	                    dataName: item.name,
	                    dataClassName: dataClassName
	
	                });
	            });
	            return Util.replace(radioSelectHtml, {
	                RadioSelectContent: $html,
	                dataValue: data.id
	            });
	        },
	
	        createSubPerfSource: function(data, value) {
	            if (!data || !data.list) {
	                return this;
	            }
	            var listData = this.getListData(data.list, value);
	            if (!Util.islist(listData)) {
	                return this;
	            }
	            var getSubsHtml = function(item) {
	                var list = item.subs;
	                if (!Util.islist(list)) {
	                    return this;
	                }
	                var show = item.selected ? "block" : "none";
	                var $subsRadio = "<div data-id=" + data.id + " style='display:" + show + "'>";
	                list.forEach(function(d) {
	                    var subsClassName = "mas_sub_radio radio";
	                    if (d.selected) {
	                        subsClassName = "mas_sub_radio radio selected";
	                    }
	                    $subsRadio += "<div class='" + subsClassName + "' data-id='" + d.id + "'>" + d.name + "</div>";
	                });
	                return $subsRadio + "</div>";
	            };
	            var $html = "";
	            listData.forEach(function(item) {
	                if (Util.islist(item.subs)) {
	                    $html = getSubsHtml(item);
	                }
	            });
	
	            return $html;
	
	        },
	
	        getListData: function(list, value) {
	
	            list = JSON.parse(JSON.stringify(list));
	            var listData = [];
	            var subsData = [];
	
	            var isBoolean = function(value) {
	                if (value === "true" || value === "false") {
	                    return true;
	                }
	                if (typeof(value) === "boolean") {
	                    return true;
	                }
	                return false;
	            };
	
	            (function() {
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var singleItem = list[i];
	                    if (!singleItem.parentId) {
	                        listData.push(singleItem);
	                    } else {
	                        subsData.push(singleItem);
	                    }
	                }
	            })(list);
	
	            var getBoolean = function(value) {
	                if (value === "true") {
	                    return true;
	                }
	                return false;
	            };
	
	            listData.forEach(function(item, index) {
	                var dataId = item.id;
	                var subs = [];
	                if (isBoolean(item.id)) {
	                    if (getBoolean(item.id) === value) {
	                        item.selected = true;
	                        item.id = value;
	                    }
	                } else {
	                    if (item.id === value) {
	                        item.selected = true;
	                    } else {
	                        subsData.forEach(function(d) {
	                            if (dataId === d.parentId) {
	                                subs.push(d);
	                            }
	                            if (d.id === value && d.parentId === item.id) {
	                                d.selected = true;
	                                item.selected = true;
	                            }
	                        });
	                    }
	                }
	                item.subs = subs;
	
	            });
	            return listData;
	        },
	
	        createSearch: function(value, disabled) {
	            var searchData = this._getSearchData(value);
	            var className = "mas_input_search select2-container--default";
	            if (disabled) {
	                className = "mas_input_search select2-container--default select2-container--disabled";
	            }
	            var $html = Util.replace(searchInputHtml, {
	                className: className,
	                searchDataValue: searchData.value,
	                searchDataId: searchData.id,
	                searchDataname: searchData.name
	            });
	            return $html;
	        },
	
	        _getSearchData: function(value) {
	            var searchData = {};
	            var defaultSetting = this.model.get("portfolio_account_setting");
	            if (value === "benchmark") {
	                searchData.name = defaultSetting.benchmarkName;
	                searchData.id = defaultSetting.benchmarkId;
	            } else if (value === "freePoxy") {
	                searchData.name = defaultSetting.riskFreeProxyName;
	                searchData.id = defaultSetting.riskFreeProxyId;
	            } else {
	                searchData.name = "";
	                searchData.id = null;
	            }
	            searchData.value = value;
	            return searchData;
	        },
	
	
	        createSwitch: function(data, value) {
	            var selectedItem = [];
	            var unselectedItem = [];
	            var list = data.list;
	            var getBoolean = function(value) {
	                if (value === "true") {
	                    return true;
	                }
	                return false;
	            };
	            for (var i = 0, l = list.length; i < l; i++) {
	                var item = list[i];
	                if (getBoolean(item.id) === value) {
	                    selectedItem = item;
	                } else {
	                    unselectedItem = item;
	                }
	            }
	            var className = "switch switch-inline";
	            var valueName = unselectedItem.name;
	            if (value) {
	                className = "switch switch-inline selected";
	            }
	            var $html = Util.replace(switchHtml, {
	                className: className,
	                valueName: valueName,
	                dataId: data.id,
	                selectedItemName: selectedItem.name,
	                selectedItemId: selectedItem.id,
	                unselectedItemName: unselectedItem.name,
	                unselectedItemId: unselectedItem.id
	            });
	            return $html;
	        },
	
	        createInputText: function(data, value) {
	            var $html = '<div data-value="{dataValue}">' +
	                '<input class="mas-input-text form-control" type="text" value={value}></input></div>';
	            return Util.replace($html, {
	                value: value || "",
	                datdataValue: ""
	            });
	        }
	
	    };
	    return eventHandler;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "<div class='{className}' data-value='{searchDataValue}' data-id='{searchDataId}'>\r\n    <span class='select2-selection--single clearfix'>\r\n        <span class='pull-left select-text select2-selection__rendered'>{searchDataname}\r\n        </span>\r\n        <span class='pull-right select-icon ic-walkMe-search'></span>\r\n    </span>\r\n</div>\r\n";

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div data-value=\"{dataValue}\">\r\n    {RadioSelectContent}\r\n</div>\r\n";

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div class='input-text select2-container--default'>\r\n    <span class='mas_select select2-selection--single clearfix'>\r\n        <span class='pull-left select-text select2-selection__rendered'> {selcteValue} </span>\r\n    \t<span class='pull-right select-icon ic-arrow-down-sm'></span>\r\n\t</span>\r\n    <div class='mas_input select select-theme-default' data-value='{dataId}'>\r\n        <div class='select-content'>\r\n            <ul class='select-options'>{$ul}</ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n";

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class='{className}' data-id='{dataId}'>\r\n    <div class='mas_switch switch-content'>\r\n        <div class='switch-center'></div>\r\n    </div>\r\n    <span data-value='{selectedItemName}:{selectedItemId}' data-false-value='{unselectedItemName}:{unselectedItemId}'>{valueName} </span>\r\n</div>\r\n";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=portfolio-components-account-setting-widget.js.map