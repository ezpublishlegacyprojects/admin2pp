{*
 * $Id$
 * $HeadURL$
 *}
{if or( $multi_languages, $siteaccess_list|count()|gt( 1 ) )}
<fieldset>
    <legend>{'Preview options'|i18n( 'admin2pp/preview' )}</legend>
    <label for="preview-choose">{'Preview in'|i18n( 'admin2pp/preview' )}</label>
    <select name="LanguageSiteaccess" id="preview-choose">
    {def $locale_object = false()}
    {foreach $languages_siteaccess_map as $locale => $siteaccess_array}
        {set $locale_object = fetch( content, locale, hash( 'locale_code', $locale ) )}
        <optgroup label="{$locale_object.language_name|wash}">
        {foreach $siteaccess_array as $sa}
            <option value="{$locale},{$sa}"{cond( and( $sa|eq( $preview_settings.siteaccess,
                                                     $locale|eq( $preview_settings.locale ) ), ' selected="selected"', '' )}>{$sa|wash}</option>
        {/foreach}
        </optgroup>
    {/foreach}
    </select>
    {undef $locale_object}

    <input type="submit" class="button" id="preview-update" value="{'Update preview'|i18n( 'admin2pp/preview' )}" />
</fieldset>
{/if}
<iframe src={concat( "content/versionview/", $object.id,
                     "/", $preview_settings.version,
                     "/", $preview_settings.locale,
                     "/site_access/", $preview_settings.siteaccess )|ezurl}></iframe>
<div class="tools">
    <input type="submit" class="edit button{cond( $object.can_edit|not(), '-disabled" disabled="disabled', '')}" value="{'Edit'|i18n( 'admin2pp/preview' )}" />
    <input type="submit" class="move button{cond( $object.can_move|not(), '-disabled" disabled="disabled', '')}" value="{'Move'|i18n( 'admin2pp/preview' )}" />
    <input type="submit" class="copy button" value="{'Copy'|i18n( 'admin2pp/preview' )}" />
    <input type="submit" class="remove button{cond( $object.can_remove|not(), '-disabled" disabled="disabled', '')}" value="{'Remove'|i18n( 'admin2pp/preview' )}" />
</div>
