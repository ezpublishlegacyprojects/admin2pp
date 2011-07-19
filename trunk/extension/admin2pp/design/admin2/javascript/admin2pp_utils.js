/**
 * $Id$
 * $HeadURL$
 *
 * A set of JS functions used all over admin2pp extension
 *
 */

function admin2ppAjaxSavePreference(name, value) {
    var url = jQuery.ez.url.replace( 'ezjscore/', 'user/preferences/' ) + 'set_and_exit/' + name + '/' + value;
    jQuery.post( url, {}, function(){} );
}

