<?php
/**
 * $Id$
 * $HeadURL$
 *
 * Provides methods to include jQueryUI JavaScript file through ezjscore
 *
 * @copyright Copyright (C) 2010 Damien Pobel. All rights reserved.
 * @license http://ez.no/licenses/gnu_gpl GNU General Public License v2.0
 * @version 0.3alpha1
 * @package admin2++
 */

class admin2ppFunctions extends ezjscServerFunctions
{

    public static function getCacheTime( $functionName )
    {
        if ( $functionName === 'jqueryui' )
        {
            return -1;
        }
        return parent::getCacheTime();
    }

    /**
     * Figures out where to load jQueryUI files from and prepends them to $packerFiles
     *
     * @param array $args
     * @param array $packerFiles ByRef list of files to pack (by ezjscPacker)
     */
    public static function jqueryui( $args, &$packerFiles )
    {
        $ezjscoreIni = eZINI::instance( 'ezjscore.ini' );
        if ( $ezjscoreIni->variable( 'eZJSCore', 'LoadFromCDN' ) === 'enabled' )
        {
            $scriptFiles = $ezjscoreIni->variable( 'eZJSCore', 'ExternalScripts' );
            $packerFiles = array_merge( array( $scriptFiles['jqueryui'] ), $packerFiles );
        }
        else
        {
            $scriptFiles = $ezjscoreIni->variable( 'eZJSCore', 'LocalScripts' );
            $packerFiles = array_merge( array( $scriptFiles['jqueryui'] ), $packerFiles );
        }
        return '';
    }


}


?>
