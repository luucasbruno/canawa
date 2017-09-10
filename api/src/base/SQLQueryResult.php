<?php

/**
 * Clase que facilita la manipulación del resultado de una consulta SQL
 */
class SQLQueryResult
{
	/**
	 * @var mysqli_result
	 */
	private $res;

	/**
	 * Constructor
	 * 
	 * @param mysqli_result $res Resultado de una consulta
	 */
	public function __construct($res)
	{
		$this->res = $res;
	}
	/**
	 * Obtener la cantidad de filas
	 * 
	 * @return number Cantidad de filas
	 */
	public function num_rows()
	{
		return mysqli_num_rows($this->res);
	}
	/**
	 * Obtener una fila del resultado de una consulta como un array asociativo
	 * 
	 * @return array Arreglo asociativo referente a la fila actual del resultado de una consulta
	 */
	public function fetch_array()
	{
		return mysqli_fetch_array($this->res, MYSQLI_ASSOC);
	}
}

?>
