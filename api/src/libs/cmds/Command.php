<?php

/**
 * Esta interface representa un comando asociado a una URL
 * 
 * @author Germán Martínez
 * 
 */
interface Command
{
	/**
	 * Ejecutar comando
	 * 
	 * @param string $method            Método de la solicitud
	 * @param array  $uriParameters     Lista de parámetros URI
	 * @param array  $queryParameters   Lista de parámetros de consulta
	 * 
	 * @return integer Código HTTP
	 */
	public function run($method, $uriParameters, $queryParameters);
}

?>
