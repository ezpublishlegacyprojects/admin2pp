<?php
/**
 * $Id$
 * $HeadURL$
 *
 * Provides a proxy object to allow the use of any object in template
 *
 * @copyright Copyright (C) 2010 Damien Pobel. All rights reserved.
 * @license http://ez.no/licenses/gnu_gpl GNU General Public License v2.0
 * @version 0.2alpha1
 * @package admin2++
 */

class admin2ppTemplateProxyObject
{
    private $object;


    function __construct( $object )
    {
        $this->object = $object;
    }

    function hasAttribute( $name )
    {
        return isset( $this->object->$name );
    }

    function attribute( $name )
    {
        $val = $this->object->$name;
        if ( is_object( $val ) )
        {
            if ( $val instanceof DateTime )
            {
                return $val->format( 'U' );
            }
            return new admin2ppTemplateProxyObject( $val );
        }
        else if ( is_array( $val ) )
        {
            // transform all elements of the array
            // into admin2ppTemplateProxyObject to be able to use in template
            $func = create_function( '$element',
                                     'if ( is_object( $element ) )
                                      {
                                          return new admin2ppTemplateProxyObject( $element );
                                      }
                                      return $element;' );
            return array_map( $func, $val );
        }
        return $val;
    }
}


?>
