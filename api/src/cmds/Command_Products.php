<?php
include_once 'core/ProductManager.php';
include_once 'jfmt/JsonFormatterProduct.php';

class Command_Products implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		$con = Connection::getInstance();
		if($method == 'GET')
		{
			$mode = getQueryParameter($queryParameters, 'mode');
			$pattern = getQueryParameter($queryParameters, 'pattern');
			if(empty($pattern))
				$ret = ProductManager::getProducts();
			else
				$ret = ProductManager::searchProducts($mode, $pattern);
			$json = array();
			if(is_integer($ret))
			{
				$json['ret'] = $ret;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['products'] = JsonFormatterProduct::format($ret);
			}
			echo json_encode($json);
		}
		else if($method == 'POST')
		{
			$name = getQueryParameter($queryParameters, 'name');
			$brandId = getQueryParameter($queryParameters, 'brand_id');
			$categoryId = getQueryParameter($queryParameters, 'category_id');
			$providerId = getQueryParameter($queryParameters, 'provider_id');
			$retailPrice = getQueryParameter($queryParameters, 'retail_price');
			$wholesalePrice = getQueryParameter($queryParameters, 'wholesale_price');
			
			$json = array();
			if(empty($name) || empty($brandId)
				|| empty($categoryId) || empty($providerId)
				|| empty($retailPrice) || empty($wholesalePrice))
			{
				$json['ret'] = ERROR___BAD_PARAMETERS;
			}
			else
			{
				$prod = ProductManager::addProduct($name, $brandId, $providerId, $categoryId, $retailPrice, $wholesalePrice);
				if(is_integer($prod))
				{
					$json['ret'] = $prod;
				}
				else
				{
					$json['ret'] = SUCCESS;
					$json['product_id'] = $prod->getId();
				}
			}
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>
