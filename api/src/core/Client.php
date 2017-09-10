<?php

/**
 * Clase que representa un cliente
 * 
 * @author Germán Martínez
 *
 */
class Client
{
	private $clientId;
	
	/**
	 * Constructor
	 * 
	 * @param integer $id Id del cliente
	 */
	public function __construct($id)
	{
		$this->clientId = $id;
	}
	/**
	 * Obtener id del cliente
	 * 
	 * @return integer Id del cliente
	 */
	public function getId()
	{
		return $this->clientId;
	}
	/**
	 * Obtener el CUIT del cliente
	 * 
	 * @return string CUIT del cliente
	 */
	public function getCuit()
	{
		return getFieldFromTable('CLIENT', 'CUIT', $this->clientId);
	}
	/**
	 * Obtener el nombre del cliente
	 * 
	 * @return string Nombre del cliente
	 */
	public function getName()
	{
		return getFieldFromTable('CLIENT', 'NAME', $this->clientId);
	}
	/**
	 * Obtener el email del cliente
	 *
	 * @return string Email del cliente
	 */
	public function getEmail()
	{
		return getFieldFromTable('CLIENT', 'EMAIL', $this->clientId);
	}
	/**
	 * Obtener el teléfono del cliente
	 *
	 * @return string teléfono del cliente
	 */
	public function getPhone()
	{
		return getFieldFromTable('CLIENT', 'PHONE', $this->clientId);
	}
	/**
	 * Obtener la dirección del cliente
	 *
	 * @return string Dirección del cliente
	 */
	public function getLocation()
	{
		return getFieldFromTable('CLIENT', 'LOCATION', $this->clientId);
	}
}

?>
