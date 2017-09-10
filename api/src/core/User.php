<?php

/**
 * Usuario del sistema
 * 
 * @author Germán Martínez
 *
 */
class User
{
	/**
	 * @var number Id del usuario
	 */
	private $userId;
	
	/**
	 * Constructor
	 */
	public function __construct($id)
	{
		$this->userId = $id;
	}
	/**
	 * Obtener el id del usuario
	 * 
	 * @return integer Id del usuario
	 */
	public function getId()
	{
		return $this->userId;
	}
	/**
	 * Obtener el nombre del usuario
	 * 
	 * @return string Nombre del usuario
	 */
	public function getName()
	{
		return getFieldFromTable('USER', 'NAME', $this->userId);
	}
	/**
	 * Obtener la URL de la imagen del usuario
	 * 
	 * @return string URL de la imagen del usuario
	 */
	public function getPicture()
	{
		return getFieldFromTable('USER', 'PICTURE', $this->userId);
	}
	/**
	 * Obtener el nombre completo del usuario
	 *
	 * @return string Nombre completo del usuario
	 */
	public function getFullName()
	{
		return getFieldFromTable('USER', 'FULLNAME', $this->userId);
	}
};

?>
