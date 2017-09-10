<?php
include_once 'core/User.php';

/**
 * Esta clase representa un token de acceso
 * 
 * @author Germán Martínez
 *
 */
class AuthenticationToken
{
	/**
	 * @var array Arreglo con la información del token
	 */
	private $token;
	
	/**
	 * Constructor
	 * 
	 * @param array $token Arreglo con la información del token
	 */
	public function __construct($token)
	{
		$this->token = $token;
	}
	/**
	 * Determinar si el token es válido
	 * 
	 * @return boolean true|false
	 */
	public function isValid()
	{
		if($this->token == null)
			return false;
		return ($this->token->exp > time());
	}
	/**
	 * Obtener usuario asociado al token de acceso
	 * 
	 * @return User Usuario
	 */
	public function getUser()
	{
		return new User($this->token->data->id);
	}
}

?>
