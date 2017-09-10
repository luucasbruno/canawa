<?php

/**
 * Clase que representa un proveedor
 * 
 * @author Germán Martínez
 *
 */
class Provider
{
	private $idProveedor;
	
	/**
	 * Constructor
	 *
	 * @param integer $id Id del proveedor
	 */
	public function __construct($id)
	{
		$this->idProveedor = $id;
	}
	/**
	 * Obtener el id del proveedor
	 * 
	 * @return integer Id del proveedor
	 */
	public function getId()
	{
		return $this->idProveedor;
	}
	/**
	 * Obtener el nombre del proveedor
	 * 
	 * @return string Nombre del proveedor
	 */
	public function getName()
	{
		return getFieldFromTable('PROVIDER', 'NAME', $this->idProveedor);
	}
	/**
	 * Obtener el email del proveedor
	 * 
	 * @return string Email del proveedor
	 */
	public function getEmail()
	{
		return getFieldFromTable('PROVIDER', 'EMAIL', $this->idProveedor);
	}
	/**
	 * Obtener el teléfono del proveedor
	 *
	 * @return string Teléfono del proveedor
	 */
	public function getPhone()
	{
		return getFieldFromTable('PROVIDER', 'PHONE', $this->idProveedor);
	}
	/**
	 * Obtener el Empresa del proveedor
	 *
	 * @return string Empresa del proveedor
	 */
	public function getCompany()
	{
		return getFieldFromTable('PROVIDER', 'COMPANY', $this->idProveedor);
	}
}

?>