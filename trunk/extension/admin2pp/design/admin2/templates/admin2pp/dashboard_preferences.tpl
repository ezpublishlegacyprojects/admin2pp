{*
 * $Id$
 * $HeadURL$
 *}
{if is_set( $blocks )}{* display this part, only on the dashboard *}
<div id="dashboard-blocks">
{* DESIGN: Header START *}<div class="box-header"><div class="box-ml">
<h4>{'Dashboard preferences'|i18n( 'admin2pp/dashboard' )}</h4>
{* DESIGN: Header END *}</div></div>

{* DESIGN: Content START *}<div class="box-bc"><div class="box-ml"><div class="box-content">

<div id="dashboard-preferences">

    <form action={'user/preferences/set/admin2pp_dashboard_blocks'|ezurl()} method="post">
        <p><input type="submit" class="button" name="ResetDashboardButton" value="{'Restore original dashboard'|i18n( 'admin2pp/dashboard' )}" /></p>
    </form>

</div>

{* DESIGN: Content END *}</div></div></div>
</div>
{/if}
