<?php

//
// Inicialmente, permitimos el acceso desde cualquier dominio
//
// Mas información:
//		https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
//		http://stackoverflow.com/questions/13893361/access-control-allow-origin-localhost
//
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Headers: Authorization');

include 'errors.php';
include 'utilities.php';

include 'libs/cmds/CommandCaller.php';
include 'base/Connection.php';
include 'base/Authentication.php';

CommandCaller::run('Canawa API', 'cmds/', 'cmds.txt');

?>
