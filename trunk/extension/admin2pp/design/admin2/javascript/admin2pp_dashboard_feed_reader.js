/**
 * $Id$
 * $HeadURL$
 *
 */

function admin2ppDashboardFeedReader( fullIdentifier )
{
    this.fullIdentifier = fullIdentifier;
}

admin2ppDashboardFeedReader.REFRESH_ID = "admin2pp-fr-refresh";

admin2ppDashboardFeedReader.prototype =
{
    init:function()
         {
             var instance = this;
             var content = jQuery( '#content_' + this.fullIdentifier );
             if ( content.size() == 1 && content.html() == '' )
             {
                 this.loadResult();
             }
             jQuery( '#admin2pp_db_' + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).click( function()
                                                                                                      {
                                                                                                          instance.wait();
                                                                                                          instance.loadResult( 1 );
                                                                                                      } );
         },

    wait:function()
         {
             jQuery( '#content_' + this.fullIdentifier ).html( '' ); 
             jQuery( '#admin2pp_db_' + this.fullIdentifier + ' p.waiting' ).show();
         },

    loadResult:function( force )
               {
                   var u = 'admin2ppajax::parse::' + this.fullIdentifier;
                   var instance = this;
                   if ( force )
                       u += '::1';
                   jQuery.ez( u,
                              false,
                              function( data )
                              {
                                  if ( data.content )
                                  {
                                      jQuery( '#content_' + instance.fullIdentifier ).html( data.content ); 
                                      jQuery( '#admin2pp_db_' + instance.fullIdentifier + ' p.waiting' ).hide();
                                  }
                              } );
               }

}
