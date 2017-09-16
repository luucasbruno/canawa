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
		addSubMenuItem(submenu, "Buscar", function(){});
	});
	addSubMenu("categories", menu, 'fa-tags', 'Categorías', function(submenu)
	{
		addSubMenuItem(submenu, "Nueva", function(){});
		addSubMenuItem(submenu, "Buscar", function(){});
	});
	addSubMenu("clients", menu, 'fa-users', 'Clientes', function(submenu)
	{
		addSubMenuItem(submenu, "Nuevo", function(){});
		addSubMenuItem(submenu, "Buscar", function(){});
	});
	addSubMenu("products", menu, 'fa-th-list', 'Productos', function(submenu)
	{
		addSubMenuItem(submenu, "Nuevo", function(){});
		addSubMenuItem(submenu, "Buscar", function(){});
	});
	addSubMenu("providers", menu, 'fa-truck', 'Proveedores', function(submenu)
	{
		addSubMenuItem(submenu, "Nuevo", function(){});
		addSubMenuItem(submenu, "Buscar", function(){});
	});
	addSubMenu("sales", menu, 'fa-shopping-cart', 'Ventas', function(submenu)
	{
		addSubMenuItem(submenu, "Nueva", function(){});
		addSubMenuItem(submenu, "Buscar", function(){});
	});
	addSubMenu("deliveries", menu, 'fa-car', 'Entregas', function(submenu)
	{
		addSubMenuItem(submenu, "Hoy", function(){});
		addSubMenuItem(submenu, "Atrasadas", function(){});
		addSubMenuItem(submenu, "Pendientes", function(){});
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
	
	initContentPanel(wrapper, 'Inicio', function()
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
function initContentPanel(wrapper, title)
{
		let s = `
<div id="page-wrapper">
	<div class="row">
		<div class="col-lg-12">
			<h1 class="page-header">`+title+`</h1>
		</div>
	</div>
</div>`;
	
	wrapper.append(s);
}

if(getCookie('token') != '')
{
	initAdminPanel();
}
else
{
	initLoginPanel();
}


