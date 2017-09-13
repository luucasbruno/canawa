<?php
include_once 'core/CategoryManager.php';
include_once 'jfmt/JsonFormatterCategory.php';

class Command_Categories implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		if($method == 'GET')
		{
			$pattern = getQueryParameter($queryParameters, 'pattern');
			if(empty($pattern))
				$iter = CategoryManager::getCategories();
			else
				$iter = CategoryManager::searchCategories($pattern);
			if(is_integer($iter))
			{
				$json['ret'] = $iter;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['categories'] = JsonFormatterCategory::format($iter);
			}
			echo json_encode($json);
		}
		else if($method == 'POST')
		{
			$cat = CategoryManager::addCategory(getQueryParameter($queryParameters, 'description'));
			$json = array();
			if(is_integer($cat))
			{
				$json['ret'] = $cat;
			}
			else
			{
				$json['ret'] = SUCCESS;
				$json['category_id'] = $cat->getId();
			}
			echo json_encode($json);
		}
		else if($method == 'PATCH')
		{
			$json = array();
			$description = getQueryParameter($queryParameters, 'description');
			if(!isset($queryParameters['id']) || empty($description))
			{
				$json['ret'] = ERROR___BAD_PARAMETERS;
			}
			else
			{
				$json['ret'] = CategoryManager::renameCategory($queryParameters['id'], $description);
			}
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>
