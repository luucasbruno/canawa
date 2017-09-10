<?php

/**
 * Iterador de marcas
 * 
 * @author Germán Martínez
 *
 */
class BrandIterator extends SQLQueryResultIterator
{
	/**
	 * Constructor
	 *
	 * @param SQLQueryResult $res Resultado de una consulta SQL[ID]
	 */
	public function __construct($res)
	{
		parent::__construct($res);
	}
	/**
	 * Obtener la marca actual del iterador
	 * 
	 * @return Brand Marca
	 */
	public function getBrand()
	{
		return new Brand($this->data['ID']);
	}
}

?>
