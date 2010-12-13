{*
 * $Id$
 * $HeadURL$
 *}
<div id="preview-dialog" style="display:none;" title="{'Loading preview...'|i18n( 'admin2pp/preview' )}">
    <p class="loader"><img src={'admin2pp-loader.gif'|ezimage()} alt="{'Loading...'|i18n( 'admin2pp/preview' )}" /></p>
    <p class="error"></p>
</div>
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}
    var previewDialog = new admin2ppPreviewDialog( '#preview-dialog' );
    previewDialog.errorText = "{'An error occured'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.linkText = "{'Preview'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.init();
{rdelim});
</script>
