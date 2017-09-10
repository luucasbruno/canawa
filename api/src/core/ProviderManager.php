<?php

include 'core/Provider.php';

/**
 * Clase que administra los proveedores
 *
 * @author Germán Martínez
 *
 */
class ProviderManager
{
	/**
	 * Agregar un proveedor
	 * 
	 * @param string $name Nombre del proveedor
	 * @param string $email Email del proveedor
	 * @param string $phone Teléfono del proveedor
	 * @param string $company Empresa del proveedor
	 * 
	 * @return Provider|integer Proveedor ó código de error
	 */
	public static function addProvider($name, $email, $phone, $company)
	{
		$con = Connection::getInstance();
		
		$id = createId();
		
		$res = $con->query("INSERT INTO `PROVIDER`
				(`ID`,`NAME`,`EMAIL`,`PHONE`,`COMPANY`)
				VALUES ('$id', '$name', '$email', '$phone', '$company');");
		
		if($res == NULL)
		{
			return ERROR_PROVIDER___NOT_CREATED;
		}
		return new Provider($id);
	}
	/**
	 * Renombrar un campo del proveedor
	 *
	 * @param integer $id Id del proveedor
	 * @param string  $field Nombre del campo
	 * @param mixed   $value Nuevo valor del campo
	 *
	 * @return integer SUCCESS ó código de error
	 */
	public static function renameField($id, $field, $value)
	{
		//
		// Comprobar la validez del id
		//
		if(empty($id))
			return ERROR___INVALID_ID;
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `PROVIDER` WHERE `ID`='$id';");
		if(null == ($data = $res->fetch_array()))
		{
			return ERROR___INVALID_ID;
		}
		//
		// Comprobar el campo
		//
		$field = strtolower($field);
		if($field == 'name')
		{
			if(empty($value))
				return ERROR___BAD_PARAMETERS;
			$res = $con->query("SELECT `ID` FROM `PROVIDER` WHERE `NAME`='$value' AND `ID`<>'$id';");
			if(null != ($data = $res->fetch_array()))
			{
				return ERROR___ALREADY_EXISTS;
			}
			$check = true;
		}
		else if(!($field == 'email' || $field == 'phone' || $field == 'company'))
		{
			return ERROR___BAD_PARAMETERS;
		}
		else
		{
			$check = false;
		}
		// Renombrar
		return renameFieldOfTable('PROVIDER', $field, $id, $value, $check);
	}
	/**
	 * Obtener todos los proveedores
	 * 
	 * @return ProviderIterator Iterador de proveedores
	 */
	public static function getProviders()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `PROVIDER`;");
		return new ProviderIterator($res);
	}
	/**
	 * Buscar proveedores
	 * 
	 * @param string $pattern Patrón de búsqueda
	 * 
	 * @return ProviderIterator Iterador de proveedores
	 */
	public static function searchProviders($pattern)
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `PROVIDER` WHERE `NAME` LIKE '%$pattern%';");
		return new ProviderIterator($res);
	}
}

?>
