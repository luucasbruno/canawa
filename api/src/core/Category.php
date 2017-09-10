<?php

/**
 * Clase que representa una categoria de producto
 * 
 * @author Germán Martínez
 *
 */
class Category
{
	private $categoryId;
	
	/**
	 * Constructor
	 *
	 * @param integer $id Id de la categoría
	 */
	public function __construct($id)
	{
		$this->categoryId = $id;
	}
	/**
	 * Obtener el id de la categoría
	 * 
	 * @return integer Id de la categoría
	 */
	public function getId()
	{
		return $this->categoryId;
	}
	/**
	 * Obtener la descripción de la categoría
	 * 
	 * @return string Descripción de la categoría
	 */
	public function getDescription()
	{
		return getFieldFromTable('CATEGORY', 'DESCRIPTION', $this->categoryId);
	}
}


?>