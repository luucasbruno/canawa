<?php
include_once 'core/Product.php';
include_once 'core/ProductIterator.php';

/**
 * Clase que formatea un producto en JSON
 * 
 * @author Germán Martínez
 *
 */
class JsonFormatterProduct
{
	/**
	 * Formatear
	 * 
	 * @param Producto|ProductoIterator|null $it Producto ó iterador de productos
	 */
	public static function format($it)
	{
		if($it instanceof Product)
		{
			return array(
					'id' => $it->getId(),
					'name' => $it->getName(),
					'brand' => $it->getBrand()->getName(),
					'provider' => $it->getProvider()->getName(),
					'category' => $it->getCategory()->getDescription(),
					'retail_price' => $it->getRetailPrice(),
					'wholesale_price' => $it->getWholesalePrice()
			);
		}
		else if($it instanceof ProductIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterProduct::format($it->getProduct()));
			}
			return $json;
		}
		return null;
	}
}

?>
