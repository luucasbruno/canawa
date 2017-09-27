<?php
//
// Referencias:
// 		https://carlosazaustre.es/blog/que-es-la-autenticacion-con-token/
// 		http://anexsoft.com/p/126/implementacion-de-json-web-token-con-php
// 		https://www.sitepoint.com/php-authorization-jwt-json-web-tokens/
// 		https://github.com/firebase/php-jwt
//

require_once 'libs/jwt/BeforeValidException.php';
require_once 'libs/jwt/ExpiredException.php';
require_once 'libs/jwt/SignatureInvalidException.php';
require_once 'libs/jwt/JWT.php';
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;

require_once 'base/AuthenticationToken.php';

/**
 * Esta clase se encarga de la generación y comprobación de tokens JWT para el acceso al sistema
 * 
 * @author Germán Martínez
 *
 */
class Authentication
{
	/**
	 * @var string Clase privada
	 */
	private static $SECRET_KEY = '1234567890';
	/**
	 * @var string Algoritmo utilizado
	 */
	private static $ALGORITHM = 'HS256';
	
	/**
	 * Generar token de acceso al sistema
	 *
	 * @param string $username Nombre de la cuenta
	 * @param string $password Contraseña de la cuenta
	 *
	 * @return string|integer Retorna token ó código de error.
	 * 
	 * @see ERROR___SQL_QUERY
	 * @see ERROR___EMPTY_USERNAME
	 * @see ERROR___EMPTY_PASSWORD
	 * @see ERROR___INVALID_USERNAME
	 * @see ERROR___INVALID_PASSWORD
	 * 
	 */
	public static function login($username, $password)
	{
		if(empty($username))
		{
			return ERROR___EMPTY_USERNAME;
		}
		if(empty($password))
		{
			return ERROR___EMPTY_PASSWORD;
		}
		//
		// Obtener conexión a la DB
		//
		$con = Connection::getInstance();
	
		//
		// Consulta a la DB
		//
		$res = $con->query("SELECT ID,NAME,PASSWORD,FULLNAME FROM USER WHERE NAME='$username';");
		//
		// Si no hay resultado, probablemente sea un error de la base de datos o la consulta
		//
		if(null == $res)
		{
			return ERROR___SQL_QUERY;
		}
		//
		// Si no hay datos, entonces el usuario no existe
		//
		if(null == ($data = $res->fetch_array()))
		{
			return ERROR___INVALID_USERNAME;
		}
		//
		// Comprobar la constraseña
		//
		if($data['PASSWORD'] != $password)
		{
			return ERROR___INVALID_PASSWORD;
		}
		return static::generateToken($data['ID'], $data['NAME'], $data['FULLNAME']);
	}

	/**
	 * Registrar un nuevo usuario
	 *
	 * @param string $username Nombre de usuario
	 * @param string $password Contraseña del usuario
	 *
	 * @return string|integer Retorna token ó código de error.
	 *
	 * @see ERROR___SQL_QUERY
	 * @see ERROR___EMPTY_USERNAME
	 * @see ERROR___EMPTY_PASSWORD
	 * @see ERROR___USERNAME_ALREADY_EXISTS
	 */
	public static function register($username, $password)
	{
		if(empty($username))
		{
			return ERROR___EMPTY_USERNAME;
		}
		if(empty($password))
		{
			return ERROR___EMPTY_PASSWORD;
		}
		$con = Connection::getInstance();
		//
		// Comprobar si el usuario ya existe
		//
		$res = $con->query("SELECT ID FROM USER WHERE NAME='$username';");
		if(null == $res)
		{
			return ERROR___SQL_QUERY;
		}
		if(null != ($data = $res->fetch_array()))
		{
			return ERROR___USERNAME_ALREADY_EXISTS;
		}
		//
		// Calcular el siguiente id
		//
		$res = $con->query("SELECT MAX(ID) AS MAXID FROM USER;");
		if(null == $res)
		{
			return ERROR___SQL_QUERY;
		}
		$data = $res->fetch_array();
		$userId = ($data == NULL) ? 1 : ($data['MAXID'] + 1);
		
		//
		// Registrar en la db
		//
		$res = $con->query("INSERT INTO USER(ID,NAME,PASSWORD) VALUES('$userId','$username','$password');");
		if(null == $res)
		{
			return ERROR___SQL_QUERY;
		}
		// ...
		return static::generateToken($userId, $username, null);
	}
	/**
	 * Desregistrarse del sistema
	 * 
	 * @param User $user Usuario
	 * @param string $password Contraseña
	 * 
	 * @return integer SUCCESS ó código de error
	 */
	public static function unregister($user, $password)
	{
		$id = $user->getId();
		$con = Connection::getInstance();
		$res = $con->query("SELECT PASSWORD FROM USER WHERE ID='$id';");
		if(null == ($data = $res->fetch_array()))
		{
			return ERROR___SQL_QUERY;
		}
		if($data['PASSWORD'] != $password)
		{
			return ERROR___INVALID_PASSWORD;
		}
		$res = $con->query("DELETE FROM USER WHERE ID='$id';");
		return SUCCESS;
	}
	/**
	 * Obtener el token
	 * 
	 * @return AuthenticationToken|NULL
	 */
	public static function token()
	{
		try
		{
			$auth = null;
			$headers = apache_request_headers();
			
			if(isset($headers['authorization']))
			{
				$auth = $headers['authorization'];
			}
			else if(isset($headers['Authorization']))
			{
				$auth = $headers['Authorization'];
			}
			if($auth != null)
			{
				list($jwt) = sscanf($auth, "%s");
				
				if($jwt)
				{
					$token = new AuthenticationToken(JWT::decode($jwt, self::$SECRET_KEY, [self::$ALGORITHM]));
					return $token;
				}
			}
			else
			{
			}
		}
		catch(UnexpectedValueException $e)
		{
			// TODO: tratar error
		}
		catch(SignatureInvalidException $e)
		{
			// TODO: tratar error
		}
		catch(BeforeValidException $e)
		{
			// TODO: tratar error
		}
		catch(ExpiredException $e)
		{
			// TODO: tratar error
		}
		return null;
	}
	private static function generateToken($id, $name, $fullName)
	{
		//
		// Generar token
		//
		$time = time();
		
		$token = array
		(
			'sub' => $id,					// Identificador de la persona
			'iat' => $time,					// Tiempo que inició el token
			'exp' => $time + (60*60)*48,	// Tiempo que expirará el token (+48 horas)
			'data' =>						// Información del usuario
			[
				'id'		=> $id,
				'name'		=> $name,
				'full_name'	=> $fullName
			]
		);
		return JWT::encode($token, self::$SECRET_KEY, self::$ALGORITHM);
	}
}

?>
