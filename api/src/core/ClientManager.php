<?php
include_once 'core/Client.php';
include_once 'core/ClientIterator.php';

/**
 * Clase que administra los clientes
 * 
 * @author Germán Martínez
 *
 */
class ClientManager
{
	/**
	 * Agregar un cliente al sistema
	 * 
	 * @param string $name Nombre completo del cliente
	 * @param string $cuit CUIT del cliente
	 * @param string $email Correo electrónico del cliente
	 * @param string $phone Número telefónico del cliente
	 * @param string $location Dirección del cliente
	 * 
	 * @return Client|integer Cliente ó código de error
	 * 
	 * @see ERROR___SQL_QUERY
	 * @see ERROR_CLIENT___NOT_CREATED
	 */
	public static function addClient($name, $cuit, $email, $phone, $location)
	{
		$con = Connection::getInstance();
		
		$res = $con->query("SELECT `ID` FROM `CLIENT` WHERE `NAME`='$name';");
		if(null != ($data = $res->fetch_array()))
		{
			return ERROR___ALREADY_EXISTS;
		}
		
		$id = createId();
		
		$res = $con->query("INSERT INTO `CLIENT`
						(`ID`,`NAME`,`CUIT`,`EMAIL`,`PHONE`,`LOCATION`)
						VALUES ('$id','$name','$cuit','$email', '$phone', '$location');");
		if($res == NULL)
		{
			return ERROR_CLIENT___NOT_CREATED;
		}
		return new Client($id);
	}
	/**
	 * Renombrar un campo del cliente
	 * 
	 * @param integer $id Id del cliente
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
		$res = $con->query("SELECT `ID` FROM `CLIENT` WHERE `ID`='$id';");
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
			$res = $con->query("SELECT `ID` FROM `CLIENT` WHERE `NAME`='$value' AND `ID`<>'$id';");
			if(null != ($data = $res->fetch_array()))
			{
				return ERROR___ALREADY_EXISTS;
			}
			$check = true;
		}
		else if($field == 'cuit')
		{
			if(empty($value))
				return ERROR___BAD_PARAMETERS;
			$check = true;
		}
		else if(!($field == 'email' || $field == 'phone' || $field == 'location'))
		{
			return ERROR___BAD_PARAMETERS;
		}
		else
		{
			$check = false;
		}
		// Renombrar
		return renameFieldOfTable('CLIENT', $field, $id, $value, $check);
	}
	/**
	 * Obtener todos los clientes
	 * 
	 * @return ClientIterator Iterador de clientes
	 */
	public static function getClients()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `CLIENT`;");
		return new ClientIterator($res);
	}
	/**
	 * Buscar clientes por nombre
	 * 
	 * @param string $pattern Patrón de busqueda
	 * 
	 * @return ClientIterator Iterador de clientes
	 */
	public static function searchClients($pattern)
	{
		// Obtener la conexión
		$con = Connection::getInstance();
		
		// Obtener los ids
		$res = $con->query("SELECT `ID` FROM `CLIENT` WHERE `NAME` LIKE '$pattern%';");
		
		// Retornar iterador
		return new ClientIterator($res);
	}
}

?>