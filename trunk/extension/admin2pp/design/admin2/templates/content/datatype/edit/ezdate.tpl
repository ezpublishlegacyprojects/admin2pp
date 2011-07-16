{*
 * $Id$
 * $HeadURL$
 *}
{default attribute_base=ContentObjectAttribute}
<div class="block">
<div class="date">

{if ne( $attribute_base, 'ContentObjectAttribute' )}
    {def $id_base = concat( 'ezcoa-', $attribute_base, '-', $attribute.contentclassattribute_id, '_', $attribute.contentclass_attribute_identifier )}
{else}
    {def $id_base = concat( 'ezcoa-', $attribute.contentclassattribute_id, '_', $attribute.contentclass_attribute_identifier )}
{/if}

<div class="element">
<label for="{$id_base}_year">{'Year'|i18n( 'design/admin/content/datatype' )}:</label>
<input id="{$id_base}_year" class="ezcc-{$attribute.object.content_class.identifier} ezcca-{$attribute.object.content_class.identifier}_{$attribute.contentclass_attribute_identifier}" type="text" name="{$attribute_base}_date_year_{$attribute.id}" size="5" value="{if $attribute.content.is_valid}{$attribute.content.year}{/if}" />
</div>

<div class="element">
<label for="{$id_base}_month">{'Month'|i18n( 'design/admin/content/datatype' )}:</label>
<input id="{$id_base}_month" class="ezcc-{$attribute.object.content_class.identifier} ezcca-{$attribute.object.content_class.identifier}_{$attribute.contentclass_attribute_identifier}" type="text" name="{$attribute_base}_date_month_{$attribute.id}" size="3" value="{if $attribute.content.is_valid}{$attribute.content.month}{/if}" />
</div>

<div class="element">
<label for="{$id_base}_day">{'Day'|i18n( 'design/admin/content/datatype' )}:</label>
<input id="{$id_base}_day" class="ezcc-{$attribute.object.content_class.identifier} ezcca-{$attribute.object.content_class.identifier}_{$attribute.contentclass_attribute_identifier}" type="text" name="{$attribute_base}_date_day_{$attribute.id}" size="3" value="{if $attribute.content.is_valid}{$attribute.content.day}{/if}" />
</div>
{include uri="design:admin2pp/calendar.tpl"}
<div class="break"></div>
</div>
</div>
{/default}
