{*
 * $Id$
 * $HeadURL$
 *}
{if is_set( $blocks )}
<div id="admin2pp-db-window" style="display:none;" title="{'Dashboard settings'|i18n( 'admin2pp/dashboard' )}">
    <form action={'user/preferences/set/admin2pp_dashboard_blocks/'|ezurl()} method="post">
        <h3>{'Available dashboard blocks'|i18n( 'admin2pp/dashboard' )}</h3>
        <ul class="settings-dashboard">
        {def $available_blocks = fetch( 'admin2pp', 'dashboard_blocks', hash( 'active_only', false() ) )
             $blocks_name = ezini( 'DashboardSettings', 'BlockNames', 'admin2pp.ini' )
             $all_active = true()}
            {foreach $available_blocks as $block}
                {if $block.identifier}
                {set $all_active = and( $all_active, $block.active )}
                <li {cond( $block.active, ' class="active"', '' )} id="admin2pp_db_choice_{$block.identifier}">
                    <input type="checkbox"{cond( $block.multiple, ' class="multiple-block"', '' )} name="DashboardBlocks[]" id="admin2pp_db_choose_{$block.identifier}" value="{$block.identifier}"{cond( $block.active, ' disabled="disabled"', '' )} />
                    <label for="admin2pp_db_choose_{$block.identifier}">{$blocks_name[$block.identifier]|d18n( 'admin2pp/dashboard' )}</label>
                </li>
                {/if}
            {/foreach}
        </ul>
        <div id="admin2pp_all_choosen"{cond( $all_active|not(), ' style="display:none;"', '' )}>
            <div class="ui-state-highlight ui-corner-all"> 
                <p>
                    <span style="float: left; margin-right: 0.3em;" class="ui-icon ui-icon-info"></span>
                    {'All available blocks are already in your dashboard'|i18n( 'admin2pp/dashboard' )}
                </p>
            </div>
        </div>

        <p class="button-bar"{cond( $all_active, ' style="display:none;"', '' )}>
            <input type="submit" class="button" id="admin2pp-db-save-button" name="SaveChangeButton" value="{'Add checked items'|i18n( 'admin2pp/dashboard' )}" />
        </p>
        {undef $available_blocks $blocks_name $all_active}
    </form>
</div>
{/if}
