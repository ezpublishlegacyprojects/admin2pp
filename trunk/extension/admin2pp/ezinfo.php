<?php
/**
 * $Id$
 * $HeadURL$
 *
 * Provides copyright infos
 *
 * @copyright Copyright (C) 2010 Damien Pobel. All rights reserved.
 * @license http://ez.no/licenses/gnu_gpl GNU General Public License v2.0
 * @version 0.3alpha1
 * @package admin2++
 */

class admin2ppInfo
{
    static function info()
    {
        return array( 'Name'      => '<a href="http://projects.ez.no/admin2pp">admin2++</a> extension',
                      'Version'   => '0.3alpha1',
                      'Copyright' => 'Copyright (C) 2010 Damien Pobel',
                      'License'   => 'GNU General Public License v2.0',
                      'Includes the following library' => array( 'Name'      => 'jQueryUI',
                                                                 'Version'   => '1.8.6',
                                                                 'Copyright' => '<a href="http://jqueryui.com/about">jQuery UI Team</a>',
                                                                 'License'   => 'GNU General Public License v2.0',
                                                               ),
                    );
    }
}

?>
