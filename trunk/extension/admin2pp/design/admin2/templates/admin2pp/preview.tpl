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
var admin2ppPreviewWidth  = {cond( $width|ne(''), $width, ezini( 'PreviewSettings', 'PreviewWidth', 'admin2pp.ini',, true() ) )};
var admin2ppPreviewHeight = {cond( $height|ne(''), $height, ezini( 'PreviewSettings', 'PreviewHeight', 'admin2pp.ini',, true() ) )};
{undef $width $height}
</script>
