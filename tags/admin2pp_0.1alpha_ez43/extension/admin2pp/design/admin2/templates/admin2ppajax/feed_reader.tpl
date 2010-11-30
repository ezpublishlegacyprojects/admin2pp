{*
 *  $Id$
 * $HeadURL$
 *}
{if $error|is_set}
    <div class="ui-state-error ui-corner-all" style="margin:1em 4em;">
        <p>
        <span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>
        {$error|wash}
        </p>
    </div>
{else}
    <h3>{$feed.title.text|wash()}</h3>
    <ul>
    {foreach $feed.item as $item max ezini( 'DashboardBlock_feed_reader', 'NumberOfItems', 'dashboard.ini' )}
        <li><a href="{$item.link.0.href|wash}">{$item.title.text|wash}</a></li>
    {/foreach}
    </ul>
{/if}
