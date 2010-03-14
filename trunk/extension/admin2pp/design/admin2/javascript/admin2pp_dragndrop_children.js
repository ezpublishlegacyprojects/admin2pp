/**
 * $Id$
 * $HeadURL$
 *
 */

function admin2ppDragNDropChildren()
{
    this.sortOrder = 1;
}

admin2ppDragNDropChildren.PRIORITY_OFFSET = 2;
admin2ppDragNDropChildren.TABLE_ID = 'ezasi-subitems-list';

admin2ppDragNDropChildren.prototype =
{
    init:function()
         {
             var instance = this;
             this.sortOrder = jQuery( '#ezasi-sort-order' ).val() === '0' ? -1 : 0;
             jQuery('#' + admin2ppDragNDropChildren.TABLE_ID + ' tbody').sortable( { placeholder: 'ui-state-highlight',
                                                                                     axis:'y',
                                                                                     opacity:0.8,
                                                                                     items:'tr',
                                                                                     cursor:'move',
                                                                                     forceHelperSize:true,
                                                                                     forcePlaceholderSize:true,
                                                                                     change:function( evt, ui )
                                                                                     {
                                                                                         instance.fixPlaceHolder( ui );
                                                                                     },
                                                                                     stop:function( evt, ui )
                                                                                     {
                                                                                         instance.fixBackgrounds(); 
                                                                                         instance.setPriorities();
                                                                                         instance.hightlightUpdateButton();
                                                                                     }
                                                                                   } )
                                                                        .css( 'cursor', 'move' );
             jQuery('#' + admin2ppDragNDropChildren.TABLE_ID + ' tbody').disableSelection();
             jQuery('#' + admin2ppDragNDropChildren.TABLE_ID + ' input.ezasi-priority-input').change(function()
                                                                                                     {
                                                                                                        instance.hightlightUpdateButton();
                                                                                                     });
     },

    hightlightUpdateButton:function()
                           {
                               jQuery('#ezasi-update-priority').addClass('defaultbutton');
                           },

    setPriorities:function()
                  {
                      var inputs = jQuery( '#' + admin2ppDragNDropChildren.TABLE_ID + ' input.ezasi-priority-input' );
                      var start = inputs.size() * this.sortOrder * admin2ppDragNDropChildren.PRIORITY_OFFSET;
                      inputs.each(function()
                                  {
                                      jQuery( this ).val( start ); 
                                      start = start + admin2ppDragNDropChildren.PRIORITY_OFFSET;
                                  });
                  },

    fixPlaceHolder:function( ui )
                   {
                       var pl = ui.placeholder;
                       pl.html( '<td colspan="' + ui.item.children().size() + '">&nbsp;</td>' ); 
                   },
    fixBackgrounds:function()
                   {
                       var cssClass = 'bglight';
                       jQuery('#' + admin2ppDragNDropChildren.TABLE_ID + ' tbody tr').each(function()
                                                                                           {
                                                                                               jQuery( this ).attr( 'class', cssClass );
                                                                                               if ( cssClass == 'bglight' )
                                                                                               {
                                                                                                   cssClass = 'bgdark';
                                                                                               }
                                                                                               else
                                                                                               {
                                                                                                   cssClass = 'bglight';
                                                                                               }
                                                                                           });
                   }

}
