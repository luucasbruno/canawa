/**
 * Iniciar panel de navegación (menú)
 */
function initSideBar(nav){
	
	//-------------- Declaraciones ------------//
	let addMenuItem = function(menu, icon, label, click){
		let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'</a></li>');
		if(click)
			li.on('click', click);
		menu.append(li);
	}
	let addSubMenu = function(id, menu, icon, label, filler){
		let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'<span class="fa arrow"></span></a></li>');
		let ul = $('<ul class="nav nav-second-level"></ul>');
		filler(ul);
		li.append(ul);
		menu.append(li);
	}
	let addSubMenuItem = function(menu, label, click){
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
	
	//-------------- Ejecución -------------//
	
	//Agrega item Inicio
	addMenuItem(menu, 'fa-home', 'Inicio', function(){
		//Acá va la funcionalidad de item Inicio
	});
	
	
	// Agrega Item Perfil
	addMenuItem(menu, 'fa-user', 'Perfil', function(){
		// Funcionalidad Item Perfil
	});

	// Agrega Item Marcas
	addMenuItem(menu, 'fa-bookmark', 'Marcas', function(){
		api.getAllBrands(function(json)
		{
			initContentPanel('Marcas', function(container){
				createAdvancedTable(
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

	// Agrega Item Categorías
	addMenuItem(menu, 'fa-tags', 'Categorías', function(){
		api.getAllCategories(function(json){
			initContentPanel('Categorías', function(container){
				createAdvancedTable(
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
	
	// Agrega Item Clientes
	addMenuItem(menu, 'fa-users', 'Clientes', function(){
		api.getAllClients(function(json){
			initContentPanel('Clientes', function(container){
				createAdvancedTable(
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

	// Agrega Item Productos
	addMenuItem(menu, 'fa-th-list', 'Productos', function(){
		api.getAllProducts(function(json){
			initContentPanel('Products', function(container){
				createAdvancedTable(
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
				let btnSubmit = $('<button type="button" id="submit-products" class="btn btn-success">Success</button>');
				container.append(btnSubmit);
				
				
			});
		});

	});

	// Agrega Item Proveedores
	addMenuItem(menu, 'fa-truck', 'Proveedores', function(){
		api.getAllProviders(function(json){
			initContentPanel('Providers', function(container){
				createAdvancedTable(
					container,
					json.providers.length,
					["#", "Nombre", "Correo electrónico", "Teléfono", "Companía" ],
					function(col, row){
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

	// Agrega Item Ventas
	addMenuItem(menu, 'fa-shopping-cart', 'Ventas', function(){
		api.getAllSales(function(json){
			initContentPanel('Ventas', function(container){
				createAdvancedTable(
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
	// Agrega Item Entregas	
	addSubMenu("deliveries", menu, 'fa-car', 'Entregas', function(submenu){
		let init = function(title, json)
		{
			initContentPanel(title, function(container){
				createAdvancedTable(
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
		addSubMenuItem(submenu, "Hoy", function(){
			api.getTodayDeliveries(function(json){
				init('Entregas de hoy', json);
			});
		});
		addSubMenuItem(submenu, "Atrasadas", function(){
			api.getDelayedDeliveries(function(json){
				init('Entregas atrasadas', json);
			});
		});
		addSubMenuItem(submenu, "Pendientes", function(){
			api.getPendingDeliveries(function(json){
				init('Entregas pendientes', json);
			});
		});
	});
	
	nav.append(sidebar);
}