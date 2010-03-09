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
        $useCache = true;
        if ( !isset( $args[0] ) )
        {
            return '';
        }
        $blockID = $args[0];
        if ( isset( $args[1] ) && $args[1] == 1 )
        {
            $useCache = false;
        }
        $feedURL = eZPreferences::value( $blockID . '_feed_url' ); 
        $ini = eZINI::instance( 'dashboard.ini' );
        $siteINI = eZINI::instance();   
        $cacheTTL = $ini->variable( 'DashboardBlock_feed_reader', 'CacheTTL' );
        $cacheDir = $siteINI->variable( 'FileSettings', 'VarDir' )
                    . '/'
                    . $siteINI->variable( 'FileSettings', 'CacheDir' )
                    . '/rss/';
        $cacheKey = md5( $blockID . $feedURL ) . '.php';
        $cache = new eZPHPCreator( $cacheDir, $cacheKey, '', array( 'clustering' => 'rss' ) );
        if ( $useCache && $cache->canRestore( time() - $cacheTTL ) )
        {
            $values = $cache->restore( array( 'Content' => 'content' ) );
            $cache->close();
            return $values['Content'];
        }
        if ( $feedURL === '' )
        {
            return '';
        }
        $tpl = eZTemplate::factory();
        $feed = false;
        try
        {
            $feed = ezcFeed::parse( $feedURL );
        }
        catch( Exception $e )
        {
            $tpl->setVariable( 'error', $e->getMessage() );
        }
        $tpl->setVariable( 'feed', new admin2ppTemplateProxyObject( $feed ) );
        $content = $tpl->fetch( 'design:admin2ppajax/feed_reader.tpl' );
        $cache->addVariable( 'content', $content );
        $cache->store();
        $cache->close();
        return $content;
    }

}

?>
