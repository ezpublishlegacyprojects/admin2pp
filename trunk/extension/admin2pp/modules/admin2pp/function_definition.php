<?php
/**
 * $Id$
 * $HeadURL$
 *
 */

$FunctionList = array();
$FunctionList['dashboard_blocks'] = array( 'name' => 'dashboard_blocks',
                                           'operation_types' => array( 'read' ),
                                           'call_method' => array( 'class' => 'admin2ppFunctionCollection',
                                                                   'method' => 'fetchDashboardBlocks' ),
                                           'parameter_type' => 'standard',
                                           'parameters' => array( array( 'name' => 'active_only',
                                                                         'type' => 'boolean',
                                                                         'required' => false,
                                                                         'default' => true ) ) );


?>
