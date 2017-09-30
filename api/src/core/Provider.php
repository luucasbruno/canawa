<?php

/**
 * Clase que representa un proveedor
 * 
 * @author Germán Martínez
 *
 */
class Provider
{
	private $providerId;
	
	/**
	 * Constructor
	 *
	 * @param integer $id Id del proveedor
	 */
	public function __construct($id)
	{
		$this->providerId = $id;
	}
	/**
	 * Obtener el id del proveedor
	 * 
	 * @return integer Id del proveedor
	 */
	public function getId()
	{
		return $this->providerId;
	}
	/**
	 * Obtener el nombre del proveedor
	 * 
	 * @return string Nombre del proveedor
	 */
	public function getName()
	{
		return getFieldFromTable('PROVIDER', 'NAME', $this->providerId);
	}
	/**
	 * Obtener el email del proveedor
	 * 
	 * @return string Email del proveedor
	 */
	public function getEmail()
	{
		return getFieldFromTable('PROVIDER', 'EMAIL', $this->providerId);
	}
	/**
	 * Obtener el teléfono del proveedor
	 *
	 * @return string Teléfono del proveedor
	 */
	public function getPhone()
	{
		return getFieldFromTable('PROVIDER', 'PHONE', $this->providerId);
	}
	/**
	 * Obtener el Empresa del proveedor
	 *
	 * @return string Empresa del proveedor
	 */
	public function getCompany()
	{
		return getFieldFromTable('PROVIDER', 'COMPANY', $this->providerId);
	}
}

?>