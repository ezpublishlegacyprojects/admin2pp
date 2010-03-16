{*
 * $Id$
 * $HeadURL$
 *}
<h2>{'System infos'|i18n( 'admin2pp/dashboard/sysinfo' )}
<a href="#" class="ui-dialog-titlebar-refresh ui-corner-all" id="admin2pp-refresh-sysinfo"><span class="ui-icon ui-icon-refresh">{'Refresh'|i18n( 'admin2pp/dashboard/sysinfo' )}</span></a></h2>
<div id="admin2pp-sysinfo">
{include uri="design:admin2ppajax/sysinfo.tpl"}
</div>
<p class="waiting">
<img src={'admin2pp-loader.gif'|ezimage} alt="{'Loading...'|i18n( 'admin2pp/dashboard/sysinfo' )}" />
</p>
<script type="text/javascript">
{literal}
jQuery(document).ready(function()
{
    jQuery( '#admin2pp-refresh-sysinfo' ).click(function()
    {
        jQuery( '#admin2pp-sysinfo' ).html( '' );
        jQuery( '#admin2pp_db_sysinfo p.waiting' ).show();
        jQuery.ez( 'admin2ppajax::sysinfo',
                   false,
                   function( data )
                   {
                       if ( data.content )
                       {
                           jQuery( '#admin2pp_db_sysinfo p.waiting' ).hide();
                           jQuery( '#admin2pp-sysinfo' ).html( data.content ); 
                       }
                   } );
    });
});
{/literal}
</script>
