{*
 * $Id$
 * $HeadURL$
 *}
{def $sysinfo = fetch( 'admin2pp', 'system_infos' )}
<dl>
{foreach $sysinfo as $name => $value}
    <dt>{$name|i18n( 'admin2pp/dashboard/sysinfo' )}</dt>
    <dd>
        {if $value|is_array()}
        <pre>{$value|implode( "\n" )}</pre>
        {else}
            <div class="ui-state-error ui-corner-all" style="margin:1em 4em;">
                <p>
                <span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-alert"></span>
                {$value|wash}
                </p>
            </div>
        {/if}
    </dd>
{/foreach}
</dl>
{undef $sysinfo}
