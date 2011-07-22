{*
 * $Id$
 * $HeadURL$
 *}
<div id="preview-dialog" style="display:none;" title="{'Loading preview...'|i18n( 'admin2pp/preview' )}">
    <p class="loader"><img src={'admin2pp-loader.gif'|ezimage()} alt="{'Loading...'|i18n( 'admin2pp/preview' )}" /></p>
    <p class="error"></p>
</div>
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}

    var linkText = "{'Preview'|i18n( 'admin2pp/preview' )|wash( javascript )}",
        previewConfig = {ldelim}

            errorText: "{'An error occured'|i18n( 'admin2pp/preview' )|wash( javascript )}",
            dialog: '#preview-dialog',
            {literal}
            elements:[
            // each elements is an object which consists of:
            // - [required] a selector to address the area which will trigger the preview
            // - [optional] an init function (this == the element selected with selector)
            // - [required] a click function (this == the admin2ppPreviewDialog object
            {
                selector: '#menu-view',
                init:function () {
                    this.html(linkText);
                },
                click:function (evt) {
                    evt.preventDefault();
                    this.initFromContentViewLink(evt);
                }
            },
            {
                selector: '#bookmark-view',
                init:function () {
                    this.html(linkText);
                },
                click:function (evt) {
                    evt.preventDefault();
                    this.initFromContentViewLink(evt);
                }
            },
            {
                selector: '#child-menu-preview',
                init:function () {
                    this.html(linkText);
                },
                click:function (evt) {
                    var previewLink = jQuery(evt.target),
                        tmp = previewLink.attr('href').split("/");

                    evt.preventDefault();
                    tmp.pop();
                    this.currentContentObjectID = tmp.pop();
                    this.open();
                }
            }]
            {/literal}
        {rdelim};
    var previewDialog = new admin2ppPreviewDialog(previewConfig);
    previewDialog.init();

{rdelim});
</script>
