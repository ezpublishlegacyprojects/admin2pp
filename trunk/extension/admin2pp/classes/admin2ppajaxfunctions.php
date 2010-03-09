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


    public static function attributes( $args )
    {
        if ( !isset( $args[0] ) )
        {
            return "";
        }
        $contentClassID = $args[0];
        $attributes = eZContentClassAttribute::fetchListByClassID( $contentClassID );
        if ( !$attributes )
        {
            return "";
        }
        $tpl = eZTemplate::factory();
        $tpl->setVariable( 'attributes', $attributes );
        return $tpl->fetch( 'design:admin2ppajax/attributes.tpl' );
    }

    public static function parse( $args )
    {
        $result = array( 'title' => '', 'content' => '' );
        if ( !isset( $args[0] ) )
        {
            return '';
        }
        $blockID = $args[0];
        $feedURL = eZPreferences::value( $blockID . '_feed_url' ); 
        if ( $feedURL === '' )
        {
            return '';
        }
        $tpl = eZTemplate::factory();
        try
        {
            $feed = ezcFeed::parse( $feedURL );
        }
        catch( Exception $e )
        {
            $tpl->setVariable( 'error', $e->getMessage() );
        }
        $tpl->setVariable( 'feed', new admin2ppTemplateProxyObject( $feed ) );
        return $tpl->fetch( 'design:admin2ppajax/feed_reader.tpl' );
    }

}

?>
