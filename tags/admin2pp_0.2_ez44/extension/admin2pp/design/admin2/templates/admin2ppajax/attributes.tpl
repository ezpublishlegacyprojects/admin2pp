{*
 * $Id$
 * $HeadURL$
 *}
{foreach $attributes as $attribute}
{if $attribute.is_searchable}
<option value="{$attribute.id}">{$attribute.name|wash}</option>
{/if}
{/foreach}
