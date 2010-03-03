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
        $result = array();
        $length = max( count( $left ), count( $right ) );
        $left = array_pad( $left, $length, false );
        $right = array_pad( $right, $length, false );
        foreach( $left as $k => $identifier )
        {
            $result[] = $identifier === '' ? false : $identifier;
            $result[] = $right[$k] === '' ? false : $right[$k];
        }
        return $result;
    }

    static private function hasAccessToBlock( $blockIdentifier )
    {
        $blockGroupName = 'DashboardBlock_' . $blockIdentifier;
        $ini = eZINI::instance( 'dashboard.ini' );
        $currentUser = eZUser::currentUser();
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
        return $hasAccess;
    }

    static function blockInfo( $blockIdentifier )
    {
        $blockGroupName = 'DashboardBlock_' . $blockIdentifier;
        $ini = eZINI::instance( 'dashboard.ini' );
        $numberOfItems = null;
        if ( $ini->hasVariable( $blockGroupName, 'NumberOfItems' ) )
            $numberOfItems = $ini->variable( $blockGroupName, 'NumberOfItems' );

        $template = null;
        if ( $ini->hasVariable( $blockGroupName, 'Template' ) )
            $template = $ini->variable( $blockGroupName, 'Template' );

        return array( 'identifier' => $blockIdentifier,
                      'template' => $template,
                      'number_of_items' => $numberOfItems );
    }

    function fetchDashboardBlocks( $activeOnly = true )
    {
        $userPrefs = eZPreferences::value( 'admin2pp_dashboard_blocks' );
        $orderedBlocks = array();
        $identifierIndex = array();
        $ini = eZINI::instance( 'dashboard.ini' );

        $tpl = eZTemplate::factory();
        if ( ( !$userPrefs || strpos( $userPrefs, '|' ) === false ) && $tpl->hasVariable( 'blocks' ) )
        {
            eZDebug::writeDebug( 'No admin2pp_dashboard_blocks preferences defined' );
            $orderedBlocks = $tpl->variable( 'blocks' );
            foreach( $orderedBlocks as $k => $b )
            {
                $orderedBlocks[$k]['active'] = true;
                $identifierIndex[$orderedBlocks[$k]['identifier']] = $orderedBlocks[$k]['identifier'];
            }
        }
        elseif ( !$userPrefs || strpos( $userPrefs, '|' ) === false )
        {
            eZDebug::writeError( 'fetch( admin2pp, dashboard_blocks ) not called on content/dashboard' );
            return array( 'result' => false );
        }
        elseif ( $userPrefs )
        {
            list( $userPrefsLeft, $userPrefsRight ) = explode( '|', $userPrefs );
            $currentUser = eZUser::currentUser();
            $leftBlocks = explode( ',', $userPrefsLeft );
            $rightBlocks = explode( ',', $userPrefsRight );
            $dashboardBlocks = self::mergeBlocks( $leftBlocks, $rightBlocks );

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

                    $hasAccess = self::hasAccessToBlock( $blockIdentifier );

                    if ( $hasAccess === false )
                        continue;

                    $blockInfo = self::blockInfo( $blockIdentifier );
                    $blockInfo['active'] = true;
                    $orderedBlocks[] = $blockInfo;
                    $identifierIndex[$blockIdentifier] = $blockIdentifier;
                }
            }
        }

        if ( !$activeOnly )
        {
            $dashboardBlocks = array_merge( $ini->variable( 'DashboardSettings', 'DashboardBlocks' ),
                                            $ini->variable( 'DashboardSettings', 'AdditionnalDashboardBlocks' ) );
            foreach( $dashboardBlocks as $blockIdentifier )
            {
                if ( isset( $identifierIndex[$blockIdentifier] ) )
                {
                    continue;
                }
                $blockGroupName = 'DashboardBlock_' . $blockIdentifier;
                if ( !$ini->hasGroup( $blockGroupName ) )
                    continue;

                $hasAccess = self::hasAccessToBlock( $blockIdentifier );

                if ( $hasAccess === false )
                    continue;

                $blockInfo = self::blockInfo( $blockIdentifier );
                $blockInfo['active'] = false;
                $orderedBlocks[] = $blockInfo;
            }
        }

        return array( 'result' => $orderedBlocks );
    }



}

?>
