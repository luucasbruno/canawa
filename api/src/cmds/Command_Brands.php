<?php
include_once 'core/BrandManager.php';
include_once 'jfmt/JsonFormatterBrand.php';

class Command_Brands implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		if($method == 'GET')
		{
			$pattern = getQueryParameter($queryParameters, 'pattern');
			if(empty($pattern))
			{
				$iter = BrandManager::getBrands();
			}
			else
			{
				$iter = BrandManager::searchBrands($pattern);
			}
			$json = array();
			if(is_integer($iter))
			{
				$json['ret'] = $iter;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['brands'] = JsonFormatterBrand::format($iter);
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
			$logo = getQueryParameter($queryParameters, 'logo');
			
			$ret = BrandManager::addBrand($name, $logo);
			$json = array();
			if(is_integer($ret))
			{
				$json['ret'] = $ret;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['brand_id'] = $ret->getId();
			}
			echo json_encode($json);
		}
		else if($method == 'PATCH')
		{
			$id = getQueryParameter($queryParameters, 'id');
			$newName= getQueryParameter($queryParameters, 'new_name');
			
			if(empty($id) || empty($newName))
			{
				return HTTP_RCODE___BAD_REQUEST;
			}
			$json = array();
			$json['ret'] = BrandManager::renameBrand($id, $newName);
			
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>
