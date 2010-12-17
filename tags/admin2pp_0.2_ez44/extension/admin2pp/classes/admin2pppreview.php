<?php
/**
 * $Id$
 * $HeadURL$
 *
 * Provides preview logic
 *
 * @copyright Copyright (C) 2010 Damien Pobel. All rights reserved.
 * @license http://ez.no/licenses/gnu_gpl GNU General Public License v2.0
 * @version 0.2
 * @package admin2++
 */

class admin2ppPreview
{
    /**
     * The node id of the node to preview
     * 
     * @var int|false
     * @access protected
     */
    protected $nodeID = false;

    /**
     * The content object id of the object to preview 
     * 
     * @var int|false
     * @access protected
     */
    protected $contentObjectID = false;

    /**
     * the content object to preview
     * 
     * @var eZContentObject|false
     * @access protected
     */
    protected $contentObject = false;

    /**
     * the content object tree node to preview 
     * 
     * @var eZContentObjectTreeNode|false
     * @access protected
     */
    protected $node = false;

    /**
     * The resulting variables to send to the browser to display the preview 
     * 
     * @var array
     * @access protected
     */
    protected $result = array();

    const PREVIEW_NODE = 'node_id';
    const PREVIEW_OBJECT = 'object_id';

    /**
     * Constructor of the class admin2ppPreview. Try to load
     * the object to preview
     * 
     * @param int $id 
     * @param string $type 
     * @throw RuntimeException or InvalidArgumentException
     */
    function __construct( $id, $type )
    {
        if ( $type === self::PREVIEW_NODE )
        {
            $this->nodeID = $id;
            $this->contentObject = eZContentObject::fetchByNodeID( $id );
        }
        elseif ( $type === self::PREVIEW_OBJECT )
        {
            $this->contentObjectID = $id;
            $this->contentObject = eZContentObject::fetch( $id );
        }
        else
        {
            throw new InvalidArgumentException( 'Invalid type parameter' );
        }
        if ( !$this->contentObject instanceof eZContentObject )
        {
            throw new RuntimeException( 'Impossible to load object' );
        }
        if ( !$this->contentObject->attribute( 'can_read' ) )
        {
            throw new RuntimeException( 'You are not allowed to view this object' );
        }
        if ( $type === self::PREVIEW_OBJECT )
        {
            $this->nodeID = $this->contentObject->attribute( 'main_node_id' );
        }
        else
        {
            $this->contentObjectID = $this->contentObject->attribute( 'id' );
        }
        $this->node = eZContentObjectTreeNode::fetch( $this->nodeID );
        if ( !$this->node instanceof eZContentObjectTreeNode )
        {
            throw new RuntimeException( 'Impossible to load node' );
        }
    }


    /**
     * Main entry point to build the preview 
     * 
     * @access public
     * @return array
     */
    public function process()
    {
        $this->processInfos();
        $this->processPreview();
        return $this->result;
    }

    /**
     * Fills the result array with "meta datas" like
     * the node id and the content object id or the
     * URL to copy or edit the object
     * 
     * @access protected
     * @return void
     */
    protected function processInfos()
    {
        $this->result['node_id'] = $this->nodeID;
        $this->result['contentobject_id'] = $this->contentObjectID;
        $this->result['edit'] = false;
        $this->result['copy'] = false;
        if ( $this->node->attribute( 'can_edit' ) )
        {
            $url = 'content/edit/' . $this->result['contentobject_id'];
            eZURI::transformURI( $url );
            $this->result['edit'] = $url;
            $url = 'content/copy/' . $this->result['contentobject_id'];
            eZURI::transformURI( $url );
            $this->result['copy'] = $url;
        }
        $this->result['remove'] = false;
        if ( $this->node->attribute( 'can_remove' ) )
        {
            $this->result['remove'] = true;
        }
        $this->result['move']   = false;
        if ( $this->node->attribute( 'can_move' ) )
        {
            $this->result['move'] = true;
        }
    }

    /**
     * Returns the name of the siteaccess currently in use 
     * 
     * @static
     * @access protected
     * @return string
     */
    protected static function currentSiteaccessName()
    {
        $currentSiteaccess = eZSiteAccess::current();
        return $currentSiteaccess['name'];
    }

