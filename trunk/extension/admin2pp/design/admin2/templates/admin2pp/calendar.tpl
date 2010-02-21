{*
 * $Id$
 * $HeadURL$
 *}
{def $locale = fetch( 'content', 'locale' )}
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}

    jQuery("#{$id_base}_day").datepicker({ldelim}showOn:'button',
                                         buttonText:"{'Calendar'|i18n( 'admin2pp/calendar' )|wash( 'javascript' )}",
                                         buttonImageOnly:false,
                                         showAnim:'fadeIn',
                                         minDate:new Date( 1970, 0, 1),
                                         maxDate:new Date( 2038, 0, 19),
                                         changeMonth:true,
                                         changeYear:true,
                                         nextText:"{'Next'|i18n( 'admin2pp/calendar' )|wash( 'javascript' )}",
                                         currentText:"{'Today'|i18n( 'admin2pp/calendar' )|wash( 'javascript' )}",
                                         prevText:"{'Previous'|i18n( 'admin2pp/calendar' )|wash( 'javascript' )}",
                                         dayNames:[{foreach $locale.weekday_name_list as $n}"{$n|wash( 'javascript' )}"{delimiter},{/delimiter}{/foreach}],
                                         dayNamesMin:[{foreach $locale.weekday_short_name_list as $n}"{$n|wash( 'javascript' )}"{delimiter},{/delimiter}{/foreach}],
                                         dayNamesShort:[{foreach $locale.weekday_short_name_list as $n}"{$n|wash( 'javascript' )}"{delimiter},{/delimiter}{/foreach}],
                                         monthNames:[{foreach $locale.month_name_list as $n}"{$n|wash( 'javascript' )}"{delimiter},{/delimiter}{/foreach}],
                                         monthNamesShort:[{foreach $locale.month_name_list as $n}"{$n|shorten( 3, '' )|wash( 'javascript' )}"{delimiter},{/delimiter}{/foreach}], {* using shorten() on long name due to http://issues.ez.no/16235 *}
                                         firstDay:{cond( $locale.is_monday_first, 0, 1 )},
                                         onSelect:function(textDate, picker)
                                                  {ldelim}

                                                    var tmp = textDate.split('/');
                                                    jQuery("#{$id_base}_day").val(tmp[1]);
                                                    jQuery("#{$id_base}_month").val(tmp[0]);
                                                    jQuery("#{$id_base}_year").val(tmp[2]);
                                                  {rdelim},
                                         beforeShow:function(input)
                                                    {ldelim}
                                                        
                                                        var d = new Date();
                                                        if ( jQuery("#{$id_base}_year").val() != "" &&
                                                                jQuery("#{$id_base}_month").val() != "" &&
                                                                jQuery("#{$id_base}_day").val() != "" )
                                                        {ldelim}

                                                            d = new Date( parseInt( jQuery("#{$id_base}_year").val() ),
                                                                          parseInt( jQuery("#{$id_base}_month").val().replace(/^0/, '') ) - 1,
                                                                          parseInt( jQuery("#{$id_base}_day").val().replace(/^0/, '') ) );
                                                        {rdelim}
                                                        return {ldelim}defaultDate:d{rdelim};
                                                    {rdelim}
                                         {rdelim});

{rdelim});
</script>
{undef $locale}
