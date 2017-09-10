<?php

include_once 'Token.php';
include_once 'Lexer.php';
include_once 'Command.php';


/**
 * Esta clase es el analizador sintáctico del archivo de configuración de comandos asociados a la URL, y devuelve el comando
 * 
 * @author Germán Martínez
 * 
 */
class CommandFactory
{
	/**
	 * @var Token
	 */
	private $tok;
	
	/**
	 * @var Lexer
	 */
	private $lex;
	
	/**
	 * @param string  $basePath          Directorio a partir de donde se buscan los comandos
	 * @param string  $fileName          Nombre del archivo que contiene la configuración de comandos
	 * @param string  $method            Método de la solicitud HTTP
	 * @param array   $request           Arreglo de las partes que componen a la URL de la solicitud HTTP
	 * @param Command $command           Comando
	 * @param array   $uriParameters     Lista de parámetros URI
	 * @param array   $queryParameters   Lista de parámetros de consulta
	 * 
	 * @return integer Código HTTP
	 * 
	 * @see HTTP_RCODE___OK
	 * @see HTTP_RCODE___NOT_FOUND
	 * @see HTTP_RCODE___METHOD_NOT_ALLOWED
	 * @see HTTP_RCODE___INTERNAL_SERVER_ERROR
	 */
	public function parse($basePath, $fileName, $method, $request, &$command, &$uriParameters, &$queryParameters)
	{
		$this->lex = new Lexer();
		if(!$this->lex->init($fileName))
		{
			fatal('No se pudo abrir el archivo de comandos \"' . $fileName . '\"');
			return HTTP_RCODE___INTERNAL_SERVER_ERROR;
		}
		else
		{
			// Obtener token inicial
			$this->tok = $this->next();
			
			//
			// Parser el archivo
			//
			while($this->tok->id() != TOK_EOF)
			{
				if($this->tok->id() == '/')
				{
					if(!$this->checkURL($request, $uriParameters))
					{
						$this->lex->skipLine();
					}
					else
					{
						//
						// Obtener la ruta del comando
						//
						$commandPath = $this->getCommandPath();
							
						//
						// Obtener el nombre del comando
						//
						$commandName = $this->getCommandName();
							
						//
						// Obtener los métodos disponibles para el comando
						//
						$commandMethods = $this->getCommandMethods();
						
						//
						// Comprobar que el método de solicitud está dentro
						// de la lista de métodos disponibles para este comando
						//
						if(!in_array($method, $commandMethods))
						{
							return HTTP_RCODE___METHOD_NOT_ALLOWED;
						}
						//
						// Obtener la lista de párametros de la consulta
						//
						switch($method)
						{
							case 'GET':
								$queryParameters = $_GET;
								break;
							case  'POST':
								$queryParameters = $_POST;
								break;
							case 'PUT':
							case 'PATCH':
							case 'DELETE':
								parse_str(file_get_contents('php://input'), $queryParameters);
								break;
						}
						//
						// Cargar el archivo que contiene el comando
						//
						$finalPath = $basePath . $commandPath. '/' . $commandName . '.php';
						if(!file_exists($finalPath))
						{
							fatal("Archivo de comando inexistente ($commandName)");
							return HTTP_RCODE___INTERNAL_SERVER_ERROR;
						}
						include $finalPath;
						
						//
						// Crear el comando
						//
						$s = $commandName;
						$command = new $s;
						
						// OK
						return HTTP_RCODE___OK;
					}
				}
				else
				{
					$this->next();
				}
			}
			$this->lex->close();
		}
		//
		// Si se llegó hasta acá, no se encontró el comando asociado a la URL
		//
		return HTTP_RCODE___NOT_FOUND;
	}

	/**
	 * Obtener el siguiente token
	 *
	 * @return Token
	 */
	private function next()
	{
		$this->tok = $this->lex->getToken();
	
		return $this->tok;
	}
	/**
	 * Comprobar que el token actual es el token esperado, y pasa al siguiente
	 *
	 * @param string $t
	 *
	 * @return Token
	 */
	private function match($t)
	{
		if($this->tok->id() == $t)
		{
			return $this->next();
		}
		else
		{
			echo 'ERROR: Se esperaba "', $t, '" pero se encontró "', $this->tok->id(), '".';
			return $this->next();
		}
	}
	/**
	 * Comprobar si la URL actual en el archivo de configuración es la misma a la que se obtuvo en la solicitud
	 * 
	 * @param array $urlParts      Arreglo con conforma las partes de la url
	 * @param array $uriParameters Arreglo donde se almacenarán los argumentos en la URL
	 * 
	 * @return boolean true|false
	 */
	private function checkURL($urlParts, &$uriParameters)
	{
		$tok = $this->tok;
		// ...
		// ...
		$partIndex = 0;
		$uriParameters = array();
		while($tok->id() != '|' && $tok->id() != TOK_EOF)
		{
			// Obtener la parte actual de la URL
			$part = $urlParts[$partIndex];
			
			// Saltear /
			$tok = $this->match('/');
			// ...
			if($tok->id() == '{')
			{
				$tok = $this->next();
				array_push($uriParameters, $part);
				$tok = $this->next();
				$tok = $this->match('}');
			}
			else
			{
				if($tok->lexeme() != $part)
				{
					return false;
				}
				$tok = $this->next();
			}
			// Abanzar el índice de la parte actual
			$partIndex++;
			// Si el índice de la parte actual ha llegado a la cantidad de partes de la URL cortar el bucle
			if($partIndex == count($urlParts))
			{
				break;
			}
		}
		if($partIndex == count($urlParts) && $tok->id() == '|')
		{
			return true;
		}
		return false;
	}
	/**
	 * Obtener el camino donde de encuentra el archivo donde está la implementación del comando
	 * 
	 * @return string
	 */
	private function getCommandPath()
	{
		$tok = $this->match('|');
		// ...
		$path = '';
		while($tok->id() != '|' && $tok->id() != TOK_EOF)
		{
			$path .= $tok->lexeme();
			// ...
			$tok = $this->next();
		}
		return $path;
	}
	/**
	 * Obtener el nombre de la clase del comando
	 * 
	 * @return string Nombre del comando
	 */
	private function getCommandName()
	{
		$tok = $this->match('|');
		// ...
		if($tok->id() != TOK_LEXEME)
		{
			// TODO: tratar error
		}
		$name = $tok->lexeme();
		$this->next();
		return $name;
	}
	/**
	 * Obtener la lista de métodos disponibles para el comando
	 * 
	 * @return array Arreglo de los nombres de los métodos
	 */
	private function getCommandMethods()
	{
		$tok = $this->match('|');
		
		// Arreglo de los métodos
		$methods = array();
		
		// Almacenar la línea actual
		$currentLine = $tok->line();
		
		//
		// Leer mientras no se llege al final del archivo o hasta que pase a la siguiente línea
		//
		while($tok->id() != TOK_EOF && $tok->line() == $currentLine)
		{
			if($tok->id() == ',')
			{
				$tok = $this->next();
			}
			array_push($methods, $tok->lexeme());
			$tok = $this->next();
		}
		// ...
		return $methods;
	}
}

?>
