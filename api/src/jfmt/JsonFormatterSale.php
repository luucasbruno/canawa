<?php
include_once 'core/Sale.php';
include_once 'core/SaleIterator.php';

/**
 * Clase que formatea una venta en JSON
 *
 * @author Germán Martínez
 *
 */
class JsonFormatterSale
{
	/**
	 * Formatear
	 *
	 * @param Sale|SaleIterator|null $it Venta ó iterador de ventas
	 */
	public static function format($it)
	{
		if($it instanceof Sale)
		{
			return array(
					'id' => $it->getId(),
					'user' => $it->getUser()->getName(),
					'client' => $it->getClient()->getName(),
					'total' => $it->getTotal(),
					'timestamp' => $it->getTimestamp()
			);
		}
		else if($it instanceof SaleIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterSale::format($it->getSale()));
			}
			return $json;
		}
		return null;
	}
}

?>