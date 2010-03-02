/**
 * $Id$
 * $HeadURL$
 *
 */


function admin2ppPreviewDialog( selector )
{
    this.currentNodeID = 0;
    this.dialogSelector = selector;
    this.defaultTitle = '';
    this.defaultContent = '';
    this.previewWidth = 0;
    this.previewHeight = 0;
}

admin2ppPreviewDialog.prototype =
{
    getTitleSelector:function()
                     {
                          var result = '#ui-dialog-title-' + this.dialogSelector.replace('#', '');
                          return result;
                     },


    init:function()
         {
             var instance = this;
             jQuery( instance.dialogSelector ).dialog({ autoOpen: false,
                                                        open: function( evt, ui )
                                                              {
                                                                  jQuery.ez( 'admin2ppajax::preview::' + instance.currentNodeID,
                                                                             false,
                                                                             function( data )
                                                                             {
                                                                                 var d = jQuery( instance.dialogSelector );
                                                                                 var t = jQuery( instance.getTitleSelector() );
                                                                                 if ( data.content )
                                                                                 {
                                                                                     var content = jQuery.parseJSON( data.content );
                                                                                     instance.defaultTitle   = t.html();
                                                                                     instance.defaultContent = d.html();
                                                                                     t.html( content.title );
                                                                                     d.html( content.preview );
                                                                                 }
                                                                             });
                                                              },
                                                        close: function( evt, ui )
                                                               {
                                                                   var d = jQuery( instance.dialogSelector );
                                                                   var t = jQuery( instance.getTitleSelector() );
                                                                   d.html( instance.defaultContent );
                                                                   t.html( instance.defaultTitle );
                                                               },
                                                        resizeStop: function( evt, ui )
                                                                    {
                                                                        var width = ui.size.width, height = ui.size.height;
                                                                        instance.previewWidth = width;
                                                                        instance.previewHeight = height;
                                                                        admin2ppAjaxSavePreference( 'admin2pp_preview_width', width );
                                                                        admin2ppAjaxSavePreference( 'admin2pp_preview_height', height );
                                                                    }
                                                      });
             jQuery( '#menu-view' ).click(function( evt )
                                          {
                                              var p = jQuery( instance.dialogSelector ), previewLink = jQuery( evt.target )
                                              instance.currentNodeID = previewLink.attr( 'href' ).split("/").pop();
                                              var linkNode = jQuery( '#n' + instance.currentNodeID + ' a.image-text' );
                                              instance.openDialogAt( linkNode, 'right_of', [5, -8] );
                                              window.ezpopmenu_hideAll();
                                              return false;
                                          });

             jQuery( '#child-menu-view' ).click(function( evt )
                                          {
                                              var p = jQuery( instance.dialogSelector ), previewLink = jQuery( evt.target )
                                              instance.currentNodeID = previewLink.attr( 'href' ).split("/").pop();
                                              var menuNode = jQuery( '#SubitemsContextMenu' );
                                              instance.openDialogAt( menuNode, 'left_of', [6, -20] );
                                              window.ezpopmenu_hideAll();
                                              return false;
                                          });

         },

         openDialogAt:function( positionElt, type, manualOffset )
                      {
                          var instance = this;
                          var p = jQuery( instance.dialogSelector );
                          var offset = positionElt.offset();
                          var topPos = offset.top + manualOffset[1] - jQuery(document).scrollTop();
                          var leftPos = 0;
                          if ( type == 'right_of' )
                          {
                              leftPos = offset.left + positionElt.outerWidth() + manualOffset[0];
                          }
                          else
                          {
                              leftPos = offset.left + manualOffset[0];
                          }
                          p.dialog( 'option', 'position', [ leftPos, topPos ] );
                          p.dialog( 'option', 'width', instance.previewWidth );
                          p.dialog( 'option', 'height', instance.previewHeight );
                          p.dialog( 'open' );
                      }

}



