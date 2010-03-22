/**
 * $Id$
 * $HeadURL$
 */

function admin2ppObjectInfoResizable( prefName, height )
{
    var tmpArray = height.split( ',' );
    this.prefName = prefName;
    this.heightBox = parseInt( tmpArray[0] );
    this.heightTab = parseInt( tmpArray[1] );
    if ( !this.heightTab || !this.heightBox )
    {
        this.heightTab = 0;
        this.heightBox = 0;
    }
    this.globalSelector = '#fix .box-content:first';
    this.tabSelector = '.tab-content';
}

admin2ppObjectInfoResizable.prototype =
{
    init:function()
         {
             var instance = this;
             var elt = jQuery( this.globalSelector )

             if ( this.heightBox != 0 && this.heightTab != 0 )
             {
                 this.initSize();
             }
             elt.resizable( { handles: 's',
                              alsoResize: instance.tabSelector,
                              minHeight: 30,
                              stop: function( evt, ui )
                                    {
                                        instance.heightBox = ui.size.height;
                                        instance.heightTab = jQuery( instance.tabSelector ).height();
                                        admin2ppAjaxSavePreference( instance.prefName, instance.heightBox + ',' + instance.heightTab );
                                        jQuery( instance.globalSelector ).css( 'width', 'auto' );
                                        jQuery( instance.tabSelector ).css( 'width', 'auto' );
                                    }
                            } );
         },

    initSize:function()
             {
                jQuery( this.globalSelector ).css( 'height', this.heightBox + 'px' );
                jQuery( this.tabSelector ).css( 'height', this.heightTab + 'px' );
             }

}
