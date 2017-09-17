/**
 * Inciar panel superior
 */
function initTopBar(nav)
{
	let header = `
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="javascript:void(0)">Canawa</a>
	</div>`;
	
	let links = $('<ul class="nav navbar-top-links navbar-right"></ul>');
	
	// Crear un botón dropdown
	let addDropdown = function(panel, icon, type, filler)
	{
		let li = $(`
<li class="dropdown">
	<a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
		<i class="fa `+icon+` fa-fw"></i><i class="fa fa-caret-down"></i>
	</a>
</li>`);
		let ul = $(`
<ul class="dropdown-menu `+type+`">
</ul>`);
		filler(ul);
		li.append(ul);
		panel.append(li);
	}
	// Crear un item divisorio dentro de un dropdown
	let addDropdownDiv = function(ul)
	{
		ul.append('<li class="divider"></li>');
	}
	// Crear un item normal dentro de un dropdown
	let addDropdownItem = function(ul, icon, label, onclick)
	{
		let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'</a></li>');
		li.on('click', onclick);
		ul.append(li);
	}
	// Crear un mensaje dentro de un dropdown
	let addDropdownMessage = function(ul, author, time, message, onclick)
	{
		let li = $(`
<li>
	<a href="javascript:void(0)">
		<div>
			<strong>`+author+`</strong>
			<span class="pull-right text-muted">
				<em>`+time+`</em>
			</span>
		</div>
		<div>`+message+`</div>
	</a>
</li>`);
		if(onclick != null)li.on('click', onclick);ul.append(li);
	}
	// Crear una tarea dentro de un dropdown
	let addDropdownTask = function(ul, label, percent, type, onclick)
	{
		let li = $(`
<li>
	<a href="javascript:void(0)">
		<div>
			<p>
				<strong>`+label+`</strong>
				<span class="pull-right text-muted">`+percent+`% Complete</span>
			</p>
			<div class="progress progress-striped active">
				<div class="progress-bar progress-bar-`+type+`" role="progressbar" aria-valuenow="`+percent+`" aria-valuemin="0" aria-valuemax="100" style="width: `+percent+`%">
					<span class="sr-only">`+percent+`% Complete (`+type+`)</span>
				</div>
			</div>
		</div>
	</a>
</li>`);
		if(onclick != null)li.on('click', onclick);ul.append(li);
	}
	// Crear un alerta dentro de un dropdown
	let addDropdownAlert = function(ul, icon, label, elapsed, onclick)
	{
		let li = $(`
<li>
	<a href="javascript:void(0)">
		<div>
			<i class="fa `+icon+` fa-fw"></i> `+label+`
			<span class="pull-right text-muted small">`+elapsed+`</span>
		</div>
	</a>
</li>`);
		if(onclick != null)li.on('click', onclick);ul.append(li);
	}
	// Crear un footer dentro de un dropdown
	let addDropdownFooter = function(ul, label, onclick)
	{
		let li = $(`
<li>
	<a class="text-center" href="#">
		<strong>`+label+`</strong>
		<i class="fa fa-angle-right"></i>
	</a>
</li>`);
		if(onclick != null)li.on('click', onclick);ul.append(li);
	}
	
	//
	// Crear los dropdowns
	//
	addDropdown(links, 'fa-envelope', "dropdown-messages", function(ul)
	{
		addDropdownMessage(ul, 'John Smith', 'Yesterday', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...', function(){});
		addDropdownDiv(ul);
		addDropdownMessage(ul, 'John Smith', 'Yesterday', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...', function(){});
		addDropdownDiv(ul);
		addDropdownMessage(ul, 'John Smith', 'Yesterday', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...', function(){});
		addDropdownDiv(ul);
		addDropdownFooter(ul, 'Read All Messages', function(){});
	});
	addDropdown(links, 'fa-tasks', "dropdown-tasks", function(ul)
	{
		addDropdownTask(ul, 'Task 1', 40, 'success', function(){});
		addDropdownDiv(ul);
		addDropdownTask(ul, 'Task 2', 20, 'info', function(){});
		addDropdownDiv(ul);
		addDropdownTask(ul, 'Task 3', 60, 'warning', function(){});
		addDropdownDiv(ul);
		addDropdownTask(ul, 'Task 4', 80, 'danger', function(){});
		addDropdownDiv(ul);
		addDropdownFooter(ul, 'See All Tasks', function(){});
	});
	addDropdown(links, 'fa-bell', "dropdown-alerts", function(ul)
	{
		addDropdownAlert(ul, 'fa-comment', 'New Comment', '4 minutes ago', function(){});
		addDropdownDiv(ul);
		addDropdownAlert(ul, 'fa-twitter', '3 New Followers', '12 minutes ago', function(){});
		addDropdownDiv(ul);
		addDropdownAlert(ul, 'fa-envelope', 'Message Sent', '4 minutes ago', function(){});
		addDropdownDiv(ul);
		addDropdownAlert(ul, 'fa-tasks', 'New Task', '4 minutes ago', function(){});
		addDropdownDiv(ul);
		addDropdownAlert(ul, 'fa-upload', 'Server Rebooted', '4 minutes ago', function(){});
		addDropdownDiv(ul);
		addDropdownFooter(ul, 'See All Alerts', function(){});
	});
	addDropdown(links, 'fa-user', "dropdown-user", function(ul)
	{
		addDropdownItem(ul, 'fa-user', 'Perfil', function(){});
		addDropdownItem(ul, 'fa-gear', 'Configuración', function(){});
		addDropdownDiv(ul);
		addDropdownItem(ul, 'fa-sign-out', 'Salir', function()
		{
			clearAllCookies();
			location.reload();
		});
	});
	
	// ...
	nav.append(header);
	nav.append(links);
}
/**
 * Iniciar panel de navegación (menú)
 */
function initSideBar(nav)
{
	let addMenuItem = function(menu, icon, label, click)
	{
		let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'</a></li>');
		if(click)
			li.on('click', click);
		menu.append(li);
	}
	let addSubMenu = function(id, menu, icon, label, filler)
	{
		let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'<span class="fa arrow"></span></a></li>');
		let ul = $('<ul class="nav nav-second-level"></ul>');
		filler(ul);
		li.append(ul);
		menu.append(li);
	}
	let addSubMenuItem = function(menu, label, click)
	{
		let li = $('<li><a href="javascript:void(0)">'+label+'</a></li>');
		if(click)
			li.on('click', click);
		menu.append(li);
	}
	let sidebar = $(`
<div class="navbar-default sidebar" role="navigation">
	<div class="sidebar-nav navbar-collapse">
		<ul class="nav" id="side-menu">
		</ul>
	</div>
</div>`);
	let menu = sidebar.find('#side-menu');
	addMenuItem(menu, 'fa-home', 'Inicio', function()
	{
	});
	addMenuItem(menu, 'fa-user', 'Perfil', function()
	{
	});
	addSubMenu("brands", menu, 'fa-bookmark', 'Marcas', function(submenu)
	{
		addSubMenuItem(submenu, "Nueva", function(){});
		addSubMenuItem(submenu, "Buscar", function()
		{
			api.getAllBrands(function(json)
			{
				initContentPanel('Marcas', function(container)
				{
					createTable(
						container,
						json.brands.length,
						["#", "Nombre" ],
						function(col, row)
						{
							if(col == 0)
								return json.brands[row].id;
							return json.brands[row].name;
						});
				});
			});
		});
	});
	addSubMenu("categories", menu, 'fa-tags', 'Categorías', function(submenu)
	{
		addSubMenuItem(submenu, "Nueva", function(){});
		addSubMenuItem(submenu, "Buscar", function()
		{
			api.getAllCategories(function(json)
			{
				initContentPanel('Categorías', function(container)
				{
					createTable(
						container,
						json.categories.length,
						["#", "Descripción" ],
						function(col, row)
						{
							if(col == 0)
								return json.categories[row].id;
							return json.categories[row].description;
						});
				});
			});
		});
	});
	addSubMenu("clients", menu, 'fa-users', 'Clientes', function(submenu)
	{
		addSubMenuItem(submenu, "Nuevo", function(){});
		addSubMenuItem(submenu, "Buscar", function()
		{
			api.getAllClients(function(json)
			{
				initContentPanel('Clientes', function(container)
				{
					createTable(
						container,
						json.clients.length,
						["#", "Nombre", "CUIT", "Correo electrónico", "Teléfono", "Dirección" ],
						function(col, row)
						{
							if(col == 0)	return json.clients[row].id;
							if(col == 1)	return json.clients[row].name;
							if(col == 2)	return json.clients[row].cuit;
							if(col == 3)	return json.clients[row].email;
							if(col == 4)	return json.clients[row].phone;
							if(col == 5)	return json.clients[row].location;
							return "";
						});
				});
			});
		});
	});
	addSubMenu("products", menu, 'fa-th-list', 'Productos', function(submenu)
	{
		addSubMenuItem(submenu, "Nuevo", function(){});
		addSubMenuItem(submenu, "Buscar", function()
		{
			api.getAllProducts(function(json)
			{
				initContentPanel('Products', function(container)
				{
					createTable(
						container,
						json.products.length,
						["#", "Nombre", "Marca", "Proveedor", "Precio minorista", "Precio mayorista" ],
						function(col, row)
						{
							if(col == 0)	return json.products[row].id;
							if(col == 1)	return json.products[row].name;
							if(col == 2)	return json.products[row].brand;
							if(col == 3)	return json.products[row].provider;
							if(col == 4)	return json.products[row].retail_price;
							if(col == 5)	return json.products[row].wholesale_price;
							return "";
						});
				});
			});
		});
	});
	addSubMenu("providers", menu, 'fa-truck', 'Proveedores', function(submenu)
	{
		addSubMenuItem(submenu, "Nuevo", function(){});
		addSubMenuItem(submenu, "Buscar", function()
		{
			api.getAllProviders(function(json)
			{
				initContentPanel('Providers', function(container)
				{
					createTable(
						container,
						json.providers.length,
						["#", "Nombre", "Correo electrónico", "Teléfono", "Companía" ],
						function(col, row)
						{
							if(col == 0)	return json.providers[row].id;
							if(col == 1)	return json.providers[row].name;
							if(col == 2)	return json.providers[row].email;
							if(col == 3)	return json.providers[row].phone;
							if(col == 4)	return json.providers[row].company;
							return "";
						});
				});
			});
		});
	});
	addSubMenu("sales", menu, 'fa-shopping-cart', 'Ventas', function(submenu)
	{
		addSubMenuItem(submenu, "Nueva", function(){});
		addSubMenuItem(submenu, "Buscar", function()
		{
			api.getAllSales(function(json)
			{
				initContentPanel('Ventas', function(container)
				{
					createTable(
						container,
						json.sales.length,
						["#", "Usuario", "Cliente", "Total", "Timestamp" ],
						function(col, row)
						{
							if(col == 0)	return json.sales[row].id;
							if(col == 1)	return json.sales[row].user;
							if(col == 2)	return json.sales[row].client;
							if(col == 3)	return json.sales[row].total;
							if(col == 4)	return json.sales[row].timestamp;
							return "";
						});
				});
			});
		});
	});
	addSubMenu("deliveries", menu, 'fa-car', 'Entregas', function(submenu)
	{
		let init = function(title, json)
		{
			initContentPanel(title, function(container)
			{
				createTable(
					container,
					json.deliveries.length,
					["#", "#Venta", "Fecha", "Dirección", "Entregado" ],
					function(col, row)
					{
						if(col == 0)	return json.deliveries[row].id;
						if(col == 1)	return json.deliveries[row].sale_id;
						if(col == 2)	return json.deliveries[row].date;
						if(col == 3)	return json.deliveries[row].location;
						if(col == 4)	return json.deliveries[row].delivered == 1 ? "Si" : "No";
						return "";
					});
			});
		}
		addSubMenuItem(submenu, "Hoy", function()
		{
			api.getTodayDeliveries(function(json)
			{
				init('Entregas de hoy', json);
			});
		});
		addSubMenuItem(submenu, "Atrasadas", function()
		{
			api.getDelayedDeliveries(function(json)
			{
				init('Entregas atrasadas', json);
			});
		});
		addSubMenuItem(submenu, "Pendientes", function()
		{
			api.getPendingDeliveries(function(json)
			{
				init('Entregas pendientes', json);
			});
		});
	});
	nav.append(sidebar);
}
/**
 * Iniciar panel de admin
 */
