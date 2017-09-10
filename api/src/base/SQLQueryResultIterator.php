<?php

/**
 * Esta clase facilita la iteración de filas de un resultado de una consulta
 */
class SQLQueryResultIterator
{
	/**
	 * 
	 * @var SQLQueryResult
	 */
	protected $res;
	/**
	 * 
	 * @var array
	 */
	protected $data;

	/**
	 * Constructor
	 *
	 * @param SQLQueryResult $res Resultado de una consulta SQL
	 */
	public function __construct($res)
	{
		$this->res = $res;
		$this->data = null;
	}
	
	/**
	 * Determinar si hay más elementos pendientes en el iterador
	 *
	 * @return boolean
	 */
	public function hasMore()
	{
		if(null != ($this->data = $this->res->fetch_array())) return true; return false;
	}
	/**
	 * Obtener los datos de la instancia actual en el iterador
	 * 
	 * @return array
	 */
	public function getData()
	{
		return $this->data;
	}
	/**
	 * Obtener la contidad de elementos
	 */
	public function getCount()
	{
		if($this->res == null)
			return 0;
		return $this->res->num_rows();
	}
}

?>
