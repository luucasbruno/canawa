<?php

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Códigos HTPP
//
////////////////////////////////////////////////////////////////////////////////////////////////////

define('HTTP_RCODE___OK', 200);

define('HTTP_RCODE___BAD_REQUEST', 400);
define('HTTP_RCODE___UNAUTHORIZED', 401);
define('HTTP_RCODE___FORBIDDEN', 403);
define('HTTP_RCODE___NOT_FOUND', 404);
define('HTTP_RCODE___METHOD_NOT_ALLOWED', 405);
define('HTTP_RCODE___INTERNAL_SERVER_ERROR', 500);
define('HTTP_RCODE___NOT_IMPLEMENTED', 501);

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// SUCCESS
//
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Valor de éxito
 */
define('SUCCESS', 0);

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Errores generales
//
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Código de error genérico
 */
define('ERROR___ANY_ERROR', 1);
/**
 * Código de error asociado a un problema con la base de datos
 */
define('ERROR___SQL_QUERY', 2);
/**
 * Código cuando no se encuantra un recurso
 */
define('ERROR___NOT_FOUND', 3);
/**
 * Código cuando hay un error en el sistema de archivo
 */
define('ERROR___FILE_SYSTEM', 4);
/**
 * Codigo cuando los parametros no son correcto o incompletos
 */
define('ERROR___BAD_PARAMETERS', 5);
/**
 * Código cuando se intanta crear algo que ya existe
 */
define('ERROR___ALREADY_EXISTS', 6);
/**
 * Código cuando de utiliza un id inválido
 */
define('ERROR___INVALID_ID', 7);
/**
 * Código cuando de algo no se puede crear
 */
define('ERROR___NOT_CREATED', 8);

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Errores relacionados con la cuenta y el logeo
//
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * El nombre de usuario está vacío
 */
define('ERROR___EMPTY_USERNAME', 100);
/**
 * La contraseña de usuario está vacía
 */
define('ERROR___EMPTY_PASSWORD', 101);
/**
 * Usuario inválido, no está registrado en el sistema
 */
define('ERROR___INVALID_USERNAME', 102);
/**
 * Contraseña de usuario incorrecta
 */
define('ERROR___INVALID_PASSWORD', 103);
/**
 * Nombre de usuario ya existente en el sistema
 */
define('ERROR___USERNAME_ALREADY_EXISTS', 104);

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Errores relacionados productos
//
////////////////////////////////////////////////////////////////////////////////////////////////////
define('ERROR_PRODUCT___INVALID_NAME', 100);
define('ERROR_PRODUCT___INVALID_BRAND_ID', 101);
define('ERROR_PRODUCT___INVALID_PROVIDER_ID', 102);
define('ERROR_PRODUCT___INVALID_CATEGORY_ID', 103);
define('ERROR_PRODUCT___INVALID_RETAIL_PRICE', 104);
define('ERROR_PRODUCT___INVALID_WHOLESALER_PRICE', 105);

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Errores relacionados ventas
//
////////////////////////////////////////////////////////////////////////////////////////////////////
define('ERROR_SALE___ZERO_PRODUCTS', 200);
define('ERROR_SALE___INCONSISTENT_IDS_AND_COUNTS', 201);
define('ERROR_SALE___INVALID_PRODUCT_ID', 202);
define('ERROR_SALE___INVALID_PRODUCT_COUNT', 203);

?>
