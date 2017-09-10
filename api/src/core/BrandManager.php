<?php
include_once 'core/Brand.php';
include_once 'core/BrandIterator.php';

/**
 * Clase que administra las marcas
 * 
 * @author Germán Martínez
 *
 */
class BrandManager
{
	/**
	 * Agregar una marca al sistema
	 * 
	 * @param string $name Nombre de la marca
	 * @param string $logo Dirección URL del una imagen como logo
	 * 
	 * @return Marca|integer Marca ó código de error
	 * 
	 * @see ERROR___SQL_QUERY
	 * @see ERROR___ALREADY_EXISTS
	 */
	public static function addBrand($name, $logo)
	{
		// Obtener la conexión
		$con = Connection::getInstance();
		
		//
		// Buscar si la marca ya esta registrada
		//
		$res = $con->query("SELECT `ID` FROM `BRAND` WHERE `NAME`='$name';");
		if(null != ($data = $res->fetch_array()))
		{
			return ERROR___ALREADY_EXISTS;
		}
		//
		// Crear un nuevo id
		//
		$id = createId();
		
		//
		// Insertar la marca
		//
		$res = $con->query("INSERT INTO `BRAND` VALUES('$id', '$name', '$logo');");
		
		return new Brand($id);
	}
	/**
	 * Renombrar marca
	 * 
	 * @param integer $id Id de la marca
	 * @param string  $newName Nuevo nombre de la marca
	 * 
	 * @return integer SUCCESS ó código de error
	 * 
	 * @see ERROR___INVALID_ID
	 * @see ERROR___ALREADY_EXISTS
	 */
	public static function renameBrand($id, $newName)
	{
		return renameFieldOfTable('BRAND', 'NAME', $id, $newName);
		/*
		// Obtener la conexión
		$con = Connection::getInstance();
		
		//
		// Comprobar si es un id válido
		//
		$res = $con->query("SELECT `ID` FROM `BRAND` WHERE `ID`='$id';");
		if(null == ($data = $res->fetch_array()))
		{
			return ERROR___INVALID_ID;
		}
		//
		// Buscar si el nuevo nombre de marca ya esta registrada
		//
		$res = $con->query("SELECT `ID` FROM `BRAND` WHERE `NAME`='$newName' AND `ID` <> '$id';");
		if(null != ($data = $res->fetch_array()))
		{
			return ERROR___ALREADY_EXISTS;
		}
		//
		// Renombrar
		//
		$res = $con->query("UPDATE `BRAND` SET `NAME` = '$newName' WHERE `BRAND`.`ID` = '$id';");
		
		return SUCCESS;
		*/
	}
	/**
	 * Obtener todas las marcas
	 * 
	 * @return BrandIterator Iterador de marcas
	 */
	public static function getBrands()
	{
		// Obtener la conexión
		$con = Connection::getInstance();
		
		// Obtener los ids
		$res = $con->query("SELECT `ID` FROM `BRAND`;");
		
		// Retornar iterador
		return new BrandIterator($res);
	}
	/**
	 * Buscar marcas por nombre
	 * 
	 * @param string $pattern Patrón de búsqueda
	 * 
	 * @return BrandIterator Iterador de marcas
	 */
	public static function searchBrands($pattern)
	{
		// Obtener la conexión
		$con = Connection::getInstance();
		
		// Obtener los ids
		$res = $con->query("SELECT `ID` FROM `BRAND` WHERE `NAME` LIKE '%$pattern%';");
		
		// Retornar iterador
		return new BrandIterator($res);
	}
}

?>