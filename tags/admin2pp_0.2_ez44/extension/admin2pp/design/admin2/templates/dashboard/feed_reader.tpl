{*
 * $Id$
 * $HeadURL$
 *}
{def $feed_url = ezpreference( concat( $block.full_identifier, '_feed_url' ) )
     $hash = concat( currentdate(), $block.full_identifier )|md5}
<h2>{'Feed reader'|i18n( 'admin2pp/dashboard/feedreader' )}
<a href="#" class="ui-dialog-titlebar-wrench ui-corner-all"><span class="ui-icon ui-icon-wrench">{'Refresh'|i18n( 'admin2pp/dashboard/feedreader' )}</span></a>
<a href="#" class="ui-dialog-titlebar-refresh ui-corner-all"{cond( $feed_url|eq( '' ), ' style="display:none"', '' )}><span class="ui-icon ui-icon-refresh">{'Configure'|i18n( 'admin2pp/dashboard/feedreader' )}</span></a></h2>
<div class="not-configured"{cond( $feed_url|ne( '' ), ' style="display:none;"', '' )}>
    <p><em>{'This feed reader is not configured.'|i18n( 'admin2pp/dashboard/feedreader' )}</em></p>
    <p><input type="submit" class="defaultbutton settings" value="{'Configure this feed reader'|i18n( 'admin2pp/dashboard/feedreader' )}" /></p>
</div>
<p class="waiting"{cond( $feed_url|eq( '' ), ' style="display:none;"', '' )}>
<img src={'admin2pp-loader.gif'|ezimage} alt="{'Loading...'|i18n( 'admin2pp/dashboard/feedreader' )}" />
</p>
<div id="content_{$block.full_identifier}" class="feed-reader-result"{cond( $feed_url|eq( '' ), ' style="display:none;"', '' )}></div>
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}

var fr{$hash} = new admin2ppDashboardFeedReader( "{$block.full_identifier|wash( javascript )}", "{$feed_url|wash( javascript )}" );
fr{$hash}.init();
fr{$hash}.initSettings({run-once}true{/run-once});
{rdelim});
</script>
{run-once}
<div style="display:none" id="feed-reader-settings" title="{'Feed reader settings'|i18n( 'admin2pp/dashboard/feedreader' )}">
<form action={'user/preferences/set/'|ezurl} method="post">
    <p>
        <label for="fr-feed-url">{'Feed URL (RSS or ATOM):'|i18n( 'admin2pp/dashboard/feedreader' )}</label>
        <input type="text" class="box" id="fr-feed-url" name="FeedURL" value="" />
        <input type="hidden" id="fr-feed-id" name="FeedID" value="" />
    </p>
    <p class="button-bar">
        <input type="submit" class="button" name="SaveFeedURL" value="{'Save'|i18n( 'admin2pp/dashboard/feedreader' )}" />
    </p>
</form>
</div>
{/run-once}
{undef $feed_url $hash}
