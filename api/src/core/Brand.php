<?php

/**
 * Clase que representa una marca
 * 
 * @author Germán Martínez
 *
 */
class Brand
{
	private $brandId;
	
	/**
	 * Constructor
	 * 
	 * @param integer $id Id de la marca
	 */
	public function __construct($id)
	{
		$this->brandId = $id;
	}
	/**
	 * Obtener el id de la marca
	 * 
	 * @return integer Id de la marca
	 */
	public function getId()
	{
		return $this->brandId;
	}
	/**
	 * Obtener el nombre de la marca
	 * 
	 * @return string Nombre de la marca
	 */
	public function getName()
	{
		return getFieldFromTable('BRAND', 'NAME', $this->brandId);
	}
	/**
	 * Obtener la url de la imagen del logo de la marca
	 * 
	 * @return string URL de la imagen del logo de la marca
	 */
	public function getLogo()
	{
		return getFieldFromTable('BRAND', 'LOGO', $this->brandId);
	}
}

?>