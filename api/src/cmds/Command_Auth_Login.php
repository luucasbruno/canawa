<?php

class Command_Auth_Login implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		$json = array();
		$username = getQueryParameter($queryParameters, 'username');
		$password = getQueryParameter($queryParameters, 'password');
		/*
		if(empty($username) || empty($password))
		{
			$json['ret'] = ERROR___BAD_PARAMETERS;
			// ...
			echo json_encode($json);
			return HTTP_RCODE___BAD_REQUEST;
		}
		*/
		// ...
		$token = Authentication::login($username, $password);
		if(is_integer($token))
		{
			$json['ret'] = $token;
		}
		else
		{
			$json['ret'] = SUCCESS;
			$json['token'] = $token;
		}
		echo json_encode($json);
		return HTTP_RCODE___OK;
	}
}

?>