<?php
include_once 'core/ProviderManager.php';
include_once 'jfmt/JsonFormatterProvider.php';

class Command_Providers implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		if($method == 'GET')
		{
			$pattern = getQueryParameter($queryParameters, 'pattern');
			if(empty($pattern))
				$iter = ProviderManager::getProviders();
			else
				$iter = ProviderManager::searchProviders($pattern);
			
			$json = array();
			if(is_integer($iter))
			{
				$json['ret'] = $iter;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['providers'] = JsonFormatterProvider::format($iter);
			}
			echo json_encode($json);
		}
		else if($method == 'POST')
		{
			$name = getQueryParameter($queryParameters, 'name');
			if(empty($name))
			{
				return HTTP_RCODE___BAD_REQUEST;
			}
			$prov = ProviderManager::addProvider(
					$name,
					getQueryParameter($queryParameters, 'email'),
					getQueryParameter($queryParameters, 'phone'),
					getQueryParameter($queryParameters, 'company'));
			$json = array();
			if(is_integer($prov))
			{
				$json['ret'] = $prov;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['provider_id'] = $prov->getId();
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
				$json['ret'] = ProviderManager::renameField(
						getQueryParameter($queryParameters, 'id'),
						getQueryParameter($queryParameters, 'field'),
						getQueryParameter($queryParameters, 'value'));
			}
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>