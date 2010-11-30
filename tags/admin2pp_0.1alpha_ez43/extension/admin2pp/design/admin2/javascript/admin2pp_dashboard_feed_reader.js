/**
 * $Id$
 * $HeadURL$
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
admin2ppDashboardFeedReader.BLOCK_ID_PREFIX = "admin2pp_db_";

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
             jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).click( function()
                                                                                                      {
                                                                                                          instance.wait();
                                                                                                          instance.loadResult( 1 );
                                                                                                      } );
         },
    initSettings:function( initDialog )
                 {
                     var instance = this;
                     jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-wrench' ).click( function()
                                                                                                             {
                                                                                                                 instance.showSettings(); 
                                                                                                             } );
                     jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + instance.fullIdentifier + ' input.settings' ).click( function()
                                                                                                              {
                                                                                                                  instance.showSettings(); 
                                                                                                              } );

                     if ( initDialog )
                     {
                         jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID ).dialog( { modal: true,
                                                                                                  height:150,
                                                                                                  autoOpen: false,
                                                                                                  width:400 } );
                         jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' form' ).submit( function()
                                                                                                          {
                                                                                                              return instance.storeSettings(); 
                                                                                                          } );

                         jQuery( '#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID ).blur( function()
                                                                                             {
                                                                                                instance.highlightSettingsButton();
                                                                                             } );

                     }
                 },

    highlightSettingsButton:function()
                            {
                                jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' input[type=submit]' ).addClass( 'defaultbutton' ); 
                            },

    removeHighlightSettingsButton:function()
                            {
                                jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID + ' input[type=submit]' ).removeClass( 'defaultbutton' ); 
                            },

    initSettingsForm:function()
                     {
                         jQuery( '#' + admin2ppDashboardFeedReader.FEED_ID_INPUT_ID ).val( this.fullIdentifier );
                         jQuery( '#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID ).val( this.feedURL );
                     },

    openSettings:function()
                 {
                     jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID ).dialog( 'open' );
                 },

    closeSettings:function()
                  {
                      jQuery( '#' + admin2ppDashboardFeedReader.SETTINGS_WINDOW_ID ).dialog( 'close' );
                  },


    showSettings:function()
                 {
                     this.initSettingsForm();
                     this.removeHighlightSettingsButton();
                     this.openSettings();
                 },

    storeSettings:function()
                  {
                      var feedURL = jQuery( '#' + admin2ppDashboardFeedReader.FEED_URL_INPUT_ID ).val();
                      this.feedURL = feedURL;
                      this.storeParse();
                      this.closeSettings();
                      return false;
                  },
    hideNotConfiguredMessage:function()
                             {
                                 jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' div.not-configured' ).hide(); 
                             },

    showNotConfiguredMessage:function()
                             {
                                 jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' div.not-configured' ).show(); 
                             },

    resetContent:function()
                 {
                     jQuery( '#content_' + this.fullIdentifier ).html( '' ); 
                 },

    showLoader:function()
               {
                   jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' p.waiting' ).show();
               },

    hideLoader:function()
               {
                   jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' p.waiting' ).hide();
               },



    wait:function()
         {
             this.hideNotConfiguredMessage();
             this.resetContent();
             this.showLoader();
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
                      this.hideLoader();
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
                       this.hideLoader();
                       jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).hide();
                       this.showNotConfiguredMessage();
                   }
                   else
                   {
                       jQuery( '#' + admin2ppDashboardFeedReader.BLOCK_ID_PREFIX + this.fullIdentifier + ' a.ui-dialog-titlebar-refresh' ).show();
                   }
               }
}
