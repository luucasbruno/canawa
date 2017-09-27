<?php

/**
 * Iterador de entregas
 *
 * @author Germán Martínez
 *
 */
class DeliveryIterator extends SQLQueryResultIterator
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
	 * Obtener la entrega actual del iterador
	 *
	 * @return Delivery Entrega
	 */
	public function getDelivery()
	{
		return new Delivery($this->data['ID']);
	}
}

?>