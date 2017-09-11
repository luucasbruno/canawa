<?php
include_once 'core/SaleManager.php';
include_once 'jfmt/JsonFormatterSale.php';

class Command_Sales implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		if($method == 'GET')
		{
			$json = array();
			$iter = SaleManager::getSales();
			if(is_integer($iter))
			{
				$json['ret'] = $iter;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['sales'] = JsonFormatterSale::format($iter);
			}
			echo json_encode($json);
		}
		else if($method == 'POST')
		{
			$json = array();
			if(!(isset($queryParameters['client_id'])
					&& isset($queryParameters['client_type'])
					&& isset($queryParameters['product_ids'])
					&& isset($queryParameters['product_counts'])))
			{
				$json['ret'] = ERROR___BAD_PARAMETERS;
				echo json_encode($json);
				return HTTP_RCODE___BAD_REQUEST;
			}
			$clientId = getQueryParameter($queryParameters, 'client_id');
			$clientType = getQueryParameter($queryParameters, 'client_type');
			$productIds = getQueryParameter($queryParameters, 'product_ids');
			$productCounts = getQueryParameter($queryParameters, 'product_counts');
			// ...
			$sale = SaleManager::addSale(
					'1',				// TODO: Obtener este id del token
					$clientId,
					$clientType,
					explode(',', $productIds),
					explode(',', $productCounts));
			if(is_integer($sale))
			{
				$json['ret'] = $sale;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['sale_id'] = $sale->getId();
			}
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>
