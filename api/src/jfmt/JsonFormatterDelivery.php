<?php
include_once 'core/Delivery.php';
include_once 'core/DeliveryIterator.php';

/**
 * Clase que formatea una entrega en JSON
 *
 * @author Germán Martínez
 *
 */
class JsonFormatterDelivery
{
	/**
	 * Formatear
	 *
	 * @param Delivery|DeliveryIterator|null $it Entrega ó iterador de entregas
	 */
	public static function format($it)
	{
		if($it instanceof Delivery)
		{
			return array(
					'id' => $it->getId(),
					'sale_id' => $it->getSale()->getId(),
					'date' => $it->getDate(),
					'location' => $it->getLocation(),
					'delivered' => $it->isDelivered()
			);
		}
		else if($it instanceof DeliveryIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterDelivery::format($it->getDelivery()));
			}
			return $json;
		}
		return null;
	}
}

?>