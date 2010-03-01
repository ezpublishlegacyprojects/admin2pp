/**
 * $Id$
 * $HeadURL$
 *
 */

function admin2ppDashboardBlocks()
{

}

admin2ppDashboardBlocks.ID_PREFIX = "admin2pp_db_";
admin2ppDashboardBlocks.REMOVED_CLASS = "admin2pp_db_removed";

admin2ppDashboardBlocks.getStateSide = function( selector )
                  {
                      var items = jQuery( selector );
                      var userPrefs = new Array();
                      items.each(function()
                                 {
                                     if ( !jQuery( this ).hasClass( admin2ppDashboardBlocks.REMOVED_CLASS ) )
                                     {
                                         userPrefs.push( jQuery( this ).attr( 'id' ).replace( admin2ppDashboardBlocks.ID_PREFIX, '' ) );
                                     }
                                 });
                      return userPrefs.join( ',' );
                  };


admin2ppDashboardBlocks.saveState = function()
                                    {
                                        var stateLeft = admin2ppDashboardBlocks.getStateSide( 'div.block div.left div.dashboard-item' );
                                        var stateRight = admin2ppDashboardBlocks.getStateSide( 'div.block div.right div.dashboard-item' );
                                        admin2ppAjaxSavePreference( 'admin2pp_dashboard_blocks', stateLeft + '|' + stateRight );
                                    };



admin2ppDashboardBlocks.prototype = 
{

    init:function()
         {
             jQuery( '.left' ).sortable({ connectWith: '.right', handle: 'h2', update:function() { admin2ppDashboardBlocks.saveState(); } });
             jQuery( '.right' ).sortable({ connectWith: '.left', handle: 'h2', update:function() { admin2ppDashboardBlocks.saveState(); } });
             jQuery( '.dashboard-item' ).addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
                                        .find('h2')
                                        .addClass('ui-widget-header ui-corner-all')
                                        .prepend('<a href="#" class="ui-dialog-titlebar-close ui-corner-all"><span class="ui-icon ui-icon-closethick">close</span></a>');

             jQuery( '.column' ).disableSelection();

             var closeButtons = jQuery( 'div.dashboard-item h2 a.ui-dialog-titlebar-close' );

             closeButtons.click(function( evt )
                                {
                                    var item = jQuery( this ).parents( 'div.dashboard-item' )
                                    item.addClass( admin2ppDashboardBlocks.REMOVED_CLASS );
                                    item.hide( 'highlight', {}, 200 );
                                    admin2ppDashboardBlocks.saveState();
                                });

             closeButtons.mouseover(function( evt )
                                    {
                                        jQuery( this ).addClass( 'ui-state-hover' );
                                    });

             closeButtons.mouseout(function( evt )
                                   {
                                       jQuery( this ).removeClass( 'ui-state-hover' );
                                   });

         },

}


jQuery(document).ready(function()
{
    var dashboard = new admin2ppDashboardBlocks();
    dashboard.init();
});
