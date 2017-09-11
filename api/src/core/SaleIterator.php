<?php

/**
 * Iterador de ventas
 *
 * @author Germán Martínez
 *
 */
class SaleIterator extends SQLQueryResultIterator
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
	 * Obtener la venta actual del iterador
	 *
	 * @return Sale Proveedor
	 */
	public function getSale()
	{
		return new Sale($this->data['ID']);
	}
}


?>