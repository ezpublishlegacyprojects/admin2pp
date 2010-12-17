{*
 * $Id$
 * $HeadURL$
 *}
{if is_set( $blocks )}{* display this part, only on the dashboard *}
<div id="admin2pp-db-settings" style="display:none">{* and if JS is enabled *}
{* DESIGN: Header START *}<div class="box-header"><div class="box-ml">
<h4>{'Dashboard preferences'|i18n( 'admin2pp/dashboard' )}</h4>
{* DESIGN: Header END *}</div></div>

{* DESIGN: Content START *}<div class="box-bc"><div class="box-ml"><div class="box-content">

<div id="dashboard-preferences">
    <p><a href={'content/dashboard'|ezurl()} id="admin2pp-db-load">{'Add dashboard blocks'|i18n( 'admin2pp/dashboard' )}&nbsp;&raquo;</a></p>
    <p><a href={'/user/preferences/set/admin2pp_dashboard_blocks/'|ezurl()}>{'Restore original dashboard'|i18n( 'admin2pp/dashboard' )}&nbsp;&raquo;</a></p>
</div>

{* DESIGN: Content END *}</div></div></div>
</div>
{/if}
