<?php

/**
 * Esta clase es la clase llamadora de comandos
 * 
 * @author Germán Martínez
 *
 */
class CommandCaller
{
	/**
	 * Iniciar la llamada al comando
	 * 
	 * @param string $apiName       Nombre de la API
	 * @param string $commandsPath  Directorio donde están los comandos
	 * @param string $commandsFile  Archivos de configuración de comandos
	 */
	public static function run($apiName, $commandsPath, $commandsFile)
	{
////////////////////////////////////////////////////////////////////////////////////////////////////
		//
		// Obtener el método de la solicitud
		//
		$method = strtoupper($_SERVER['REQUEST_METHOD']);
		if($method == 'OPTIONS') die();
		
		//
		// Obtener los elementos que componen a la URL de la solicitud
		//
		if(!isset($_SERVER['PATH_INFO']))
			$urlElements = [];
		else
			$urlElements = explode('/', trim($_SERVER['PATH_INFO'], '/'));
		
////////////////////////////////////////////////////////////////////////////////////////////////////
		if(count($urlElements) == 0)
		{
			echo $apiName;
		}
		else
		{
			include_once 'CommandFactory.php';
			
			$cf = new CommandFactory();
			$command = null;
			$uriParameters = null;
			$queryParameters = null;
			
			if(HTTP_RCODE___OK == ($ret = $cf->parse($commandsPath, $commandsFile, $method, $urlElements, $command, $uriParameters, $queryParameters)))
			{
				$ret = $command->run($method, $uriParameters, $queryParameters);
			}
			http_response_code($ret);
		}
////////////////////////////////////////////////////////////////////////////////////////////////////
	}
}

?>
