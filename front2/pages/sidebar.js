/**
 * Iniciar panel de navegación (menú)
 */
 function createSideBar(container){
	var sidebar = $(`
					<div class="navbar-default sidebar" role="navigation">
						<div class="sidebar-nav navbar-collapse">
							<ul class="nav" id="side-menu">
							</ul>
						</div>
					</div>`);
	var self = {	
 		menu: sidebar.find('#side-menu'),
		initContent: function(title, filler){
			let header = $("#page-header");
			let content = $("#page-content");
			
			header.html(title);
			content.html('');
			if(filler)
				filler(content);
		},
		pageInvoker: createPageInvoker(),
 		addMenuItem: function(menu, icon, label, render_callback){
 			let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'</a></li>');
			if(render_callback)
				li.on('click', render_callback);
			menu.append(li);
 		},
 		addSubMenu: function(id, menu, icon, label, filler){
 			let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'<span class="fa arrow"></span></a></li>');
			let ul = $('<ul class="nav nav-second-level"></ul>');
			filler(ul);
			li.append(ul);
			menu.append(li);
 		},
 		addSubMenuItem: function(menu,label,render_callback){
 			let li = $('<li><a href="javascript:void(0)">'+label+'</a></li>');
			if(render_callback)
				li.on('click', render_callback);
			menu.append(li);

 		},
 		render: function(){
 			self.addMenuItem(self.menu, 'fa-home', 'Inicio',self.pageInvoker.render('inicio'));
 			self.addMenuItem(self.menu, 'fa-bookmark', 'Marcas',self.pageInvoker.render('marcas'));
			self.addMenuItem(self.menu, 'fa-tags', 'Categorías',self.pageInvoker.render('categorias'));
			self.addMenuItem(self.menu, 'fa-users', 'Clientes',self.pageInvoker.render('clientes'));
			self.addMenuItem(self.menu, 'fa-th-list', 'Productos',self.pageInvoker.render('productos'));
 			self.addMenuItem(self.menu, 'fa-truck', 'Proveedores',self.pageInvoker.render('proveedores'));
 			self.addMenuItem(self.menu, 'fa-shopping-cart', 'Ventas',self.pageInvoker.render('ventas')); 			
 			self.addSubMenu('deliveries', self.menu, 'fa-car', 'Entregas', function(submenu){
		
				self.addSubMenuItem(submenu, "Hoy", self.pageInvoker.render('entregasHoy'));
				self.addSubMenuItem(submenu, "Atrasadas",self.pageInvoker.render('entregasAtrasadas'));
				self.addSubMenuItem(submenu, "Pendientes", self.pageInvoker.render('entregasPendientes'));
			});
			container.append(sidebar);

 		}
	 }
	 return self;

 }
/*
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
		api.getAllBrands(function(data){
			initContentPanel('Marcas', function(container){
				createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "Nombre", data: "name"}
					],
					'brands',
					data.brands
				);
			});
		});

	});

	// Agrega Item Categorías
	addMenuItem(menu, 'fa-tags', 'Categorías', function(){
		api.getAllCategories(function(data){
			initContentPanel('Categorías', function(container){
				createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "Descripción", data: "description"}
					],
					'categories',
					data.categories
				);
			});
		});

	});
	
	// Agrega Item Clientes
	addMenuItem(menu, 'fa-users', 'Clientes', function(){
		api.getAllClients(function(data){
			initContentPanel('Clientes', function(container){
				createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "Nombre", data: "name"},
						{title: "CUIT", data: "cuit"},
						{title: "Correo electrónico", data: "email"},
						{title: "Teléfono", data:"phone"},
						{title: "Dirección", data: "location"},
					],
					'clients',
					data.clients
					);
			});
		});

	});

	// Agrega Item Productos
	addMenuItem(menu, 'fa-th-list', 'Productos', function(){
		api.getAllProducts(function(data){
			initContentPanel('Products', function(container){
				createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "Nombre", data: "name"},
						{title: "Marca", data: "brand"},
						{title: "Proveedor", data: "provider"},
						{title: "Precio minorista", data:"retail_price"},
						{title: "Precio mayorista", data: "wholesale_price"},
					],
					'products',
					data.products
				);
			let btnSubmit = $('<button type="button" id="submit-products" class="btn btn-success">Success</button>');
				container.append(btnSubmit);
				
				
			});
		});

	});

	// Agrega Item Proveedores 
	addMenuItem(menu, 'fa-truck', 'Proveedores', function(){
		api.getAllProviders(function(data){
			initContentPanel('Providers', function(container){
				createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "Nombre", data: "name"},
						{title: "Correo electrónico", data: "email"},
						{title: "Teléfono", data:"phone"},
						{title: "Compañía", data: "company"},
					],
					'providers',
					data.providers
				);
			});
		});
	});

	// Agrega Item Ventas
	addMenuItem(menu, 'fa-shopping-cart', 'Ventas', function(){
		api.getAllSales(function(data){
			initContentPanel('Ventas', function(container){
				createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "Usuario", data: "user"},
						{title: "Cliente", data: "client"},
						{title: "Total", data: "total"},
						{title: "Fecha", data:"timestamp"},
					],
					'sales',
					data.sales
				);
			});
		});
	});
	// Agrega Item Entregas	
	addSubMenu("deliveries", menu, 'fa-car', 'Entregas', function(submenu){
		
		addSubMenuItem(submenu, "Hoy", function(){
			initDeliveriesPanel('today');
		});
		addSubMenuItem(submenu, "Atrasadas", function(){
			initDeliveriesPanel('delayed');
		});
		addSubMenuItem(submenu, "Pendientes", function(){
			initDeliveriesPanel('pending');
		});
	});
	
	nav.append(sidebar);
}*/