function initAdminPanel()
{
	let nav = $('<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0"></nav>');
	let wrapper = $('#wrapper');

	initTopBar(nav);
	initSideBar(nav);

	wrapper.append(nav);
	
	let s = `
<div id="page-wrapper">
	<div class="row">
		<div class="col-lg-12">
			<h1 class="page-header" id="page-header">Inicio</h1>
		</div>
	</div>
	<div class="row" id="page-content">
	</div>
</div>
`;
	wrapper.append(s);
	initContentPanel('Inicio', function()
	{
	});
}
/**
 * Iniciar panel de logeo
 */
function initLoginPanel()
{
	let s = `
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="login-panel panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">Canawa</h3>
					</div>
					<div class="panel-body">
						<form role="form" id="form" action="javascript:void(0)">
							<fieldset>
								<div class="form-group">
									<input class="form-control" placeholder="Usuario" id="username" type="text" autofocus>
								</div>
								<div class="form-group">
									<input class="form-control" placeholder="Contraseña" id="password" type="password" value="">
								</div>
								<button class="btn btn-lg btn-success btn-block">Entrar</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	$(document.body).html(s);

	$('#form').on('submit', function()
	{
		api.login($('#username').val(), $('#password').val(), function(json)
		{
			if(json.ret != 0)
			{
				// TODO: tratar error
			}
			else
			{
				setCookie('token', json.token, 0);
				location.reload();
			}
		});
	});
}

//--------------------------------------------------------------------------------------------------
function initContentPanel(title, filler)
{
	let header = $("#page-header");
	let content = $("#page-content");
	
	header.html(title);
	content.html('');
	if(filler)
		filler(content);
}

if(getCookie('token') != '')
{
	initAdminPanel();
}
else
{
	initLoginPanel();
}


