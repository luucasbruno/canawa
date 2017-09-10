<?php
include_once 'core/Category.php';
include_once 'core/CategoryIterator.php';

/**
 * Clase que administra las categorías
 * 
 * @author Germán Martínez
 *
 */
class CategoryManager
{
	/**
	 * Agregar una nueva categoría
	 * 
	 * @param string $description Descripción de la categoría
	 * 
	 * @return Category|integer Categoría ó código de error
	 * 
	 * @see ERROR___NOT_CREATED
	 * @see ERROR___ALREADY_EXISTS
	 */
	public static function addCategory($description)
	{
		if(empty($description))
		{
			return ERROR___NOT_CREATED;
		}
		$con = Connection::getInstance();
		
		//
		// Buscar la categoria
		//
		$res = $con->query("SELECT `ID` FROM `CATEGORY` WHERE `DESCRIPTION`='$description';");
		
		// Comprobar si existe
		if(null != ($data = $res->fetch_array()))
		{
			return ERROR___ALREADY_EXISTS;
		}
		//
		// Si no existe, crear la categoria
		//
		$id = createId();
		$res = $con->query("INSERT INTO `CATEGORY` (`ID`, `DESCRIPTION`) VALUES ('$id', '$description');");
		
		return new Category($id);
	}
	/**
	 * Modificar la descripción de la categoría
	 * 
	 * @param integer $id Id de la categoría
	 * @param string $newDescription Nueva descripción de la categoría
	 * 
	 * @return integer SUCCESS ó código de error
	 * 
	 * @see ERROR___INVALID_ID
	 * @see ERROR___ALREADY_EXISTS
	 */
	public static function renameCategory($id, $newDescription)
	{
		return renameFieldOfTable('CATEGORY', 'DESCRIPTION', $id, $newDescription);
	}
	/**
	 * Obtener todas las categorías
	 * 
	 * @return CategoryIterator Iterador de categorías
	 */
	public static function getCategories()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `CATEGORY`;");
		return new CategoryIterator($res);
	}
	/**
	 * Buscar categorías
	 * 
	 * @param string $pattern Patrón de búsqueda
	 * 
	 * @return CategoryIterator Iterador de categorías
	 */
	public static function searchCategories($pattern)
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `CATEGORY` WHERE `DESCRIPTION` LIKE '%$pattern%';");
		return new CategoryIterator($res);
	}
}

?>
