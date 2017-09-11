<?php
include_once 'core/Sale.php';
include_once 'core/Product.php';
include_once 'core/SaleIterator.php';

/**
 * Clase que administra las ventas
 * 
 * @author Germán Martínez
 *
 */
class SaleManager
{
	/**
	 * Hacer una venta
	 * 
	 * @param integer $userId Id del usuario del sistema
	 * @param integer $clientId Id del cliente que hace la compra
	 * @param integer $clientType Tipo de cliente, minorista si $clientType==0, y mayorista $clientType!=0
	 * @param array   $productIds Arreglo de ids de productos
	 * @param array   $productCounts Arreglo de cantidades de cada producto
	 * 
	 * @return Sale|integer Venta ó código de error
	 * 
	 * @see ERROR_SALE___NOT_PRODUCTS
	 * @see ERROR_SALE___INCONSISTENT_IDS_AND_COUNTS
	 */
	public static function addSale($userId, $clientId, $clientType, $productIds, $productCounts)
	{
		// Cantidad de productos
		$count = count($productIds);
		if($count == 0)
		{
			return ERROR_SALE___ZERO_PRODUCTS;
		}
		// Comprobar consistencia de cantidad de ids y cantidad de cantidades de producto
		if(count($productIds) != count($productCounts))
		{
			return ERROR_SALE___INCONSISTENT_IDS_AND_COUNTS;
		}
		
		// Obtener conexión
		$con = Connection::getInstance();
		
		// Crear id de la venta
		$saleId = createId();
		
		//
		// Calcular total
		//
		$total = 0;
		for($i = 0; $i < $count; $i++)
		{
			// Id del producto
			$id = $productIds[$i];
			
			// Cantidad del producto
			$cnt = $productCounts[$i];
			
			// Obtener precio del producto
			if($clientType == 0)
				$total += (new Product($id))->getRetailPrice() * $cnt;
			else
				$total += (new Product($id))->getWholesalePrice() * $cnt;
		}
		
		//
		// Registrar la venta
		//
		$res = $con->query("INSERT INTO `SALE`(`ID`,`USER_ID`,`CLIENT_ID`,`TOTAL`,`TIMESTAMP`) VALUES('$saleId','$userId','$clientId','$total',SYSDATE());");
		
		//
		// Registrar los productos de la venta
		//
		for($i = 0; $i < $count; $i++)
		{
			// Id del producto
			$id = $productIds[$i];
			
			// Cantidad del producto
			$cnt = $productCounts[$i];
			
			// Obtener precio del producto
			if($clientType == 0)
				$price = (new Product($id))->getRetailPrice();
			else
				$price = (new Product($id))->getWholesalePrice();
			
			$total += $price;
			
			// Insertar en la tabla
			$res = $con->query("INSERT INTO `PRODUCT_X_SALE`(`SALE_ID`,`PRODUCT_ID`,`COUNT`,`PRICE`) VALUES('$saleId','$id','$cnt','$price');");
		}
		// Retornar venta
		return new Sale($saleId);
	}
	/**
	 * Obtener todas las ventas
	 * 
	 * @return SaleIterator Iterador de ventas
	 */
	public static function getSales()
	{
		$con = Connection::getInstance();
		$res = $con->query("SELECT `ID` FROM `SALE`;");
		return new SaleIterator($res);
	}
}

?>