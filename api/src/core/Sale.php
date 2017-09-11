<?php
include_once 'core/User.php';
include_once 'core/Client.php';

/**
 * Clase que representa una venta
 * 
 * @author Germán Martínez
 *
 */
class Sale
{
	private $idSale;
	
	/**
	 * Constructor
	 *
	 * @param integer $id Id de la venta
	 */
	public function __construct($id)
	{
		$this->idSale = $id;
	}
	/**
	 * Obtener el id de la venta
	 *
	 * @return integer Id de la venta
	 */
	public function getId()
	{
		return $this->idSale;
	}
	/**
	 * Obtener el usuario que hizo la venta
	 * 
	 * @return User Usuario
	 */
	public function getUser()
	{
		return new User(getFieldFromTable('SALE', 'USER_ID', $this->idSale));
	}
	/**
	 * Obtener el cliente que hizo que es la compra
	 * 
	 * @return Client Cliente
	 */
	public function getClient()
	{
		return new Client(getFieldFromTable('SALE', 'CLIENT_ID', $this->idSale));
	}
	/**
	 * Obtener el total de la venta
	 * 
	 * @return string Valor total de la venta
	 */
	public function getTotal()
	{
		return getFieldFromTable('SALE', 'TOTAL', $this->idSale);
	}
	/**
	 * Obtener fecha de estampa de la venta
	 * 
	 * @return string Fecha de estampa de la venta
	 */
	public function getTimestamp()
	{
		return getFieldFromTable('SALE', 'TIMESTAMP', $this->idSale);
	}
}

?>