{*
 * $Id$
 * $HeadURL$
 *}
<script type="text/javascript">
{def $pref_name = 'admin2pp_object_info_height'
     $height = ezpreference( $pref_name )}

jQuery(document).ready(function()
{ldelim}

var resize = new admin2ppObjectInfoResizable( "{$pref_name|wash( javascript )}", "{$height}" );
resize.init();

{rdelim});
{undef $pref_name $height}

</script>

