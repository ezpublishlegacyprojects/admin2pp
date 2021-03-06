/**
 * $Id$
 * $HeadURL$
 *
 */


function admin2ppPreviewDialog(conf) {
    this.currentNodeID = 0;
    this.currentContentObjectID = 0;

    this.dialogSelector = conf.dialog;
    this.elements = conf.elements;
    this.errorText = conf.errorText;
    this.linkText = conf.linkText;

    this.defaultTitle = '';
    this.defaultContent = '';
}

admin2ppPreviewDialog.WINDOW_PADDING_LEFT = 40;
admin2ppPreviewDialog.WINDOW_PADDING_TOP = 20;
admin2ppPreviewDialog.IFRAME_OFFSET = 40;

admin2ppPreviewDialog.UPDATE_BUTTON = '#preview-update';
admin2ppPreviewDialog.PREVIEW_CHOOSE = '#preview-choose';

admin2ppPreviewDialog.removeNode = function(nodeID) {
    jQuery('#menu-form-remove input[name="ContentObjectID"]').val(1);
    jQuery('#menu-form-remove input[name="ContentNodeID"]').val(nodeID);
    jQuery('#menu-form-remove').submit();
    return false;
}

admin2ppPreviewDialog.moveNode = function(nodeID) {
    jQuery('#menu-form-move input[name="ContentNodeID"]').val(nodeID);
    jQuery('#menu-form-move').submit();
    return false;
};

admin2ppPreviewDialog.prototype.getTitleSelector = function () {
    var result = '#ui-dialog-title-' + this.dialogSelector.replace('#', '');
    return result;
}

admin2ppPreviewDialog.prototype.storeDefault = function () {
    var d = jQuery(this.dialogSelector),
        t = jQuery(this.getTitleSelector());

    this.defaultTitle   = t.html();
    this.defaultContent = d.html();
}

admin2ppPreviewDialog.prototype.restoreDefault = function () {
    var d = jQuery(this.dialogSelector),
        t = jQuery(this.getTitleSelector());

    this.currentNodeID = 0;
    this.currentContentObjectID = 0;
    t.html(this.defaultTitle);
    d.html(this.defaultContent);
},

admin2ppPreviewDialog.prototype.buildError = function (errorMsg) {
    var d = jQuery(this.dialogSelector),
        t = jQuery(this.getTitleSelector());

    if (!errorMsg) {
        errorMsg = this.errorText;
    }
    d.html('<div class="ui-state-error ui-corner-all"><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>' + errorMsg + '</div>');
    t.html(errorMsg);
}

admin2ppPreviewDialog.prototype.updatePreview = function (evt) {
    var select = jQuery(admin2ppPreviewDialog.PREVIEW_CHOOSE),
        iframe = jQuery(this.dialogSelector + ' iframe'),
        button = jQuery(evt.target);
    var tmp = select.val().split(',');
    var lang = tmp[0], sa = tmp[1], currentURL = iframe.attr('src');
    var parts = currentURL.split('/');
    parts[parts.length - 1] = sa;
    parts[parts.length - 3] = lang;
    iframe.attr('src', parts.join('/'));
    button.removeClass('defaultbutton');
},

admin2ppPreviewDialog.prototype.highlightButton = function (evt) {
    jQuery(admin2ppPreviewDialog.UPDATE_BUTTON).addClass('defaultbutton');
}

admin2ppPreviewDialog.prototype.buildPreview = function (content) {
    var i = this,
        d = jQuery(this.dialogSelector), t = jQuery(this.getTitleSelector());

    t.html(content.title);
    this.currentNodeID = content.node_id;
    this.currentContentObjectID = content.object_id;
    d.html(content.preview);

    jQuery(admin2ppPreviewDialog.UPDATE_BUTTON).click(function (evt) {
        i.updatePreview(evt)
    });
    jQuery(admin2ppPreviewDialog.PREVIEW_CHOOSE).change(this.highlightButton);

    jQuery(this.dialogSelector + ' .edit').click(function (evt) {
        location.href = content.edit; // TODO use the language of the preview
    });
    jQuery(this.dialogSelector + ' .copy').click(function (evt) {
        location.href = content.copy;
    });
    jQuery(this.dialogSelector + ' .move').click(function (evt) {
        admin2ppPreviewDialog.moveNode(content.node_id);
    });
    jQuery(this.dialogSelector + ' .remove').click(function (evt) {
        admin2ppPreviewDialog.removeNode(content.node_id);
    });
    this.setIFrameHeight();
},

admin2ppPreviewDialog.prototype.init = function () {

    this.initDialog();
    this.initButtons();
}


admin2ppPreviewDialog.prototype.initButtons = function () {
    var element, jelt, that = this;

    for(var i=0; i!=this.elements.length; i++) {
        element = this.elements[i];
        jelt = jQuery(element.selector);
        if ( jelt.size() > 0 ) {
            if ( element.init ) {
                element.init.call(jelt);
            }
            jelt.click(function (evt) {
                element.click.call(that, evt);
            });
        }
    }
}

admin2ppPreviewDialog.prototype.initDialog = function () {
    var that = this;
    jQuery(this.dialogSelector).dialog({
        autoOpen: false,
        resizable: false,
        draggable: false,
        dialogClass: 'preview',
        modal: true,
        open: function (evt, ui) {
            var url = 'admin2ppajax::preview::';

            if (that.currentNodeID != 0) {
                url += that.currentNodeID + '::node_id';
            } else {
                url += that.currentContentObjectID + '::object_id';
            }
            jQuery.ez(url, false, function (data) {
                that.storeDefault();
                if (data.content) {
                    var content = jQuery.parseJSON(data.content);
                    if (content.error != "") {
                        that.buildError(content.error);
                    }
                    that.buildPreview(content);
                } else {
                    that.buildError();
                }
            });
        },
        close: function (evt, ui) {
            that.restoreDefault(); 
        }
    });
}

admin2ppPreviewDialog.prototype.initFromContentViewLink = function (evt) {
    var previewLink = jQuery(evt.target),
        tmp = previewLink.attr('href').split("/");

    this.currentNodeID = tmp.pop();
    this.open();
    return false;
}

admin2ppPreviewDialog.prototype.open = function () {
    var p = jQuery(this.dialogSelector);

    p.dialog('option', 'position', 'center');
    p.dialog('option', 'width', jQuery(window).width() - (admin2ppPreviewDialog.WINDOW_PADDING_LEFT * 2));
    p.dialog('option', 'height', jQuery(window).height() - (admin2ppPreviewDialog.WINDOW_PADDING_TOP * 2));
    p.dialog('open');

    window.ezpopmenu_hideAll();
}

admin2ppPreviewDialog.prototype.setIFrameHeight = function () {
    var p = jQuery('#preview-dialog'),
        f = jQuery(this.dialogSelector + ' fieldset'),
        t = jQuery(this.dialogSelector + ' .tools'),
        ifr = jQuery(this.dialogSelector + ' iframe');

    ifr.css('height', p.innerHeight() - f.outerHeight() - t.outerHeight() - admin2ppPreviewDialog.IFRAME_OFFSET);
}

