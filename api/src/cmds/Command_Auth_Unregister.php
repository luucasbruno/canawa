<?php

class Command_Auth_Unregister implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		$token = Authentication::token();
		if($token == null)
		{
			return HTTP_RCODE___UNAUTHORIZED;
		}
		$json = array();
		$password = getQueryParameter($queryParameters, 'password');
		if(empty($password))
		{
			$json['ret'] = ERROR___BAD_PARAMETERS;
		}
		else
		{
			$json['ret'] = Authentication::unregister($token->getUser(), $password);
		}
		echo json_encode($json);
		
		return HTTP_RCODE___OK;
	}
}

?>
