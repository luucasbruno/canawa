<?php
include_once 'core/Category.php';
include_once 'core/CategoryIterator.php';

/**
 * Clase que formatea una categoría en JSON
 * 
 * @author Germán Martínez
 *
 */
class JsonFormatterCategory
{
	/**
	 * Formatear
	 * 
	 * @param Category|CategoryIterator|null $it Categoría ó iterador de categorías
	 */
	public static function format($it)
	{
		if($it instanceof Category)
		{
			return array(
					'id' => $it->getId(),
					'description' => $it->getDescription()
			);
		}
		else if($it instanceof CategoryIterator)
		{
			$json = array();
			while($it->hasMore())
			{
				array_push($json, JsonFormatterCategory::format($it->getCategory()));
			}
			return $json;
		}
		return null;
	}
}

?>
