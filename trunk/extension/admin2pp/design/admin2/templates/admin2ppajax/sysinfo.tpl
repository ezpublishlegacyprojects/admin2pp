{*
 * $Id$
 * $HeadURL$
 *}
{def $sysinfo = fetch( 'admin2pp', 'system_infos' )}
{if $sysinfo|is_array()}
    <dl>
    {foreach $sysinfo as $name => $value}
        <dt>{$name|i18n( 'admin2pp/dashboard/sysinfo' )}</dt>
        <dd>
            <pre>{$value}</pre>
        </dd>
    {/foreach}
    </dl>
{else}
    <div class="ui-state-error ui-corner-all" style="margin:1em 4em;">
        <p>
        <span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>
        {$sysinfo|wash}
        </p>
    </div>
{/if}
{undef $sysinfo}
