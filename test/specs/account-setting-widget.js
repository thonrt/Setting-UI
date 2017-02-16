describe('accountSettingWidget', function() {
    'use strict';


    var PortfolioCommon = require('portfolio-components-common');
    var AccountSettingWidget = require("../../src/widget/account-setting-widget.js");
    var ajaxMock = require('../../../common/src/widget/action-handler/ajax-mock.js');

    var singleSettingData = require("json!../data/single_setting_data.json");
    var putSettingData = require("json!../data/put_setting_data.json");
    var benchMarkSearchData = require("json!../data/benchmark_search_data");
    var accountSettingData = require("json!../data/account_setting_data.json");


    ajaxMock.setMockData([{
        url: "/paapi/v1/portfolios/setting/option",
        data: accountSettingData
    }, {
        url: "/paapi/v1/portfolios/51335301/setting?groupId=&source=dataapi",
        data: singleSettingData,
        type: 'GET'
    }, {
        url: "/paapi/v1/portfolios/51335301/setting",
        data: putSettingData,
        type: 'PUT'
    }, {
        url: "/paapi/v1/portfolios/search?k=a",
        data: benchMarkSearchData
    }]);



    var container = $("<div/>").width(1000).height(800).appendTo(document.body);

    var actionHandler = new PortfolioCommon.widget.ActionHandler();

    var option = {
        element: container,
        actionHandler: actionHandler,
        setting: {
            "portfolioId": "51335301"
        }
    };
    var widgetAPI = AccountSettingWidget.createComponent(option);
    var widget;
    actionHandler.bind("all", function(eventName, value) {
        if (eventName !== "data") {
            return;
        }
        widgetAPI.setProperty(eventName, value);
    });


    it('get widget', function(done) {

        setTimeout(function() {

            widget = widgetAPI.widget;

            expect(widget).toBeTruthy();

            done();
        }, 100);

    });

    it("widget Cancle button click", function(done) {
        setTimeout(function() {

            $("[data-id='cancel-btn']").click();
            setTimeout(function() {
                expect(widget.accountSettingData.baseCurrency).toBe("USD");
                expect(widget.accountSettingData.benchmarkName).toBe("Morningstar Mod Tgt Risk TR USD");
                expect(widget.accountSettingData.riskFreeProxyName).toBe("Morningstar Cash TR USD");
                done();
            }, 100);
        }, 100);
    });


    it("widget open", function(done) {
        widgetAPI = AccountSettingWidget.createComponent(option);
        setTimeout(function() {

            widget = widgetAPI.widget;

            expect(widget).toBeTruthy();

            done();
        }, 100);
    });

    describe("General Setting", function() {
        it("widget Model Portfolio click", function(done) {
            $(".mas_input_search .select2-selection--single").eq(0).click();
            setTimeout(function() {
                var benchMarkPop = widget.popup;
                setTimeout(function() {
                    expect(benchMarkPop).not.toBeTruthy();
                    done();
                }, 100);
            }, 500);
        });


        it("widget Separately Mananged Account click,Yes", function(done) {
            setTimeout(function() {

                $("[data-id=realSMAFlag]").find(".mas_switch").click();

                setTimeout(function() {
                    expect(widget.accountSettingData.realSMAFlag).toBe(true);
                    done();
                }, 100);
            }, 100);
        });

        it("widget Separately Mananged Account click,No", function(done) {
            setTimeout(function() {

                $("[data-id=realSMAFlag]").find(".mas_switch").click();

                setTimeout(function() {
                    expect(widget.accountSettingData.realSMAFlag).toBe(false);
                    done();
                }, 100);
            }, 100);
        });

        it("widget portfolio Identifier click", function(done) {
            setTimeout(function() {

                $(".mas-input-text.form-control").val("aaaa");

                setTimeout(function() {
                    $(".mas-input-text.form-control").blur();
                    setTimeout(function() {
                        expect($(".mas-input-text.form-control").val()).toBe("aaaa");
                        done();
                    }, 100);

                }, 100);
            }, 100);
        });
    });


    describe("Calculation Setting", function() {
        it("change to calculation section", function(done) {
            $(".content_list .item").eq(1).click();
            setTimeout(function() {
                var calculation = this.$(".item_calculation");
                expect(calculation.css("display")).toBe("block");
                done();
            }, 100);
        });

        it("widget Cash Performance click", function(done) {
            setTimeout(function() {

                $("[data-value=isUseRiskFreeInAg]").find(".mas_parent_radio.radio").eq(0).click();

                setTimeout(function() {
                    expect(widget.accountSettingData.isUseRiskFreeInAg).toBe('false');
                    done();
                }, 100);
            }, 100);
        });

        it("widget Missing Performance Data click", function(done) {
            setTimeout(function() {

                $("[data-value=preMissingReturnOption]").find(".mas_parent_radio.radio").eq(1).click();

                setTimeout(function() {
                    expect(widget.accountSettingData.preMissingReturnOption).toBe('1');
                    done();
                }, 100);
            }, 100);
        });


        it("widget Gaps in Available Performance click", function(done) {
            setTimeout(function() {

                $("[data-value=afterMissingReturnOption]").find(".mas_parent_radio.radio").eq(1).click();

                setTimeout(function() {
                    expect(widget.accountSettingData.afterMissingReturnOption).toBe('1');
                    done();
                }, 100);
            }, 100);
        });

        it("widget Performance Source click, sub radio", function(done) {
            setTimeout(function() {

                $("[data-id=performanceSourceId]").find(".mas_sub_radio.radio").eq(1).click();

                setTimeout(function() {
                    expect(widget.accountSettingData.performanceSourceId).toBe("3");
                    done();
                }, 100);
            }, 100);
        });

        it("widget Performance Source click,parent radio", function(done) {
            setTimeout(function() {

                $("[data-value=performanceSourceId]").find(".mas_parent_radio.radio").eq(1).click();

                setTimeout(function() {
                    expect(widget.accountSettingData.performanceSourceId).toBe("2");
                    done();
                }, 100);
            }, 100);
        });

        it("widget Performance Source click,parent radio", function(done) {
            setTimeout(function() {

                $("[data-value=performanceSourceId]").find(".mas_parent_radio.radio").eq(0).click();

                setTimeout(function() {
                    expect(widget.accountSettingData.performanceSourceId).toBe("3");
                    done();
                }, 100);
            }, 100);
        });

        it("widget Portfolio Currency click open and close", function(done) {
            $(".input-text .select2-selection--single").eq(0).click();
            setTimeout(function() {
                $(".mas_input .select2-selection--single").eq(1).click();
                setTimeout(function() {
                    expect(widget.accountSettingData.baseCurrency).toBe('USD');
                    done();
                }, 100);
            }, 500);
        });


        it("widget Portfolio Currency click", function(done) {
            $(".input-text .select2-selection--single").eq(0).click();
            setTimeout(function() {
                $('[data-value=baseCurrency]').find(".select-option").eq(2).click();
                setTimeout(function() {
                    expect(widget.accountSettingData.baseCurrency).toBe('BHD');
                    done();
                }, 100);
            }, 500);
        });



        it("widget Rebalancncing Frequency click", function(done) {
            $(".mas_select.select2-selection--single").eq(2).click();
            setTimeout(function() {

                $('[data-value=rebalanceFrequencyId]').find(".select-option").eq(2).click();

                setTimeout(function() {

                    expect(widget.accountSettingData.rebalanceFrequencyId).toBe('4');
                    done();
                }, 100);
            }, 500);
        });

        it("widget Import source click", function(done) {
            $(".mas_select.select2-selection--single").eq(1).click();
            setTimeout(function() {

                var $customDataPointForDRI = $('[data-value=customDataPointForDRI]');
                expect($customDataPointForDRI.css("display")).toBe("block");

                done();
            }, 500);
        });



        it("widget Portfolio Benchmark click open and close", function(done) {
            $(".mas_input_search .select2-selection--single").eq(1).click();
            setTimeout(function() {
                $(".mas_input_search.select2-selection--single").eq(2).click();
                setTimeout(function() {
                    var benchMarkPop = widget.popup;
                    expect(benchMarkPop.containerDelete.css("display")).toBe("none");

                    done();
                }, 100);
            }, 500);
        });



        it("widget Portfolio Benchmark click", function(done) {
            // $(".mas_input_search .select2-selection--single").eq(1).click();
            setTimeout(function() {
                var $autocomplete = this.$(".ma_autocomplete");
                expect($autocomplete.css("display")).toBe("block");
                var benchMarkPop = widget.popup;
                benchMarkPop.containerInput.val("a");
                benchMarkPop.containerInput.trigger("change");
                setTimeout(function() {

                    expect(benchMarkPop.containerDelete.css("display")).toBe("block");
                    setTimeout(function() {
                        benchMarkPop.currentView.container.find(".item").first().trigger("click");
                        expect(benchMarkPop.container).toBe(null);
                        done();
                    }, 500);

                }, 100);
            }, 500);
        });





        it("widget Risk-Free Proxy click", function(done) {
            $(".mas_input_search .select2-selection--single").eq(2).click();
            setTimeout(function() {
                var $autocomplete = this.$(".ma_autocomplete");
                expect($autocomplete.css("display")).toBe("block");
                var benchMarkPop = widget.popup;
                benchMarkPop.containerInput.val("a");
                benchMarkPop.containerInput.trigger("change");
                setTimeout(function() {

                    expect(benchMarkPop.containerDelete.css("display")).toBe("block");
                    setTimeout(function() {
                        benchMarkPop.currentView.container.find(".item").eq(1).trigger("click");
                        expect(benchMarkPop.container).toBe(null);
                        done();
                    }, 500);

                }, 100);
            }, 500);
        });
    });

    it("widget Save button click", function(done) {
        $("[data-id='ok-btn']").click();
        setTimeout(function() {
            expect(widget.accountSettingData.baseCurrency).toBe("BHD");
            expect(widget.accountSettingData.benchmarkName).toBe("S&P BSE SENSEX India INR");
            expect(widget.accountSettingData.riskFreeProxyName).toBe("AMEX Cleantech PR USD");
            done();
        }, 100);
    });


});