'use strict';
var morningstar = require("morningstar");
var portfolioAccountSettingWidget = require('./widget/account-setting-widget.js');
morningstar.asterix.register('portfolioAccountSettingWidget');
morningstar.components.portfolioAccountSettingWidget = portfolioAccountSettingWidget;
module.exports = portfolioAccountSettingWidget;

