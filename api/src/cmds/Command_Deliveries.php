<?php
include_once 'core/DeliveryManager.php';
include_once 'jfmt/JsonFormatterDelivery.php';

class Command_Deliveries implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		if($method == 'GET')
		{
			$json = array();
			$iter = DeliveryManager::getDeliveries();
			if(is_integer($iter))
			{
				$json['ret'] = $iter;
			}
			else 
			{
				$json['ret'] = SUCCESS;
				$json['deliveries'] = JsonFormatterDelivery::format($iter);
			}
			echo json_encode($json);
		}
		else if($method == 'POST')
		{
			$json = array();
			if(!(isset($queryParameters['sale_id'])
					|| isset($queryParameters['date'])
					|| isset($queryParameters['location'])))
			{
				$json['ret'] = ERROR___BAD_PARAMETERS;
			}
			else
			{
				$ret = DeliveryManager::addDelivery(
						$queryParameters['sale_id'], $queryParameters['date'], $queryParameters['location']);
				if(is_integer($ret))
				{
					$json['ret'] = $ret;
				}
				else
				{
					$json['ret'] = SUCCESS;
					$json['delivery_id'] = $ret->getId();
				}
			}
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>