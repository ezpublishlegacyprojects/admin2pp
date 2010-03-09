{*
 * $Id$
 * $HeadURL$
 *}
{def $feed_url = ezpreference( concat( $block.full_identifier, '_feed_url' ) )}
<h2>{'Feed reader'|i18n( 'admin2pp/dashboard/feedreader' )}<a href="#" class="ui-dialog-titlebar-close ui-corner-all"><span class="ui-icon ui-icon-wrench">{'Refresh'|i18n( 'admin2pp/dashboard/feedreader' )}</span></a><a href="#" class="ui-dialog-titlebar-close ui-corner-all"><span class="ui-icon ui-icon-refresh">close</span></a></h2>
{if $feed_url|eq( '' )}
    <p><em>{'This feed reader is not configured.'|i18n( 'admin2pp/dashboard/feedreader' )}</em></p>
    <p><input type="submit" class="defaultbutton" value="{'Configure this feed reader'|i18n( 'admin2pp/dashboard/feedreader' )}" /></p>
{else}
<p class="waiting">{'Please wait while parsing the feed'|i18n( 'admin2pp/dashboard/feedreader' )} <a href="{$feed_url|wash}">{$feed_url|wash}</a>
<img src={'admin2pp-loader.gif'|ezimage} alt="{'Loading...'|i18n( 'admin2pp/dashboard/feedreader' )}" />
</p>
<div id="content_{$block.full_identifier}" class="feed-reader-result"></div>
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}
    if ( jQuery( '#content_{$block.full_identifier}' ).html() == '' ) {* avoid AJAX reloading with dropping a feed reader block *}
    {ldelim}
        jQuery.ez( 'admin2ppajax::parse::{$block.full_identifier}',
                   false,
                   function( data )
                   {ldelim}
                       if ( data.content )
                       {ldelim}
                           jQuery( '#content_{$block.full_identifier}' ).html( data.content ); 
                           jQuery( '#admin2pp_db_{$block.full_identifier} p.waiting' ).hide();
                       {rdelim}
                   {rdelim} );
    {rdelim}
{rdelim});
</script>
{/if}
