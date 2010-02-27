/**
 * $Id$
 * $HeadURL$
 *
 */

var admin2ppPreviewCurrentNodeID = 0;
var admin2ppPreviewDefaultTitle = "";
var admin2ppPreviewDefaultContent = "";

jQuery(document).ready(function()
{
    jQuery( '#preview-dialog' ).dialog( { autoOpen: false,
                                          open: function( evt, ui )
                                                {
                                                    jQuery.ez( 'admin2ppajax::preview::' + admin2ppPreviewCurrentNodeID,
                                                               false,
                                                               function( data )
                                                               {
                                                                   var d = jQuery( '#preview-dialog' );
                                                                   var t = jQuery( '#ui-dialog-title-preview-dialog' );
                                                                   if ( data.content )
                                                                   {
                                                                       var content = jQuery.parseJSON( data.content );
                                                                       admin2ppPreviewDefaultTitle   = t.html();
                                                                       admin2ppPreviewDefaultContent = d.html();
                                                                       t.html( content.title );
                                                                       d.html( content.preview );
                                                                   }
                                                                  
                                                               })
                                                },
                                          close: function( evt, ui )
                                                 {
                                                     var d = jQuery( '#preview-dialog' );
                                                     var t = jQuery( '#ui-dialog-title-preview-dialog' );
                                                     d.html( admin2ppPreviewDefaultContent );
                                                     t.html( admin2ppPreviewDefaultTitle );
                                                 },
                                          resizeStop: function( evt, ui )
                                                      {
                                                          var width = ui.size.width, height = ui.size.height;
                                                          admin2ppPreviewWidth = width;
                                                          admin2ppPreviewHeight = height;
                                                          var url = jQuery.ez.url.replace( 'ezjscore/', 'user/preferences/' ) + 'set_and_exit/admin2pp_preview_width/' + width;
                                                          jQuery.post( url, {}, function(){} );
                                                          var url = jQuery.ez.url.replace( 'ezjscore/', 'user/preferences/' ) + 'set_and_exit/admin2pp_preview_height/' + height;
                                                          jQuery.post( url, {}, function(){} );
                                                      }
                                        } );
    jQuery( '#menu-view' ).click(function( evt )
                                 {
                                     var p = jQuery( '#preview-dialog' ), previewLink = jQuery(evt.target)
                                     admin2ppPreviewCurrentNodeID = previewLink.attr( 'href' ).split("/").pop();
                                     var linkNode = jQuery('#n' + admin2ppPreviewCurrentNodeID + ' a.image-text' );
                                     var linkOffset = linkNode.offset(), linkWidth = linkNode.outerWidth();
                                     window.ezpopmenu_hideAll();
                                     p.dialog( 'option', 'position', [linkOffset.left + linkWidth + 5 , linkOffset.top - 5 - jQuery(document).scrollTop()] );
                                     p.dialog( 'option', 'width', admin2ppPreviewWidth );
                                     p.dialog( 'option', 'height', admin2ppPreviewHeight );
                                     p.dialog( 'open' );
                                     return false;
                                 });

});
