<?php
/*
 * $Id$
 * $HeadURL$
 *
 */

class admin2ppAjaxFunctions extends ezjscServerFunctions
{

    public static function sysinfo( $args )
    {
        $tpl = eZTemplate::factory();
        return $tpl->fetch( 'design:admin2ppajax/sysinfo.tpl' );
    }

    public static function rightmenu( $args )
    {
        $http = eZHTTPTool::instance();
        $key = 'admin_right_menu_show';
        $value = '1';
        if ( eZOperationHandler::operationIsAvailable( 'user_preferences' ) )
        {
            $operationResult = eZOperationHandler::execute( 'user',
                                                            'preferences', array( 'key'    => $key,
                                                                                  'value'  => $value ) );
        }
        else
        {
            eZPreferences::setValue( $key, $value );
        }
        $uiContext = 'navigation';
        $Result = array( 'content_info' => array() );
        if ( $http->hasPostVariable( 'UIContext' ) )
        {
            $uiContext = $http->postVariable( 'UIContext' );
        }
        if ( $http->hasPostVariable( 'ContentInfo' ) )
        {
            $Result['content_info'] = $http->postVariable( 'ContentInfo' );
        }
        $tpl = eZTemplate::factory();
        $tpl->setVariable( 'current_user', eZUser::currentUser() );
        $tpl->setVariable( 'ui_context', $uiContext );
        $tpl->setVariable( 'module_result', $Result );
        return $tpl->fetch( 'design:admin2ppajax/rightmenu.tpl' );
    }

    public static function preview( $args )
    {
        $id = isset( $args[0] ) ? intval( $args[0] ) : 0;
        $type = isset( $args[1] ) ? $args[1] : '';
        try
        {
            $preview = new admin2ppPreview( $id, $type );
            $result = $preview->process();
        }
        catch( Exception $e )
        {
            $result = array( 'error' => $e->getMessage() );
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

    public static function storeParse( $args )
    {
        $http = eZHTTPTool::instance();
        if ( !isset( $args[0] ) )
        {
            return '';
        }
        $key = $args[0] . '_feed_url';
        $value = '';
        if ( $http->hasPostVariable( 'FeedURL' ) )
        {
            $value = $http->postVariable( 'FeedURL' );
        }
        if ( eZOperationHandler::operationIsAvailable( 'user_preferences' ) )
        {
            $operationResult = eZOperationHandler::execute( 'user',
                                                            'preferences', array( 'key'    => $key,
                                                                                  'value'  => $value ) );
        }
        else
        {
            eZPreferences::setValue( $key, $value );
        }
        return self::parse( $args );
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
        $cacheKey = md5( $feedURL ) . '.php';
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
