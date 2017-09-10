<?php

/**
 * Iterador de proveedores
 *
 * @author Germán Martínez
 *
 */
class ProviderIterator extends SQLQueryResultIterator
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
	 * Obtener el proveedor actual del iterador
	 *
	 * @return Provider Proveedor
	 */
	public function getProvider()
	{
		return new Provider($this->data['ID']);
	}
}


?>