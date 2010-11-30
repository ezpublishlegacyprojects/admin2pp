{*
 * $Id$
 * $HeadURL$
 *}
<div id="preview-dialog" style="display:none;" title="{'Loading preview...'|i18n( 'admin2pp/preview' )}">
    <p class="loader"><img src={'admin2pp-loader.gif'|ezimage()} alt="{'Loading...'|i18n( 'admin2pp/preview' )}" /></p>
</div>
<script type="text/javascript">
{def $width  = ezpreference( 'admin2pp_preview_width' )
     $height = ezpreference( 'admin2pp_preview_height' )}
jQuery(document).ready(function()
{ldelim}
    var previewDialog = new admin2ppPreviewDialog( '#preview-dialog' );
    previewDialog.previewWidth = {cond( $width|ne(''), $width, ezini( 'PreviewSettings', 'PreviewWidth', 'admin2pp.ini',, true() ) )};
    previewDialog.previewHeight = {cond( $height|ne(''), $height, ezini( 'PreviewSettings', 'PreviewHeight', 'admin2pp.ini',, true() ) )};
    previewDialog.linkText = "{'Preview'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.editText = "{'Edit'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.removeText = "{'Remove'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.moveText = "{'Move'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.copyText = "{'Copy'|i18n( 'admin2pp/preview' )|wash( javascript )}";
    previewDialog.init();
{rdelim});
{undef $width $height}
</script>
