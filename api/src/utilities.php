<?php

/**
 * Crear un id único
 * 
 * @return number Id
 */
function createId()
{
	return time();
}

/**
 * Obtener valor de un parametro, si el parámetro no existe devuelve una cadena vacía
 * 
 * @param array $queryParameters Array de parámetros
 * @param string $name Nombre del parámetro
 * 
 * @return string Valor del parámetro, ó cadena vacía
 */
function getQueryParameter($queryParameters, $name)
{
	if(isset($queryParameters[$name]))
	{
		return $queryParameters[$name];
	}
	return "";
}

/**
 * Traza
 * 
 * @param string $msg Mensaje
 */
function trace($msg)
{
	file_put_contents("../dbg/trace.txt", $msg . PHP_EOL, FILE_APPEND);
}

/**
 * Obtener el valor de un campo de una tabla correspondiente el id indicado
 * 
 * @param string $table Nombre de la tabla
 * @param string $field Nombre del campo
 * @param integer $id Id de la instancia
 * 
 * @return mixed Valor de la del campo
 */
function getFieldFromTable($table, $field, $id)
{
	$con = Connection::getInstance();
	$res = $con->query("SELECT `$field` FROM `$table` WHERE `ID`='$id';");
	return $res->fetch_array()[$field];
}

/**
 * Renombrar el campo de una tabla
 * 
 * @param string $table Nombre de la tabla
 * @param string $field Nombre del campo
 * @param integer $id Id de la instancia
 * @param mixed $value Nuevo valor del campo
 * @param boolean $check Comprobar que el nuevo valor no este en otra instancia
 * 
 * @return integer SUCCESS ó código de error
 * 
 * @see ERROR___INVALID_ID
 * @see ERROR___ALREADY_EXISTS
 * 
 */
function renameFieldOfTable($table, $field, $id, $value, $check)
{
	// Obtener la conexión
	$con = Connection::getInstance();
	
	//
	// Comprobar si es un id válido
	//
	if($id == 0)
	{
		return ERROR___INVALID_ID;
	}
	$res = $con->query("SELECT `ID` FROM `$table` WHERE `ID`='$id';");
	if(null == ($data = $res->fetch_array()))
	{
		return ERROR___INVALID_ID;
	}
	//
	// Buscar si el nuevo valor ya está registrado
	//
	if($check)
	{
		$res = $con->query("SELECT `ID` FROM `$table` WHERE `$field`='$value' AND `ID` <> '$id';");
		if(null != ($data = $res->fetch_array()))
		{
			return ERROR___ALREADY_EXISTS;
		}
	}
	//
	// Renombrar
	//
	$res = $con->query("UPDATE `$table` SET `$field` = '$value' WHERE `ID` = '$id';");
	
	return SUCCESS;
}

?>
