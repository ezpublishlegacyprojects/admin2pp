{*
 * $Id$
 * $HeadURL$
 *}
<script type="text/javascript">
jQuery(window).load(function(){* when everything is loaded we can start preloading components *}
{ldelim}

{def $yui_modules = array( 'datatable', 'button', 'container', 'cookie' )}
    var options = [];
    {if ezini( 'ExtensionSettings', 'ActiveExtensions' )|contain( 'ezoe' )}

    YUILoader.addModule({ldelim}name: 'tinymce_jquery',
                         type: 'js',
                         fullpath: {"javascript/tiny_mce_jquery.js"|ezdesign( 'quote' )}{rdelim});
    {set $yui_modules = $yui_modules|append( 'tinymce_jquery' )}
    {/if}

    YUILoader.require([{foreach $yui_modules as $module}{delimiter}, {/delimiter}'{$module}'{/foreach}]);
    YUILoader.insert(options, 'js');
{undef $yui_modules}

{def $icon_info = icon_info('class')
     $class_icons_size = ezini( 'TreeMenu', 'ClassIconsSize', 'contentstructuremenu.ini' )
     $images_list = ezini( 'PreloadSettings', 'Images', 'admin2pp.ini' )
     $translation_list = fetch( 'content', 'translation_list' )
     $non_standard_images = ezini( 'PreloadSettings', 'NonStandardImages', 'admin2pp.ini' )}

    var wwwDirPrefixIcon = "{ezsys('wwwdir')}/{$icon_info.theme_path}/{$icon_info.size_path_list[$class_icons_size]}/";
    var wwwDirPrefixNormal = "{ezsys('wwwdir')}/{$icon_info.theme_path}/{$icon_info.size_path_list['normal']}/";
    var iconsList = [];

    {foreach $translation_list as $locale}{*
        *}iconsList.push("{$locale.locale_code|flag_icon}");
    {/foreach}

    {foreach $images_list as $img}{*
        *}iconsList.push({$img|ezimage()});
    {/foreach}

    iconsList.push(wwwDirPrefixIcon + "{$icon_info.default}");
    iconsList.push(wwwDirPrefixNormal + "{$icon_info.default}");
    
    {foreach $icon_info.icons as $class => $icon}{*
        *}iconsList.push(wwwDirPrefixIcon + "{$icon}");
    iconsList.push(wwwDirPrefixNormal + "{$icon}");
    {/foreach}

    {foreach $non_standard_images as $img}{*
        *}iconsList.push({$img|ezdesign()});
    {/foreach}

    ezjslib_preloadImageList( iconsList );
{undef $icon_info $class_icons_size $images_list $translation_list $non_standard_images}
{rdelim});
</script>
