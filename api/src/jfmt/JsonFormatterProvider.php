<?php
include_once 'core/Provider.php';
include_once 'core/ProviderIterator.php';

/**
 * Clase que formatea un proveedor en JSON
 * 
 * @author Germán Martínez
 *
 */
class JsonFormatterProvider
{
	/**
	 * Formatear
	 * 
	 * @param Provider|ProviderIterator|null $it Proveedor ó iterador de proveedores
	 */
	public static function format($it)
	{
		if($it instanceof Provider)
		{
			return array(
					'id' => $it->getId(),
					'name' => $it->getName(),
					'email' => $it->getEmail(),
					'phone' => $it->getPhone(),
					'company' => $it->getCompany()
			);
		}
		else if($it instanceof ProviderIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterProvider::format($it->getProvider()));
			}
			return $json;
		}
		return null;
	}
}

?>
