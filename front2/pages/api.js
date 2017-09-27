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
	//!
	//! Obtener un listado de los clientes
	//!
	API.prototype.getAllClients = function(callback)
	{
		ajax("/clients", GET, callback, {});
	}
	//!
	//! Obtener el listado de todos los productos
	//!
	API.prototype.getAllProducts = function(callback)
	{
		ajax("/products", GET, callback, {});
	}
	//!
	//! Obtener el listados de todos los proveedores
	//!
	API.prototype.getAllProviders = function(callback)
	{
		ajax("/providers", GET, callback, {});
	}
	//!
	//! Obtener un listado de todas las ventas
	//!
	API.prototype.getAllSales = function(callback)
	{
		ajax("/sales", GET, callback, {});
	}
	//!
	//! Obtener un listado de las entregas del dia de hoy
	//!
	API.prototype.getTodayDeliveries = function(callback)
	{
		ajax("/deliveries", GET, callback, {'mode' : 'today'});
	}
	//!
	//! Obtener un listado de las entregas del pendientes
	//!
	API.prototype.getPendingDeliveries = function(callback)
	{
		ajax("/deliveries", GET, callback, {'mode' : 'pending'});
	}
	//!
	//! Obtener un listado de las entregas del atrasadas
	//!
	API.prototype.getDelayedDeliveries = function(callback)
	{
		ajax("/deliveries", GET, callback, {'mode' : 'delayed'});
	}
	return API;
}());

// Crear instancia de la API
api = new API();
