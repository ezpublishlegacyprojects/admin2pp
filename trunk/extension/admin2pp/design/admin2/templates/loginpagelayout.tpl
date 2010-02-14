<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="{$site.http_equiv.Content-language|wash}" lang="{$site.http_equiv.Content-language|wash}">
{def $admin_theme = ezpreference( 'admin_theme' )}
<head>
{cache-block keys=array( $navigation_part.identifier, $module_result.navigation_part, $ui_context, $ui_component, $admin_theme )}{* Pr tab cache *}

{include uri='design:page_head.tpl'}


{include uri='design:page_head_style.tpl'}
{include uri='design:page_head_script.tpl'}

</head>

<body class="loginpage">

<div id="page" class="{$navigation_part.identifier} section_id_{first_set( $module_result.section_id, 0 )}">
<div id="header">
<div id="header-design" class="float-break">

</div>
</div>

{/cache-block}
<hr class="hide" />

<div id="columns">
<div id="maincolumn">

<div id="maincontent">
<div id="maincontent-design" class="float-break"><div id="fix">

{* Main area START *}

{include uri="design:page_mainarea.tpl"}

{* Main area END *}

</div>
<div class="break"></div>
</div></div>

<div class="break"></div>
</div>
</div>

<hr class="hide" />

<div id="footer">
<div id="footer-design">

{include uri="design:page_copyright.tpl"}

<div class="break"></div>
</div>
</div>

{* This comment will be replaced with actual debug report (if debug is on). *}
<!--DEBUG_REPORT-->
</div><!-- div id="page" -->

{if ezini( 'PreloadSettings', 'Preload', 'admin2pp.ini' )|eq( 'enabled' )}
<script type="text/javascript">
jQuery(window).load(function(){* when everything is loaded we can start preloading components *}
{ldelim}
{def $iconInfo = icon_info('class')
     $classIconsSize = ezini( 'TreeMenu', 'ClassIconsSize', 'contentstructuremenu.ini' )
     $images_list = ezini( 'PreloadSettings', 'Images', 'admin2pp.ini' )
     $translation_list = fetch( 'content', 'translation_list' )}

    var wwwDirPrefixIcon = "{ezsys('wwwdir')}/{$iconInfo.theme_path}/{$iconInfo.size_path_list[$classIconsSize]}/";
    var wwwDirPrefixNormal = "{ezsys('wwwdir')}/{$iconInfo.theme_path}/{$iconInfo.size_path_list['normal']}/";
    var iconsList = new Array();

    {foreach $translation_list as $locale}{*
        *}iconsList.push("{$locale.locale_code|flag_icon}");
    {/foreach}

    {foreach $images_list as $img}{*
        *}iconsList.push({$img|ezimage()});
    {/foreach}

    iconsList.push(wwwDirPrefixIcon + "{$iconInfo.default}");
    iconsList.push(wwwDirPrefixNormal + "{$iconInfo.default}");
    
    {foreach $iconInfo.icons as $class => $icon}{*
        *}iconsList.push(wwwDirPrefixIcon + "{$icon}");
    iconsList.push(wwwDirPrefixNormal + "{$icon}");
    {/foreach}

    ezjslib_preloadImageList( iconsList );
{rdelim});
</script>
{/if}
</body>
</html>