    /**
     * Returns an array containing the default locale code
     * and siteaccess name to use for the preview
     * 
     * @param bool $multiLanguages 
     * @param array $languageSiteaccessMap 
     * @access protected
     * @return array( 'locale' => ..., 'siteaccess' => ... )
     */
    protected function getDefaultContentPreviewSettings( $multiLanguages, $languageSiteaccessMap)
    {
        $settings = array();
        $defaultLanguage = $this->contentObject->attribute( 'default_language' );
        $settings['version'] = $this->contentObject->attribute( 'current_version' );
        if ( !$multiLanguages )
        {
            $ini = eZINI::instance();
            $settings['siteaccess'] = $ini->variable( 'SiteSettings', 'DefaultAccess' );
            $settings['locale'] = $defaultLanguage;
        }
        else
        {
            if ( isset( $languageSiteaccessMap[$defaultLanguage] ) )
            {
                $settings['siteaccess'] = $languageSiteaccessMap[$defaultLanguage][0];
                $settings['locale'] = $defaultLanguage;
            }
            else
            {
                $locales = array_keys( $languageSiteaccessMap );
                $settings['locale'] = $locales[0];
                $settings['siteaccess'] = $languageSiteaccessMap[$locales[0]][0];
            }
        }
        return $settings;
    }

    /**
     * Returns the list of siteaccess excluding the current one 
     * 
     * @static
     * @access protected
     * @return array
     */
    protected static function siteaccessList()
    {
        $ini = eZINI::instance();
        $relatedSiteaccessList = $ini->variable( 'SiteAccessSettings', 'RelatedSiteAccessList' );
        $currentSiteaccess = self::currentSiteaccessName();
        $key = array_search( $currentSiteaccess, $relatedSiteaccessList );
        if ( $key !== false )
        {
            unset( $relatedSiteaccessList[$key] );
        }
        return $relatedSiteaccessList;
    }

    /**
     * Returns an array with available locale as keys 
     * 
     * @static
     * @access protected
     * @return array
     */
    protected static function initLanguageSiteaccessMap()
    {
        $map = array();
        $languages = eZContentLanguage::fetchList();
        foreach( $languages as $languageObject )
        {
            $map[$languageObject->attribute( 'locale' )] = array();
        }
        return $map;
    }

    /**
     * Removes locale from the map that can be used
     * 
     * @param array $map 
     * @static
     * @access protected
     * @return array
     */
    protected static function cleanLanguageSiteaccessMap( array $map )
    {
        foreach( $map as $code => $saArray )
        {
            if ( empty( $saArray ) )
            {
                unset( $map[$code] );
            }
        }
        return $map;
    }

    /**
     * Generate the HTML of the preview
     * 
     * @access protected
     * @return void
     */
    protected function processPreview()
    {
        $tpl = eZTemplate::factory();
        $tpl->setVariable( 'object', $this->contentObject );
        $tpl->setVariable( 'node', $this->node );

        $relatedSiteaccessList = self::siteaccessList();
        $objectLanguageCodes = $this->contentObject->attribute( 'language_codes' );
        $alwaysAvailable = $this->contentObject->attribute( 'always_available' );
        $languageSiteaccessMap = self::initLanguageSiteaccessMap();
        foreach( $relatedSiteaccessList as $siteaccess )
        {
            $saINI = eZSiteAccess::getIni( $siteaccess, 'site.ini' );
            $saLanguageList = array_unique( array_merge( array( $saINI->variable( 'RegionalSettings', 'ContentObjectLocale' ) ),
                                                                $saINI->variable( 'RegionalSettings', 'SiteLanguageList' ) ) );
            $possibleLanguageCodes = array_values( array_intersect( $objectLanguageCodes, $saLanguageList ) );
            if ( empty( $possibleLanguageCodes ) &&
                    ( $alwaysAvailable || $saINI->variable( 'RegionalSettings', 'ShowUntranslatedObjects' ) === 'enabled' ) )
            {
                // $siteaccess is not configured to use one of the language the object exists in,
                // but if the object is marked as always available or the siteaccess can show
                // untranslated objects then we can display it in the default language
                $languageSiteaccessMap[$this->contentObject->attribute( 'default_language' )][] = $siteaccess;
            }
            elseif ( !empty( $possibleLanguageCodes ) )
            {
                $languageSiteaccessMap[$possibleLanguageCodes[0]][] = $siteaccess;
            }
        }
        $languageSiteaccessMap = self::cleanLanguageSiteaccessMap( $languageSiteaccessMap );
        $multiLanguages = ( count( $languageSiteaccessMap ) > 1 );
        $tpl->setVariable( 'multi_languages', $multiLanguages );
        $tpl->setVariable( 'siteaccess_list', $relatedSiteaccessList );
        $tpl->setVariable( 'languages_siteaccess_map', $languageSiteaccessMap );
        $tpl->setVariable( 'preview_settings', $this->getDefaultContentPreviewSettings( $multiLanguages,
                                                                                        $languageSiteaccessMap ) );

        $this->result['title'] = $tpl->fetch( 'design:admin2ppajax/preview_title.tpl' );
        $this->result['preview'] = $tpl->fetch( 'design:admin2ppajax/preview.tpl' );
    }

}


?>
