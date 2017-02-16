define(function() {
    "use strict";
    var portfolioCommon = require('portfolio-components-common');
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
});