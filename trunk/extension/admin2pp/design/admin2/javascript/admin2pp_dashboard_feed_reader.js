/**
 * $Id$
 * $HeadURL$
 *
 */

function admin2ppDashboardFeedReader(fullIdentifier, feedURL) {
    this.fullIdentifier = fullIdentifier;
    this.feedURL = feedURL;
}

admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID = "feed-reader-settings";
admin2ppDashboardFeedReader.FEED_ID_INPUT_ID   = "fr-feed-id";
admin2ppDashboardFeedReader.FEED_URL_INPUT_ID  = "fr-feed-url";
admin2ppDashboardFeedReader.BLOCK_ID_PREFIX = "admin2pp_db_";

admin2ppDashboardFeedReader.prototype.init = function () {
    var instance = this;
    var content = jQuery('#content_' + this.fullIdentifier);
    var button = jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh');
    if (content.size() == 1 && content.css('display') != 'none') {
        this.loadResult();
    }
    button.click(function () {
        instance.wait();
        instance.loadResult(1);
    });
}

admin2ppDashboardFeedReader.prototype.initSettings = function (initDialog) {
    var instance = this;
    var base = '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier;

    jQuery(base + ' a.ui-dialog-titlebar-wrench').click(function () {
        instance.showSettings(); 
    }); 

    jQuery(base + ' input.settings').click(function () {
        instance.showSettings(); 
    });

    if (initDialog) {
        var settingsId = '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID;
        jQuery(settingsId).dialog({
            modal: true,
            height:150,
            autoOpen: false,
            width:400
        });
        jQuery(settingsId + ' form').submit(function () {
            return instance.storeSettings(); 
        });

        jQuery('#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID).blur(function () {
            instance.highlightSettingsButton();
        });
    }
}

admin2ppDashboardFeedReader.prototype.highlightSettingsButton = function () {
    jQuery('#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' input[type=submit]').addClass('defaultbutton'); 
}

admin2ppDashboardFeedReader.prototype.removeHighlightSettingsButton = function () {
    jQuery('#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' input[type=submit]').removeClass('defaultbutton'); 
}

admin2ppDashboardFeedReader.prototype.initSettingsForm = function () {
    jQuery('#' + admin2ppDashboardFeedReader.FEED_ID_INPUT_ID).val(this.fullIdentifier);
    jQuery('#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID).val(this.feedURL);
}

admin2ppDashboardFeedReader.prototype.openSettings = function() {
    jQuery('#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID).dialog('open');
}

admin2ppDashboardFeedReader.prototype.closeSettings = function () {
    jQuery('#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID).dialog('close');
}


admin2ppDashboardFeedReader.prototype.showSettings = function () {
    this.initSettingsForm();
    this.removeHighlightSettingsButton();
    this.openSettings();
}

admin2ppDashboardFeedReader.prototype.storeSettings = function () {
    var feedURL = jQuery('#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID).val();
    this.feedURL = feedURL;
    this.storeParse();
    this.closeSettings();
    return false;
}

admin2ppDashboardFeedReader.prototype.hideNotConfiguredMessage = function () {
    jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' div.not-configured').hide(); 
}

admin2ppDashboardFeedReader.prototype.showNotConfiguredMessage = function () {
    jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' div.not-configured').show(); 
}

admin2ppDashboardFeedReader.prototype.resetContent = function () {
    jQuery('#content_' + this.fullIdentifier).html(''); 
}

admin2ppDashboardFeedReader.prototype.showLoader = function () {
    jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' p.waiting').show();
}

admin2ppDashboardFeedReader.prototype.hideLoader = function () {
    jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' p.waiting').hide();
}

admin2ppDashboardFeedReader.prototype.wait = function () {
    this.hideNotConfiguredMessage();
    this.resetContent();
    this.showLoader();
}

admin2ppDashboardFeedReader.prototype.loadResult = function (force) {
    var u = 'admin2ppajax::parse::' + this.fullIdentifier;
    var instance = this;
    if (force) {
        u += '::1';
    }
    jQuery.ez(u, false, function (data) {
        if (data.content) {
            instance.displayResult(data.content); 
        }
    });
}

admin2ppDashboardFeedReader.prototype.displayResult = function (content) {
    jQuery('#content_' + this.fullIdentifier).html(content).show();
    this.hideLoader();
}

admin2ppDashboardFeedReader.prototype.storeParse = function () {
    var instance = this;
    this.wait();
    jQuery.ez('admin2ppajax::storeparse::' + instance.fullIdentifier, {FeedURL:instance.feedURL}, function (data) {
        if (data.content) {
            instance.displayResult(data.content); 
        }
    });
    if (this.feedURL == '') {
        this.hideLoader();
        jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh').hide();
        this.showNotConfiguredMessage();
    } else {
        jQuery('#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh').show();
    }
}
