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
                      var userPrefs = [];
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
             var actionButtons = jQuery( 'div.dashboard-item h2 a.ui-corner-all' );

             closeButtons.click(function( evt )
                                {
                                    var item = jQuery( this ).parents( 'div.dashboard-item' )
                                    var blockIdentifier = item.attr( 'id' ).replace( admin2ppDashboardBlocks.ID_PREFIX, '' );
                                    item.addClass( admin2ppDashboardBlocks.REMOVED_CLASS );
                                    item.hide( 'highlight', {}, 200 );
                                    admin2ppDashboardBlocks.saveState();
                                    // updating window settings
                                    jQuery( '#admin2pp_all_choosen' ).hide();
                                    jQuery( '#admin2pp_db_choice_' + blockIdentifier ).show();
                                    jQuery( '#admin2pp-db-window p.button-bar' ).show();
                                    jQuery( '#admin2pp_db_choice_' + blockIdentifier + ' input' ).removeAttr( 'disabled' );
                                });

             actionButtons.mouseover(function( evt )
                                     {
                                         jQuery( this ).addClass( 'ui-state-hover' );
                                     });

             actionButtons.mouseout(function( evt )
                                    {
                                        jQuery( this ).removeClass( 'ui-state-hover' );
                                    });

         },


    initSettings:function()
                 {
                     jQuery( '#admin2pp-db-settings' ).toggle();
                     jQuery( '#admin2pp-db-window' ).dialog( { modal: true,
                                                               height:400,
                                                               autoOpen: false,
                                                               width:500 } );
                     jQuery( '#admin2pp-db-load' ).click(function()
                                                         {
                                                             jQuery( '#admin2pp-db-window' ).dialog( 'open' );
                                                             return false;
                                                         });
                     jQuery( 'ul.settings-dashboard li input' ).change(function()
                                                                    {
                                                                        if ( this.checked )
                                                                        {
                                                                            jQuery( '#admin2pp-db-save-button' ).addClass( 'defaultbutton' );
                                                                        }
                                                                    });
                     jQuery( '#admin2pp-db-window form' ).submit(function()
                                                                 {
                                                                     var stateLeft = admin2ppDashboardBlocks.getStateSide( 'div.block div.left div.dashboard-item' );
                                                                     var stateRight = admin2ppDashboardBlocks.getStateSide( 'div.block div.right div.dashboard-item' );
                                                                     var form = jQuery( this );
                                                                     form.find( 'input:checkbox:checked' ).each(function()
                                                                                                                {
                                                                                                                    var checkbox = jQuery( this );
                                                                                                                    var blockIdentifier = checkbox.val();
                                                                                                                    if ( checkbox.hasClass( 'multiple-block' ) )
                                                                                                                    {
                                                                                                                        var now = new Date();
                                                                                                                        blockIdentifier += "_iid-" + now.getFullYear()
                                                                                                                                            + "-" + (parseInt(now.getMonth()) + 1)
                                                                                                                                            + "-" + now.getDay()
                                                                                                                                            + "_" + now.getHours()
                                                                                                                                            + "-" + now.getMinutes()
                                                                                                                                            + "-" + now.getSeconds();
                                                                                                                    }
                                                                                                                    if ( stateLeft == '' )
                                                                                                                    {
                                                                                                                        stateLeft = blockIdentifier;
                                                                                                                    }
                                                                                                                    else
                                                                                                                    {
                                                                                                                        stateLeft = blockIdentifier + "," + stateLeft; 
                                                                                                                    }
                                                                                                                });
                                                                     var prefs = stateLeft + '|' + stateRight;
                                                                     form.attr( 'action', form.attr( 'action' ) + "/" + prefs );
                                                                     return true;
                                                                 });
                 }
};
