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
    this.linkText = '';
    this.editText = '';
    this.removeText = '';
    this.moveText = '';
    this.copyText = '';
}

admin2ppPreviewDialog.removeNode = function( nodeID )
                                   {
                                       jQuery( '#menu-form-remove input[name="ContentObjectID"]' ).val( 1 );
                                       jQuery( '#menu-form-remove input[name="ContentNodeID"]' ).val( nodeID );
                                       jQuery( '#menu-form-remove' ).submit();
                                       return false;
                                   };

admin2ppPreviewDialog.moveNode = function( nodeID )
                                 {
                                     jQuery( '#menu-form-move input[name="ContentNodeID"]' ).val( nodeID );
                                     jQuery( '#menu-form-move' ).submit();
                                     return false;
                                 };

admin2ppPreviewDialog.prototype =
{
    getTitleSelector:function()
                     {
                          var result = '#ui-dialog-title-' + this.dialogSelector.replace('#', '');
                          return result;
                     },

    storeDefault:function()
                 {
                     var d = jQuery( this.dialogSelector );
                     var t = jQuery( this.getTitleSelector() );
                     this.defaultTitle   = t.html();
                     this.defaultContent = d.html();
                 },

    restoreDefault:function()
                   {
                       var d = jQuery( this.dialogSelector );
                       var t = jQuery( this.getTitleSelector() );
                       t.html( this.defaultTitle );
                       d.html( this.defaultContent );
                       jQuery( this.getTitleSelector() ).parent().find( 'a.admin2pp-action' ).remove();
                   },

    addSimpleLink:function( url, text, type, callback )
                  {
                      var nodeID = this.currentNodeID;
                      var link = '<a class="ui-dialog-titlebar-' + type + ' ui-corner-all admin2pp-action" title="' + text + '" href="' + url + '"><span class="ui-icon ui-icon-' + type + '">' + text + '</span></a>';
                      jQuery( this.getTitleSelector() ).before( link );
                      if ( callback )
                      {
                          jQuery( this.getTitleSelector() ).parent().find( 'a.ui-dialog-titlebar-' + type ).click(function()
                                                                                                                  {
                                                                                                                      return callback( nodeID ); 
                                                                                                                  });
                      }
                  },

    buildPreview:function( content )
                 {
                     var d = jQuery( this.dialogSelector );
                     var t = jQuery( this.getTitleSelector() );
                     t.html( content.title );
                     if ( content.edit )
                     {
                         this.addSimpleLink( content.edit, this.editText, 'pencil' );
                     }
                     if ( content.remove )
                     {
                         this.addSimpleLink( '#', this.removeText, 'trash', admin2ppPreviewDialog.removeNode );
                     }
                     if ( content.copy )
                     {
                         this.addSimpleLink( content.copy, this.copyText, 'copy' );
                     }
                     if ( content.move )
                     {
                         this.addSimpleLink( '#', this.moveText, 'transferthick-e-w', admin2ppPreviewDialog.moveNode );
                     }

                     var actionButtons = jQuery( this.getTitleSelector() ).parent().find( 'a.admin2pp-action' );
                     actionButtons.mouseover(function( evt )
                                             {
                                                 jQuery( this ).addClass( 'ui-state-hover' );
                                             });

                     actionButtons.mouseout(function( evt )
                                            {
                                                jQuery( this ).removeClass( 'ui-state-hover' );
                                            });
                     d.html( content.preview );
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
                                                                                 if ( data.content )
                                                                                 {
                                                                                     var content = jQuery.parseJSON( data.content );
                                                                                     instance.storeDefault();
                                                                                     instance.buildPreview( content );
                                                                                 }
                                                                             });
                                                              },
                                                        close: function( evt, ui )
                                                               {
                                                                   instance.restoreDefault(); 
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
             // TODO refactoring needed
             jQuery( '#menu-view' ).click(function( evt )
                                          {
                                              var p = jQuery( instance.dialogSelector ), previewLink = jQuery( evt.target )
                                              instance.currentNodeID = previewLink.attr( 'href' ).split("/").pop();
                                              var linkNode = jQuery( '#n' + instance.currentNodeID + ' a.image-text' );
                                              instance.openDialogAt( linkNode, 'right_of', [5, -8] );
                                              window.ezpopmenu_hideAll();
                                              return false;
                                          }).html( instance.linkText );

             jQuery( '#child-menu-view' ).click(function( evt )
                                          {
                                              var p = jQuery( instance.dialogSelector ), previewLink = jQuery( evt.target )
                                              instance.currentNodeID = previewLink.attr( 'href' ).split("/").pop();
                                              var menuNode = jQuery( '#SubitemsContextMenu' );
                                              instance.openDialogAt( menuNode, 'left_of', [6, -20] );
                                              window.ezpopmenu_hideAll();
                                              return false;
                                          }).html( instance.linkText );
             jQuery( '#bookmark-view' ).click(function( evt )
                                              {
                                                  var p = jQuery( instance.dialogSelector ), previewLink = jQuery( evt.target )
                                                  instance.currentNodeID = previewLink.attr( 'href' ).split("/").pop();
                                                  instance.openDialogAt( jQuery( '#bookmarks' ), 'left_of', [-instance.previewWidth, 0] );
                                                  window.ezpopmenu_hideAll();
                                                  return false;
                                              }).html( instance.linkText );

         },

         openDialogAt:function( positionElt, type, manualOffset )
                      {
                          var instance = this;
                          var p = jQuery( instance.dialogSelector );
                          var offset = positionElt.offset();
                          var topPos = offset.top + manualOffset[1] - jQuery(document).scrollTop();
                          if ( (topPos + instance.previewHeight) > jQuery(window).height() )
                          {
                              topPos = topPos - ( (topPos + instance.previewHeight) - jQuery(window).height() ) - 10;
                          }
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



