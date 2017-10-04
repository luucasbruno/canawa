/**
 * Iniciar panel de navegación (menú)
 */
 function createSideBar(container){
 	return{
 		html: $(`
					<div class="navbar-default sidebar" role="navigation">
						<div class="sidebar-nav navbar-collapse">
							<ul class="nav" id="side-menu">
							</ul>
						</div>
					</div>`),
 		menu: sidebar.find('#side-menu'),
 		pages:{
 			Inicio: createPage('inicio'),
 			Perfil: createPage('perfil')
 			Marcas: createPage('marcas'),
 			Productos: createPage('productos')
 			Proveedores: createPage('proveedores')
 			Ventas: createPage('ventas')
 			Entregas: createPage('entregas')
 			Categorías: createPage('categorías')
 		},
 		addMenuItem: function(this.menu, icon, label, pages){
 			let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'</a></li>');
			if(click)
				li.on('click', pages[label]);
			menu.append(li);
 		},
 		addSubMenu: function(id, this.menu, icon, label, filler){
 			let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'<span class="fa arrow"></span></a></li>');
			let ul = $('<ul class="nav nav-second-level"></ul>');
			filler(ul);
			li.append(ul);
			menu.append(li);
 		},
 		addSubMenuItem: function(this.menu,label,click){
 			let li = $('<li><a href="javascript:void(0)">'+label+'</a></li>');
			if(click)
				li.on('click', click);
			menu.append(li);

 		},
 		render: function(){
 			this.addMenuItem(this.menu, 'fa-home', 'Inicio',this.pages);
 			this.addMenuItem(this.menu, 'fa-home', 'Marcas',this.pages);
 			this.addMenuItem(this.menu, 'fa-home', 'Productos',this.pages);
 			this.addMenuItem(this.menu, 'fa-home', 'Proveedores',this.pages);
 			this.addMenuItem(this.menu, 'fa-home', 'Ventas',this.pages);
 			this.addMenuItem(this.menu, 'fa-home', 'Entregas',this.pages);
 			this.addMenuItem(this.menu, 'fa-home', 'Categorías',this.pages);
 			this.addSubMenu('deliveries', this.menu, 'fa-car', 'Entregas', function(submenu){
		
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
			this.nav.append(this.sidebar);

 		}
 	}

 }

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
	*/
	nav.append(sidebar);
}