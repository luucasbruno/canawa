<?php
include_once 'core/BrandManager.php';
include_once 'jfmt/JsonFormatterBrand.php';

class Command_About implements Command
{
	public function run($method, $uriParameters, $queryParameters)
	{
		if($method == 'GET')
		{
			$json = array();
			$json['ret'] = SUCCESS;
			$json['canawa'] = array(
				'name' => 'Canawa',
				'phone' => '(02302)430657',
				'location' => 'Calle 2 20, General Pico, La Pampa',
				'description' => 'Accesorios para Sanitarios'
			);
			echo json_encode($json);
		}
		return HTTP_RCODE___OK;
	}
}

?>