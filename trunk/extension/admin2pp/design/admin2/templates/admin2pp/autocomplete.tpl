{*
 * $Id$
 * $HeadURL$
 *}
{def $var_name = concat( 'ac', $input_id|md5 )}
<script type="text/javascript">
jQuery(document).ready(function()

{ldelim}

    var {$var_name}= new admin2ppAutoComplete( "#{$input_id}", {ezini( 'KeywordAutocomplete', 'MinLengthStart', 'admin2pp.ini',, true() )} );
    {$var_name}.init();

{rdelim});
</script>
