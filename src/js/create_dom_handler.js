define(function() {
    'use strict';

    var portfolioCommon = require('portfolio-components-common');
    var Util = portfolioCommon.util.Util;
    var searchInputHtml = require("../html/search-input.html");
    var radioSelectHtml = require("../html/radio-select.html");
    var comboxSelectHtml = require("../html/combox-select.html");
    var switchHtml = require("../html/switch.html");

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
});