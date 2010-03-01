/**
 * $Id$
 * $HeadURL$
 *
 */

jQuery(document).ready(function()
{

    jQuery( '.left' ).sortable({ connectWith: '.right', handle: 'h2' });
    jQuery( '.right' ).sortable({ connectWith: '.left', handle: 'h2' });
    jQuery( '.dashboard-item' ).addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
                               .find('h2')
                               .addClass('ui-widget-header ui-corner-all')
                               .prepend('<a href="#" class="ui-dialog-titlebar-close ui-corner-all"><span class="ui-icon ui-icon-closethick">close</span></a>');

    jQuery( '.column' ).disableSelection();

    var closeButtons = jQuery( 'div.dashboard-item h2 a.ui-dialog-titlebar-close');

    closeButtons.click(function( evt )
    {
        jQuery( this ).parents( 'div.dashboard-item' ).hide( 'highlight', {}, 200 );
    });

    closeButtons.mouseover(function( evt )
    {
        jQuery( this ).addClass( 'ui-state-hover' );
    });

    closeButtons.mouseout(function( evt )
    {
        jQuery( this ).removeClass( 'ui-state-hover' );
    });

});
