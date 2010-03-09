{*
 *  $Id$
 * $HeadURL$
 *}
<h3>{$feed.title.text|wash()}</h3>
{if $error|is_set}
    <div class="ui-widget ui-state-error ui-corner-all">{$error|wash}</div>
{else}
    <ul>
    {foreach $feed.item as $item max ezini( 'DashboardBlock_feed_reader', 'NumberOfItems', 'dashboard.ini' )}
        <li><a href="{$item.link.0.href|wash}">{$item.title.text|wash}</a></li>
    {/foreach}
    </ul>
{/if}
