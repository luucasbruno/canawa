<?php
include_once 'core/Brand.php';
include_once 'core/BrandIterator.php';

/**
 * Clase que formatea una marca en JSON
 * 
 * @author Germán Martínez
 *
 */
class JsonFormatterBrand
{
	/**
	 * Formatear
	 * 
	 * @param Brand|BrandIterator|null $it Marca ó iterador de marcas
	 */
	public static function format($it)
	{
		if($it instanceof Brand)
		{
			return array(
				'id' => $it->getId(),
				'name' => $it->getName(),
				'logo' => $it->getLogo());
		}
		else if($it instanceof BrandIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterBrand::format($it->getBrand()));
			}
			return $json;
		}
		return null;
	}
}

?>