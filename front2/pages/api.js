var API = (function()
{
	const API_URL = "http://localhost/canawa-api";
	const GET = "get";
	const POST = "post";
	const PATCH = 'patch';
	const DELETE = 'delete';
	
	function API()
	{
	}
	function ajax(url, method, callback, formdata)
	{
		$.ajax
		({
			'url': API_URL + url,
			'type': method,
			'data': formdata,
			crossDomain: true,
			error: function(xhr, data)
			{
			},
			success: function(data)
			{
				try
				{
					callback(JSON.parse(data));
				}
				catch(e)
				{
					alert(e);
					alert(data);
				}
			},
		});
	}
	//!
	//! Obtener token de acceso
	//!
	API.prototype.login = function(username, password, callback)
	{
		ajax("/auth/login", POST, callback,
		{
			'username' : username,
			'password' : password
		});
	}
	//!
	//! Obtener un el listado de las marcas
	//!
	API.prototype.getAllBrands = function(callback)
	{
		ajax("/brands", GET, callback, {});
	}
	//!
	//! Obtener un listado de las categorías
	//!
	API.prototype.getAllCategories = function(callback)
	{
		ajax("/categories", GET, callback, {});
	}
	return API;
}());

// Crear instancia de la API
api = new API();
