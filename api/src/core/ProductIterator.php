<?php

/**
 * Iterador de productos
 * 
 * @author Germán Martínez
 *
 */
class ProductIterator extends SQLQueryResultIterator
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
	 * Obtener el producto actual del iterador
	 *
	 * @return Product Producto
	 */
	public function getProduct()
	{
		return new Product($this->data['ID']);
	}
}

?>
