<?php /*
#
# $Id$
# $HeadURL$
#

[eZJSCore]
ExternalScripts[jqueryui]=http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js
LocalScripts[jqueryui]=jquery-ui-1.8.0.min.js
Packer=3

[Packer]
AppendLastModifiedTime=enabled


[ezjscServer]
FunctionList[]=admin2ppajax

[ezjscServer_admin2pp]
Class=admin2ppFunctions
File=extension/admin2pp/classes/admin2ppfunctions.php

[ezjscServer_admin2ppajax]
Class=admin2ppAjaxFunctions
File=extension/admin2pp/classes/admin2ppajaxfunctions.php


*/ ?>
