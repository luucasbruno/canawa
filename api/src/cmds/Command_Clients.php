<?php
include_once 'core/ClientManager.php';
include_once 'jfmt/JsonFormatterClient.php';

class Command_Clients implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		/*
		$token = Authentication::token();
		if(($token == null) || (!$token->isValid()))
		{
			return HTTP_RCODE___UNAUTHORIZED;
		}
		*/
		if($method == 'GET')
		{
			$pattern = getQueryParameter($queryParameters, 'pattern');
			
			if(empty($pattern))
				$iter = ClientManager::getClients();
			else
				$iter = ClientManager::searchClients($pattern);
			
			if(is_integer($iter))
			{
				$json['ret'] = $iter;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['clients'] = JsonFormatterClient::format($iter);
			}
			echo json_encode($json);
		}
		else if($method == 'POST')
		{
			$name = getQueryParameter($queryParameters, 'name');
			$cuit = getQueryParameter($queryParameters, 'cuit');
			if(empty($name) || empty($cuit))
			{
				return HTTP_RCODE___BAD_REQUEST;
			}
			$cli = ClientManager::addClient(
					$name,
					$cuit,
					getQueryParameter($queryParameters, 'email'),
					getQueryParameter($queryParameters, 'phone'),
					getQueryParameter($queryParameters, 'location'));
			$json = array();
			if(is_integer($cli))
			{
				$json['ret'] = $cli;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['client_id'] = $cli->getId();
			}
			echo json_encode($json);
		}
		else if($method == 'PATCH')
		{
			$json = array();
			if(!(isset($queryParameters['id'])
					&& isset($queryParameters['field'])
					&& isset($queryParameters['value'])))
			{
				$json['ret'] = ERROR___BAD_PARAMETERS;
			}
			else
			{
				$json['ret'] = ClientManager::renameField(
						getQueryParameter($queryParameters, 'id'),
						getQueryParameter($queryParameters, 'field'),
						getQueryParameter($queryParameters, 'value'));
			}
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}