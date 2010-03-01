<?php
/*
 * $Id$
 * $HeadURL$
 *
 */

class admin2ppFunctionCollection
{

    static private function mergeBlocks( $left, $right )
    {
        eZDebug::writeDebug( $left, 'left' );
        eZDebug::writeDebug( $right, 'right' );
        $result = array();
        $length = max( count( $left ), count( $right ) );
        $left = array_pad( $left, $length, false );
        $right = array_pad( $right, $length, false );
        foreach( $left as $k => $identifier )
        {
            $result[] = $identifier === '' ? false : $identifier;
            $result[] = $right[$k] === '' ? false : $right[$k];
        }
        eZDebug::writeDebug( $result, __METHOD__ );
        return $result;
    }

    function fetchDashboardBlocks()
    {
        $userPrefs = eZPreferences::value( 'admin2pp_dashboard_blocks' );

        $tpl = eZTemplate::factory();
        if ( ( !$userPrefs || strpos( $userPrefs, '|' ) === false ) && $tpl->hasVariable( 'blocks' ) )
        {
            eZDebug::writeDebug( 'No admin2pp_dashboard_blocks preferences defined' );
            return array( 'result' => $tpl->variable( 'blocks' ) );
        }
        elseif ( !$userPrefs || strpos( $userPrefs, '|' ) === false )
        {
            eZDebug::writeError( 'fetch( admin2pp, dashboard_blocks ) not called on content/dashboard' );
            return array( 'result' => false );
        }
        $tmpArray = explode( '|', $userPrefs );
        $userPrefsLeft = $tmpArray[0];
        $userPrefsRight = $tmpArray[1];
        eZDebug::writeDebug( $userPrefsLeft, 'admin2pp_dashboard_blocks_left' );
        eZDebug::writeDebug( $userPrefsRight, 'admin2pp_dashboard_blocks_right' );
        $ini = eZINI::instance( 'dashboard.ini' );
        $currentUser = eZUser::currentUser();
        $leftBlocks = explode( ',', $userPrefsLeft );
        $rightBlocks = explode( ',', $userPrefsRight );
        $dashboardBlocks = self::mergeBlocks( $leftBlocks, $rightBlocks );
        $orderedBlocks = array();

        // adapted from kernel/content/dashboard.php
        foreach( $dashboardBlocks as $blockIdentifier )
        {
            if ( $blockIdentifier === false )
            {
                $orderedBlocks[] = array( 'identifier' => false );
            }
            else
            {
                $blockGroupName = 'DashboardBlock_' . $blockIdentifier;
                if ( !$ini->hasGroup( $blockGroupName ) )
                    continue;

                $hasAccess = true;
                if ( $ini->hasVariable( $blockGroupName, 'PolicyList' ) )
                {
                    $policyList = $ini->variable( $blockGroupName, 'PolicyList' );
                    foreach( $policyList as $policy )
                    {
                        // Value is either "<node_id>" or "<module>/<function>"
                        if ( strpos( $policy, '/' ) !== false )
                        {
                            list( $module, $function ) = explode( '/', $policy );
                                $result = $currentUser->hasAccessTo( $module, $function );

                            if ( $result['accessWord'] === 'no' )
                            {
                                $hasAccess = false;
                                break;
                            }
                        }
                        else
                        {
                            $node = eZContentObjectTreeNode::fetch( $policy );
                            if ( !$node instanceof eZContentObjectTreeNode || !$node->attribute('can_read') )
                            {
                                $hasAccess = false;
                                break;
                            }
                        }
                    }
                }

                if ( $hasAccess === false )
                    continue;

                $numberOfItems = null;
                if ( $ini->hasVariable( $blockGroupName, 'NumberOfItems' ) )
                    $numberOfItems = $ini->variable( $blockGroupName, 'NumberOfItems' );

                $template = null;
                if ( $ini->hasVariable( $blockGroupName, 'Template' ) )
                    $template = $ini->variable( $blockGroupName, 'Template' );
                
                $orderedBlocks[] = array( 'identifier' => $blockIdentifier,
                                          'template' => $template,
                                          'number_of_items' => $numberOfItems );
            }
        }

        return array( 'result' => $orderedBlocks );
    }



}

?>
