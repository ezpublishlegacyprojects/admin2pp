/**
 * $Id$
 * $HeadURL$
 *
 */

function admin2ppAutoComplete(inputSelector, minLength) {
    this.inputSelector = inputSelector;
    this.minLength = minLength;
}

admin2ppAutoComplete.SEPARATOR = ',';
admin2ppAutoComplete.SPLIT_REGEXP = /,\s*/;


admin2ppAutoComplete.prototype.init = function () {
    var instance = this;  
    jQuery(instance.inputSelector).autocomplete({
        minLength: instance.minLength,

        focus:function () {
            return false;
        },

        source:function (request, response) {
            if (request.term.charAt(request.term.length - 1) == admin2ppAutoComplete.SEPARATOR) {
                response("");
                return false;
            }
            var tag = request.term.split(admin2ppAutoComplete.SPLIT_REGEXP).pop();
            if (tag.length < instance.minLength) {
                response("");
                return false;
            }
            var u = 'admin2ppajax::complete::' + encodeURIComponent(tag);
            jQuery.ez(u, false, function (data) {
                response(data.content);
            });
        },

        select:function (evt, ui) {
            var terms = this.value.split(admin2ppAutoComplete.SPLIT_REGEXP);
            terms.pop();
            terms.push(ui.item.value);
            terms.push('');
            this.value = terms.join(admin2ppAutoComplete.SEPARATOR + ' ');
            return false;
        }
    });
}
