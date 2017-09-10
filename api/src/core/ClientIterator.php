<?php

/**
 * Iterador de clientes
 *
 * @author Germán Martínez
 *
 */
class ClientIterator extends SQLQueryResultIterator
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
	 * Obtener el cliente actual del iterador
	 *
	 * @return Client Cliente
	 */
	public function getClient()
	{
		return new Client($this->data['ID']);
	}
}

?>