/**
 * $Id$
 * $HeadURL$
 *
 */


function admin2ppPreviewDialog( selector )
{
    this.currentNodeID = 0;
    this.currentContentObjectID = 0;

    this.dialogSelector = selector;
    this.defaultTitle = '';
    this.defaultContent = '';
    this.errorText = '';
    this.linkText = '';
}

admin2ppPreviewDialog.WINDOW_PADDING_LEFT = 40;
admin2ppPreviewDialog.WINDOW_PADDING_TOP = 20;
admin2ppPreviewDialog.IFRAME_OFFSET = 40;

admin2ppPreviewDialog.UPDATE_BUTTON = '#preview-update';
admin2ppPreviewDialog.PREVIEW_CHOOSE = '#preview-choose';

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
                       this.currentNodeID = 0;
                       this.currentContentObjectID = 0;
                       t.html( this.defaultTitle );
                       d.html( this.defaultContent );
                   },

    buildError:function( errorMsg )
               {
                   var d = jQuery( this.dialogSelector );
                   var t = jQuery( this.getTitleSelector() );
                   if ( !errorMsg )
                   {
                       errorMsg = this.errorText;
                   }
                   d.html( '<div class="ui-state-error ui-corner-all"><span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>' + errorMsg + '</div>' );
                   t.html( errorMsg );
               },

    updatePreview:function( evt )
                  {
                      var select = jQuery( admin2ppPreviewDialog.PREVIEW_CHOOSE ), iframe = jQuery( this.dialogSelector + ' iframe' ), button = jQuery( evt.target );
                      var tmp = select.val().split( ',' );
                      var lang = tmp[0], sa = tmp[1], currentURL = iframe.attr( 'src' );
                      var parts = currentURL.split( '/' );
                      parts[parts.length - 1] = sa;
                      parts[parts.length - 3] = lang;
                      iframe.attr( 'src', parts.join( '/' ) );
                      button.removeClass( 'defaultbutton' );
                  },

    highlightButton:function( evt )
                    {
                        jQuery( admin2ppPreviewDialog.UPDATE_BUTTON ).addClass( 'defaultbutton' );
                    },

    buildPreview:function( content )
                 {
                     var i = this;
                     var d = jQuery( this.dialogSelector ), t = jQuery( this.getTitleSelector() );
                     t.html( content.title );
                     this.currentNodeID = content.node_id;
                     this.currentContentObjectID = content.object_id;
                     d.html( content.preview );
                     jQuery( admin2ppPreviewDialog.UPDATE_BUTTON ).click( function( evt ) { i.updatePreview( evt ) } );
                     jQuery( admin2ppPreviewDialog.PREVIEW_CHOOSE ).change( this.highlightButton );
                     jQuery( this.dialogSelector + ' .edit').click( function( evt ) { location.href = content.edit } ); // TODO use the language of the preview
                     jQuery( this.dialogSelector + ' .copy').click( function( evt ) { location.href = content.copy } );
                     jQuery( this.dialogSelector + ' .move').click( function( evt ) { admin2ppPreviewDialog.moveNode( content.node_id ) } );
                     jQuery( this.dialogSelector + ' .remove').click( function( evt ) { admin2ppPreviewDialog.removeNode( content.node_id ) } );
                     this.setIFrameHeight();
                 },

    init:function()
         {
             var instance = this;
             jQuery( instance.dialogSelector ).dialog({ autoOpen: false,
                                                        resizable: false,
                                                        draggable: false,
                                                        dialogClass: 'preview',
                                                        modal: true,
                                                        open: function( evt, ui )
                                                              {
                                                                  var url = 'admin2ppajax::preview::';
                                                                  if ( instance.currentNodeID != 0 )
                                                                  {
                                                                      url += instance.currentNodeID + '::node_id';
                                                                  }
                                                                  else
                                                                  {
                                                                      url += instance.currentContentObjectID + '::object_id';
                                                                  }
                                                                  jQuery.ez( url, false,
                                                                             function( data )
                                                                             {
                                                                                 instance.storeDefault();
                                                                                 if ( data.content )
                                                                                 {
                                                                                     var content = jQuery.parseJSON( data.content );
                                                                                     if ( content.error != "" )
                                                                                     {
                                                                                        instance.buildError( content.error );
                                                                                     }
                                                                                     instance.buildPreview( content );
                                                                                 }
                                                                                 else
                                                                                 {
                                                                                     instance.buildError();
                                                                                 }
                                                                             });

                                                              },
                                                        close: function( evt, ui )
                                                               {
                                                                   instance.restoreDefault(); 
                                                               }
                                                      });

             jQuery( '#child-menu-preview' ).click(function( evt )
                                                   {
                                                       var previewLink = jQuery( evt.target )
                                                       var tmp = previewLink.attr( 'href' ).split("/");
                                                       tmp.pop();
                                                       instance.currentContentObjectID = tmp.pop();
                                                       instance.open();
                                                       return false;
                                                  }).html( instance.linkText );
             jQuery( '#bookmark-view' ).click(function( evt )
                                              {
                                                  return instance._initFromContentViewLink( evt );
                                              }).html( instance.linkText );
             jQuery( '#menu-view' ).click(function( evt )
                                          {
                                              return instance._initFromContentViewLink( evt );
                                          }).html( instance.linkText );

         },

        _initFromContentViewLink:function( evt )
                                 {
                                     var previewLink = jQuery( evt.target );
                                     var tmp = previewLink.attr( 'href' ).split("/");
                                     this.currentNodeID = tmp.pop();
                                     this.open();
                                     return false;
                                 },

         open:function()
              {
                  var p = jQuery( this.dialogSelector );
                  p.dialog( 'option', 'position', 'center' );
                  p.dialog( 'option', 'width', jQuery(window).width() - (admin2ppPreviewDialog.WINDOW_PADDING_LEFT * 2) );
                  p.dialog( 'option', 'height', jQuery(window).height() - (admin2ppPreviewDialog.WINDOW_PADDING_TOP * 2) );
                  p.dialog( 'open' );
                  window.ezpopmenu_hideAll();
              },

        setIFrameHeight:function()
                        {
                            var p = jQuery( '#preview-dialog' );
                            var f = jQuery( this.dialogSelector + ' fieldset' );
                            var t = jQuery( this.dialogSelector + ' .tools' );
                            var ifr = jQuery( this.dialogSelector + ' iframe' );
                            ifr.css( 'height', p.innerHeight() - f.outerHeight() - t.outerHeight() - admin2ppPreviewDialog.IFRAME_OFFSET );
                        }

}



