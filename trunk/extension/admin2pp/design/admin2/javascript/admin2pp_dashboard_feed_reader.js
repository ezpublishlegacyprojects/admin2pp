/**
 * $Id$
 * $HeadURL$
 *
 * @todo : refactoring
 *
 */

function admin2ppDashboardFeedReader( fullIdentifier, feedURL )
{
    this.fullIdentifier = fullIdentifier;
    this.feedURL = feedURL;
}

admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID = "feed-reader-settings";
admin2ppDashboardFeedReader.FEED_ID_INPUT_ID   = "fr-feed-id";
admin2ppDashboardFeedReader.FEED_URL_INPUT_ID  = "fr-feed-url";

admin2ppDashboardFeedReader.showSettings = function( frID, url )
{
    jQuery( '#' + admin2ppDashboardFeedReader.FEED_ID_INPUT_ID ).val( frID );
    jQuery( '#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID ).val( url );
    jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' input[type=submit]' ).removeClass( 'defaultbutton' ); 
    jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID ).dialog( 'open' );
};

admin2ppDashboardFeedReader.storeSettings = function( instance )
{
    var feedID = jQuery( '#' + admin2ppDashboardFeedReader.FEED_ID_INPUT_ID ).val();
    var feedURL = jQuery( '#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID ).val();
    var instance = new admin2ppDashboardFeedReader( feedID, feedURL );
    instance.storeParse();
    jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID ).dialog( 'close' );
    return false;
};

admin2ppDashboardFeedReader.prototype =
{
    init:function()
         {
             var instance = this;
             var content = jQuery( '#content_' + this.fullIdentifier );
             if ( content.size() == 1 && content.css( 'display' ) != 'none' )
             {
                 this.loadResult();
             }
             jQuery( '#admin2pp_db_' + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).click( function()
                                                                                                      {
                                                                                                          instance.wait();
                                                                                                          instance.loadResult( 1 );
                                                                                                      } );
         },
    initSettings:function( initDialog )
                 {
                     var instance = this;
                     jQuery( '#admin2pp_db_' + this.fullIdentifier + ' a.ui-dialog-titlebar-wrench' ).click( function()
                                                                                                             {
                                                                                                                 admin2ppDashboardFeedReader.showSettings( instance.fullIdentifier, instance.feedURL ); 
                                                                                                             } );
                     jQuery( '#admin2pp_db_' + instance.fullIdentifier + ' input.settings' ).click( function()
                                                                                                              {
                                                                                                                  admin2ppDashboardFeedReader.showSettings( instance.fullIdentifier, instance.feedURL ); 
                                                                                                              } );

                     if ( initDialog )
                     {
                         jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID ).dialog( { modal: true,
                                                                                                  height:150,
                                                                                                  autoOpen: false,
                                                                                                  width:400 } );
                         jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' form' ).submit( function()
                                                                                                          {
                                                                                                              return admin2ppDashboardFeedReader.storeSettings(); 
                                                                                                          } );

                         jQuery( '#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID ).blur( function()
                                                                                             {
                                                                                                 jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' input[type=submit]' ).addClass( 'defaultbutton' ); 
                                                                                             } );

                     }
                 },

    wait:function()
         {
             jQuery( '#admin2pp_db_' + this.fullIdentifier + ' div.not-configured' ).hide(); 
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
                                      instance.displayResult( data.content ); 
                                  }
                              } );
               },
    displayResult:function( content )
                  {
                      jQuery( '#content_' + this.fullIdentifier ).html( content ).show();
                      jQuery( '#admin2pp_db_' + this.fullIdentifier + ' p.waiting' ).hide();
                  },

    storeParse:function()
               {
                   var instance = this;
                   this.wait();
                   jQuery.ez( 'admin2ppajax::storeparse::' + instance.fullIdentifier,
                               { FeedURL:instance.feedURL },
                               function( data )
                               {
                                   if ( data.content )
                                   {
                                       instance.displayResult( data.content ); 
                                   }
                               } );
                   if ( this.feedURL == '' )
                   {
                       jQuery( '#admin2pp_db_' + this.fullIdentifier + ' p.waiting' ).hide();
                       jQuery( '#admin2pp_db_' + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).hide();
                       jQuery( '#admin2pp_db_' + this.fullIdentifier + ' div.not-configured' ).show(); 
                   }
                   else
                   {
                       jQuery( '#admin2pp_db_' + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).show();
                   }
               }
}
