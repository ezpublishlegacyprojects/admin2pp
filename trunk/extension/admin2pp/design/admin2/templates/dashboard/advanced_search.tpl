{*
 * $Id$
 * $HeadURL$
 *}

{cache-block keys=array( 'advanced search', 'dashboard' ) ignore_content_expiry}
<h2>{'Advanced search form'|i18n( 'admin2pp/dashboard/advancedsearch' )}</h2>

<form action={'/content/advancedsearch/'|ezurl} method="get" class="dashboard-advanced-search">

<div class="line phrase">
    <div class="semi">
        <label for="ezcontent_advancesearch_search_text">{'Search for all of the following words'|i18n( 'design/admin/content/search' )}:</label>
        <input id="ezcontent_advancesearch_search_text" type="text" size="20" name="SearchText" value="" />
    </div>

    <div class="semi">
        <label for="ezcontent_advancesearch_phrasesearch_text">{'Search for an exact phrase'|i18n( 'design/admin/content/search' )}:</label>
        <input id="ezcontent_advancesearch_phrasesearch_text" type="text" size="20" name="PhraseSearchText" value="" />
    </div>
</div>
{def $class_list = fetch( 'class', 'list', hash( 'sort_by', array( 'name', true() ) ) )}
<div class="line">
    <div class="semi">
        <label for="ezcontent_advancesearch_class_id">{'Class'|i18n( 'design/admin/content/search' )}</label>
        <select id="ezcontent_advancesearch_class_id" name="SearchContentClassID">
            <option value="-1">{'Any class'|i18n( 'design/admin/content/search' )}</option>
            {foreach $class_list as $class}
            <option value="{$class.id}">{$class.name|wash()}</option>
            {/foreach}
        </select>
    </div>
    <div class="semi inactive">
        <label for="ezcontent_advancesearch_class_attribute_id">{'Class attribute'|i18n( 'design/admin/content/search' )}:</label>
        <select id="ezcontent_advancesearch_class_attribute_id" name="SearchContentClassAttributeID" disabled="disabled">
            <option value="-1">{'Any attribute'|i18n( 'design/admin/content/search' )}</option>
        </select>
        <img src={'admin2pp-loader-small.gif'|ezimage} id="admin2pp-attribute-loader" alt="{'Loading...'|i18n( 'admin2pp/dashboard' )}" style="display:none;" />
    </div>
</div>
{undef $class_list}


{def $section_list = fetch( 'content', 'section_list' )}
<div class="line">
    <div class="semi">
        <label for="ezcontent_advancesearch_section_id">{'In'|i18n( 'design/admin/content/search' )}:</label>
        <select id="ezcontent_advancesearch_section_id" name="SearchSectionID">
            <option value="-1">{'Any section'|i18n( 'design/admin/content/search' )}</option>
            {foreach $section_list as $section}
            <option value="{$section.id}">{$section.name|wash()}</option>
            {/foreach}
        </select>
    </div>
    <div class="semi">
        <label for="ezcontent_advancesearch_date">{"Published"|i18n( 'design/admin/content/search' )}:</label>
        <select id="ezcontent_advancesearch_date" name="SearchDate">
            <option value="-1" {if eq( $search_date, -1 )}selected="selected"{/if}>{'Any time'|i18n( 'design/admin/content/search' )}</option>
            <option value="1"  {if eq( $search_date,  1 )}selected="selected"{/if}>{'Last day'|i18n( 'design/admin/content/search' )}</option>
            <option value="2"  {if eq( $search_date,  2 )}selected="selected"{/if}>{'Last week'|i18n( 'design/admin/content/search' )}</option>
            <option value="3"  {if eq( $search_date,  3 )}selected="selected"{/if}>{'Last month'|i18n( 'design/admin/content/search' )}</option>
            <option value="4"  {if eq( $search_date,  4 )}selected="selected"{/if}>{'Last three months'|i18n( 'design/admin/content/search' )}</option>
            <option value="5"  {if eq( $search_date,  5 )}selected="selected"{/if}>{'Last year'|i18n( 'design/admin/content/search' )}</option>
        </select>
    </div>
</div>
{undef $section_list}
<div class="line button-bar">
    <input class="button" type="submit" name="SearchButton" value="{'Search'|i18n( 'design/admin/content/search' )}" />
</div>

</form>
<script type="text/javascript">
{literal}
jQuery( '#ezcontent_advancesearch_class_id' ).change(function()
{
    var classSelect = jQuery( this );
    var attrSelect = jQuery( '#ezcontent_advancesearch_class_attribute_id' );
    if ( classSelect.val() != "-1" )
    {
        jQuery( '#admin2pp-attribute-loader' ).toggle();
        jQuery.ez( 'admin2ppajax::attributes::' + classSelect.val(),
                   false,
                   function( data )
                   {
                        if ( !data.error_text && data.content )
                        {
                            var attrSelect = jQuery( '#ezcontent_advancesearch_class_attribute_id' );
                            attrSelect.append( data.content );
                            attrSelect.removeAttr( 'disabled' );
                            jQuery( '#admin2pp-attribute-loader' ).toggle();
                            attrSelect.parent().removeClass( 'inactive' );
                        }
                   });
    }
    else
    {
        attrSelect.parent().addClass( 'inactive' );
        attrSelect.attr( 'disabled', 'disabled' );
        attrSelect.find( 'option[value!="-1"]' ).remove();
    }
});
{/literal}
</script>
{/cache-block}
