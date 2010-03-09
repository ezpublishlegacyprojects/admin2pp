<?php /*

[DashboardSettings]
# AdditionnalDashboardBlocks contains a list of dashboard blocks
# that are not enabled by default, but a user can enable it with
# admin2pp
AdditionnalDashboardBlocks[]
AdditionnalDashboardBlocks[]=advanced_search
AdditionnalDashboardBlocks[]=feed_reader


[DashboardBlock_advanced_search]
Priority=60
PolicyList[]=content/read

[DashboardBlock_feed_reader]
Priority=60
MultipleInstance=true
NumberOfItems=5
CacheTTL=1800

*/ ?>
