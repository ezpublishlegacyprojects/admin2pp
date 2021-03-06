{* set scope=global persistent_variable=hash('extra_menu', false()) *}

<div class="context-block content-dashboard">
    
{* DESIGN: Header START *}<div class="box-header"><div class="box-tc"><div class="box-ml"><div class="box-mr"><div class="box-tl"><div class="box-tr">

<h1 class="context-title">{'Dashboard'|i18n( 'design/admin/content/dashboard' )}</h1>

{* DESIGN: Mainline *}<div class="header-mainline"></div>

{* DESIGN: Header END *}</div></div></div></div></div></div>

{* DESIGN: Content START *}<div class="box-bc"><div class="box-ml"><div class="box-mr"><div class="box-bl"><div class="box-br"><div class="box-content">

<div class="block">
{def $right_blocks = array()}

<div class="left">
{def $user_blocks = fetch( 'admin2pp', 'dashboard_blocks', hash( 'active_only', true() ) )}
{foreach $user_blocks as $block sequence array( 'left', 'right' ) as $position}
  
  {if and( $block.identifier, $position|eq('left') )}
  <div class="dashboard-item" id="admin2pp_db_{cond( $block.multiple, $block.full_identifier, $block.identifier )}">
    {if $block.template}
        {include uri=concat( 'design:', $block.template )}
    {else}
        {include uri=concat( 'design:dashboard/', $block.identifier, '.tpl' )}
    {/if}
  </div>
  {elseif $block.identifier}
	{append-block variable=$right_blocks}
	<div class="dashboard-item" id="admin2pp_db_{cond( $block.multiple, $block.full_identifier, $block.identifier )}">
	    {if $block.template}
	        {include uri=concat( 'design:', $block.template )}
	    {else}
	        {include uri=concat( 'design:dashboard/', $block.identifier, '.tpl' )}
	    {/if}
	</div>
	{/append-block}
  {/if}
{/foreach}
</div>
<div class="right">
    {$right_blocks|implode('')}
</div>
<div class="float-break"></div>
</div>


{* DESIGN: Content END *}</div></div></div></div></div></div>

</div>
<script type="text/javascript">
jQuery(document).ready(function()
{ldelim}

    var dashboard = new admin2ppDashboardBlocks();
    dashboard.init();
    dashboard.initSettings();

{rdelim});
</script>

