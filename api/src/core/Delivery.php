<?php
include_once 'core/Sale.php';

/**
 * Clase que representa una entrega
 * 
 * @author Germán Martínez
 *
 */
class Delivery
{
	private $deliveryId;
	
	/**
	 * Constructor
	 *
	 * @param integer $id Id de la entrega
	 */
	public function __construct($id)
	{
		$this->deliveryId = $id;
	}
	/**
	 * Obtener id de la entrega
	 *
	 * @return integer Id de la entrega
	 */
	public function getId()
	{
		return $this->deliveryId;
	}
	/**
	 * Obtener la venta a la que pertenece la entrega
	 * 
	 * @return Sale Venta
	 */
	public function getSale()
	{
		return new Sale(getFieldFromTable('DELIVERY', 'SALE_ID', $this->deliveryId));
	}
	/**
	 * Obtener fecha de entrega
	 * 
	 * @return string Fecha de entrega
	 */
	public function getDate()
	{
		return getFieldFromTable('DELIVERY', 'DATE', $this->deliveryId);
	}
	/**
	 * Obtener dirección de la entrega
	 * 
	 * @return string Dirección de la entrega
	 */
	public function getLocation()
	{
		return getFieldFromTable('DELIVERY', 'LOCATION', $this->deliveryId);
	}
	/**
	 * Proguntar si la entrega se ha realizado
	 * 
	 * @return boolean true|false
	 */
	public function isDelivered()
	{
		return getFieldFromTable('DELIVERY', 'DELIVERED', $this->deliveryId);
	}
	/**
	 * Marcar si la entrega ha sido entregada
	 * 
	 * @param bool $delivered true|false
	 */
	public function markDelivered($delivered)
	{
		$con = Connection::getInstance();
		$res = $con->query("UPDATE `DELIVERY` SET `DELIVERED` = '$delivered' WHERE `DELIVERY`.`ID` = '$this->deliveryId';");
	}
}

?>
