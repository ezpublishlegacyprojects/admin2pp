<?php
/*
 * $Id$
 * $HeadURL$
 *
 */

class admin2ppAjaxFunctions extends ezjscServerFunctions
{


    public static function preview( $args )
    {
        $nodeID = intval( $args[0] );
        $node = eZContentObjectTreeNode::fetch( $nodeID );
        if ( $node instanceof eZContentObjectTreeNode )
        {
            $result = array();
            $tpl = eZTemplate::factory();
            $tpl->setVariable( 'node', $node );
            $result['title'] = $tpl->fetch( 'design:admin2ppajax/preview_title.tpl' );
            $result['preview'] = $tpl->fetch( 'design:admin2ppajax/preview.tpl' );
        }
        return ezjscAjaxContent::autoEncode( $result );
    }


}

?>
