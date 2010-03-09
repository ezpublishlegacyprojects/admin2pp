{*
 * $Id$
 * $HeadURL$
 *}
{def $feed_url = ezpreference( concat( $block.full_identifier, '_feed_url' ) )
     $hash = $block.full_identifier|md5}
<h2>{'Feed reader'|i18n( 'admin2pp/dashboard/feedreader' )}
<a href="#" class="ui-dialog-titlebar-wrench ui-corner-all"><span class="ui-icon ui-icon-wrench">{'Refresh'|i18n( 'admin2pp/dashboard/feedreader' )}</span></a>
{if $feed_url|ne( '' )}
<a href="#" class="ui-dialog-titlebar-refresh ui-corner-all"><span class="ui-icon ui-icon-refresh">{'Configure'|i18n( 'admin2pp/dashboard/feedreader' )}</span></a>
{/if}
</h2>
{if $feed_url|eq( '' )}
    <p><em>{'This feed reader is not configured.'|i18n( 'admin2pp/dashboard/feedreader' )}</em></p>
    <p><input type="submit" class="defaultbutton" value="{'Configure this feed reader'|i18n( 'admin2pp/dashboard/feedreader' )}" /></p>
{else}
<p class="waiting">{'Please wait while parsing the feed'|i18n( 'admin2pp/dashboard/feedreader' )} <a href="{$feed_url|wash}">{$feed_url|wash}</a>
<img src={'admin2pp-loader.gif'|ezimage} alt="{'Loading...'|i18n( 'admin2pp/dashboard/feedreader' )}" />
</p>
<div id="content_{$block.full_identifier}" class="feed-reader-result"></div>
{/if}
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}
var fr{$hash} = new admin2ppDashboardFeedReader( "{$block.full_identifier|wash( javascript )}" );
fr{$hash}.init();

{rdelim});
</script>
{undef $feed_url}
