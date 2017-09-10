<?php
include_once 'core/Client.php';
include_once 'core/ClientIterator.php';

/**
 * Clase que formatea un cliente en JSON
 * 
 * @author Germán Martínez
 *
 */
class JsonFormatterClient
{
	/**
	 * Formatear
	 * 
	 * @param Client|ClientIterator|null $it Cliente ó iterador de clientes
	 */
	public static function format($it)
	{
		if($it instanceof Client)
		{
			return array(
					'id' => $it->getId(),
					'name' => $it->getName(),
					'cuit' => $it->getCuit(),
					'email' => $it->getEmail(),
					'phone' => $it->getPhone(),
					'location' => $it->getLocation()
			);
		}
		else if($it instanceof ClientIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterClient::format($it->getClient()));
			}
			return $json;
		}
		return null;
	}
}

?>
