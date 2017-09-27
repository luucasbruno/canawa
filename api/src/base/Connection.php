<?php

require 'SQLQueryResult.php';
require 'SQLQueryResultIterator.php';

/**
 * Clase que mantiene una conexión con la base de datos
 */
class Connection
{
	/**
	 * @var mysqli
	 */
	private $conn;
	
	/**
	 * @var Connection Instancia única de ésta clase
	 */
	private static $instance;

	/**
	 * Generar una consulta
	 *
	 * @param string $query Consulta SQL
	 *
	 * @return SQLQueryResult|null
	 */
	public function query($query)
	{
		$r = $this->conn->query($query);
		if($this->conn->errno != 0)
		{
			$fn = '../dbg/debug-Connection.txt';

			file_put_contents($fn, "Fecha: " . date("Y/m/d H:i:s") . PHP_EOL, FILE_APPEND);
			file_put_contents($fn, "Error: " . $this->conn->error  . PHP_EOL, FILE_APPEND);
			file_put_contents($fn, "Consulta: " . $query  . PHP_EOL . PHP_EOL, FILE_APPEND);
			
			$json = array();
			$json['ret'] = ERROR___SQL_QUERY;
			$json['error'] = "Sql query error";
			echo json_encode($json);
			
			http_response_code(HTTP_RCODE___INTERNAL_SERVER_ERROR);
			exit;
			
			return null;
		}
		return new SQLQueryResult($r);
	}

	/**
	 * Obtener una instancia singleton de Connection
	 *
	 * @return Connection Conexión a la base de datos
	 */
	public static function getInstance()
	{
		if(is_null(self::$instance))
		{
			self::$instance = new self();
		}
		return self::$instance;
	}
	/**
	 * Clonación
	 * Se establece como función privada para evitar que el objeto pueda ser clonado
	 */
	private function __clone()
	{
	}
	/**
	 * Constructor
	 */
	private function __construct()
	{
		$server = "localhost";
		$db_name = "canawa";
		$db_username = "root";
		$db_password = "159951lucas";
		
		$this->conn = new mysqli($server, $db_username, $db_password, $db_name);
		$this->conn->query("SET NAMES 'utf8';");
		if($this->conn->connect_errno)
		{
			echo $this->conn->connect_errno;
			http_response_code(HTTP_RCODE___INTERNAL_SERVER_ERROR);
		}
	}
}


?>
