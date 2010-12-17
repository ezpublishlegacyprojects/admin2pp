{*
 * $Id$
 * $HeadURL$
 *}
<script type="text/javascript">
jQuery(window).load(function(){* when everything is loaded we can start preloading components *}
{ldelim}

{def $yui_modules = ezini( 'PreloadSettings', 'YahooModules', 'admin2pp.ini' )}
    var options = [];
    {if ezini( 'ExtensionSettings', 'ActiveExtensions' )|contains( 'ezoe' )}

    {foreach ezini( 'PreloadSettings', 'OEJavaScriptFiles', 'admin2pp.ini' ) as $k => $oejs}

    {set $yui_modules = $yui_modules|append( concat( 'ezoe_js_', $k ) )}
    YUILoader.addModule({ldelim}name: 'ezoe_js_{$k}',
                         type: 'js',
                         fullpath: {$oejs|ezdesign( 'quote' )}{rdelim});

    {/foreach}

    {def $plugin_list = ezini('EditorSettings', 'Plugins', 'ezoe.ini',,true() )
         $ez_locale   = ezini( 'RegionalSettings', 'Locale', 'site.ini')
         $language    = '-'|concat( $ez_locale )
         $dependency_js_list   = array( 'ezoe::i18n::'|concat( $language ) )}
    {foreach $plugin_list as $plugin}
        {set $dependency_js_list = $dependency_js_list|append( concat( 'plugins/', $plugin|trim, '/editor_plugin.js' ))}
    {/foreach}

    {foreach ezscriptfiles( $dependency_js_list ) as $k => $dep}
    {set $yui_modules = $yui_modules|append( concat( 'ezoe_dependencies', $k ) )}

    YUILoader.addModule({ldelim}name: 'ezoe_dependencies{$k}',
                         type: 'js',
                         fullpath: '{$dep}'{rdelim});

    {/foreach}
    {undef $plugin_list $ez_locale $language $dependency_js_list}

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
