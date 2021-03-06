<?php
include_once 'core/Delivery.php';
include_once 'core/DeliveryIterator.php';

/**
 * Clase que administra las entregas
 * 
 * @author Germán Martínez
 *
 */
class DeliveryManager
{
	/**
	 * Agregar una entrega
	 * 
	 * @param integer $saleId Id de la venta
	 * @param string $date Fecha de la entrega
	 * @param string $location Dirección de la entrega
	 * 
	 * @return Delivery|integer Entrega ó código de error
	 */
	public static function addDelivery($saleId, $date, $location)
	{
		$id = createId();
		
		$con = Connection::getInstance();
		
		$res = $con->query("INSERT INTO `DELIVERY`(`ID`,`SALE_ID`,`DATE`,`LOCATION`,`DELIVERED`) VALUES('$id','$saleId','$date','$location','FALSE');");
		
		return new Delivery($id);
	}
	/**
	 * Obtener todos las entregas
	 * 
	 * @return DeliveryIterator Iterador de entregas
	 */
	public static function getDeliveries()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `DELIVERY`;");
		return new DeliveryIterator($res);
	}
	/**
	 * Obtener las entregas del día actual
	 *
	 * @return DeliveryIterator Iterador de entregas
	 */
	public static function getTodayDeliveries()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `DELIVERY` WHERE `DATE`=DATE(SYSDATE());");
		return new DeliveryIterator($res);
	}
	/**
	 * Obtener las entregas pendientes
	 *
	 * @return DeliveryIterator Iterador de entregas
	 */
	public static function getPendingDeliveries()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `DELIVERY` WHERE `DELIVERED`=FALSE;");
		return new DeliveryIterator($res);
	}
	/**
	 * Obtener las entregas atrasadas
	 * 
	 * @return DeliveryIterator Iterador de entregas
	 */
	public static function getDelayedDeliveries()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `DELIVERY` WHERE `DATE` < SYSDATE() AND `DELIVERED`=FALSE;");
		return new DeliveryIterator($res);
	}
}

?>
