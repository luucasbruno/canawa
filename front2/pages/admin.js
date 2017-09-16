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
	aaa();
	bbb();
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
		function aaa()
		{
			let nav = $('<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0"></nav>');

			
			initTopBar(nav);
			initSideBar(nav);
			
			$("#wrapper").append(nav);
		}
		function bbb()
		{
		let s = `
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-comments fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">26</div>
                                    <div>New Comments!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">12</div>
                                    <div>New Tasks!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-shopping-cart fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">124</div>
                                    <div>New Orders!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-support fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">13</div>
                                    <div>Support Tickets!</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Area Chart Example
                            <div class="pull-right">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li><a href="#">Action</a>
                                        </li>
                                        <li><a href="#">Another action</a>
                                        </li>
                                        <li><a href="#">Something else here</a>
                                        </li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div id="morris-area-chart"></div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Bar Chart Example
                            <div class="pull-right">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li><a href="#">Action</a>
                                        </li>
                                        <li><a href="#">Another action</a>
                                        </li>
                                        <li><a href="#">Something else here</a>
                                        </li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>3326</td>
                                                    <td>10/21/2013</td>
                                                    <td>3:29 PM</td>
                                                    <td>$321.33</td>
                                                </tr>
                                                <tr>
                                                    <td>3325</td>
                                                    <td>10/21/2013</td>
                                                    <td>3:20 PM</td>
                                                    <td>$234.34</td>
                                                </tr>
                                                <tr>
                                                    <td>3324</td>
                                                    <td>10/21/2013</td>
                                                    <td>3:03 PM</td>
                                                    <td>$724.17</td>
                                                </tr>
                                                <tr>
                                                    <td>3323</td>
                                                    <td>10/21/2013</td>
                                                    <td>3:00 PM</td>
                                                    <td>$23.71</td>
                                                </tr>
                                                <tr>
                                                    <td>3322</td>
                                                    <td>10/21/2013</td>
                                                    <td>2:49 PM</td>
                                                    <td>$8345.23</td>
                                                </tr>
                                                <tr>
                                                    <td>3321</td>
                                                    <td>10/21/2013</td>
                                                    <td>2:23 PM</td>
                                                    <td>$245.12</td>
                                                </tr>
                                                <tr>
                                                    <td>3320</td>
                                                    <td>10/21/2013</td>
                                                    <td>2:15 PM</td>
                                                    <td>$5663.54</td>
                                                </tr>
                                                <tr>
                                                    <td>3319</td>
                                                    <td>10/21/2013</td>
                                                    <td>2:13 PM</td>
                                                    <td>$943.45</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div id="morris-bar-chart"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-clock-o fa-fw"></i> Responsive Timeline
                        </div>
                        <div class="panel-body">
                            <ul class="timeline">
                                <li>
                                    <div class="timeline-badge"><i class="fa fa-check"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                            <p><small class="text-muted"><i class="fa fa-clock-o"></i> 11 hours ago via Twitter</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-badge warning"><i class="fa fa-credit-card"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem quibusdam, tenetur commodi provident cumque magni voluptatem libero, quis rerum. Fugiat esse debitis optio, tempore. Animi officiis alias, officia repellendus.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores odit qui est tempora eos, nostrum provident explicabo dignissimos debitis vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-badge danger"><i class="fa fa-bomb"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam facilis enim eaque, tenetur nam id qui vel velit similique nihil iure molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-badge info"><i class="fa fa-save"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam debitis amet, beatae consequuntur impedit nulla qui! Laborum, atque.</p>
                                            <hr>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                                                    <i class="fa fa-gear"></i> <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#">Action</a>
                                                    </li>
                                                    <li><a href="#">Another action</a>
                                                    </li>
                                                    <li><a href="#">Something else here</a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li><a href="#">Separated link</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi fuga odio quibusdam. Iure expedita, incidunt unde quis nam! Quod, quisquam. Officia quam qui adipisci quas consequuntur nostrum sequi. Consequuntur, commodi.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-badge success"><i class="fa fa-graduation-cap"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati, quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque eaque.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bell fa-fw"></i> Notifications Panel
                        </div>
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-comment fa-fw"></i> New Comment
                                    <span class="pull-right text-muted small"><em>4 minutes ago</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                    <span class="pull-right text-muted small"><em>12 minutes ago</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-envelope fa-fw"></i> Message Sent
                                    <span class="pull-right text-muted small"><em>27 minutes ago</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-tasks fa-fw"></i> New Task
                                    <span class="pull-right text-muted small"><em>43 minutes ago</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-upload fa-fw"></i> Server Rebooted
                                    <span class="pull-right text-muted small"><em>11:32 AM</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-bolt fa-fw"></i> Server Crashed!
                                    <span class="pull-right text-muted small"><em>11:13 AM</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-warning fa-fw"></i> Server Not Responding
                                    <span class="pull-right text-muted small"><em>10:57 AM</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-shopping-cart fa-fw"></i> New Order Placed
                                    <span class="pull-right text-muted small"><em>9:49 AM</em>
                                    </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-money fa-fw"></i> Payment Received
                                    <span class="pull-right text-muted small"><em>Yesterday</em>
                                    </span>
                                </a>
                            </div>
                            <a href="#" class="btn btn-default btn-block">View All Alerts</a>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Donut Chart Example
                        </div>
                        <div class="panel-body">
                            <div id="morris-donut-chart"></div>
                            <a href="#" class="btn btn-default btn-block">View Details</a>
                        </div>
                    </div>
                    <div class="chat-panel panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-comments fa-fw"></i> Chat
                            <div class="btn-group pull-right">
                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu slidedown">
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-refresh fa-fw"></i> Refresh
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-check-circle fa-fw"></i> Available
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-times fa-fw"></i> Busy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-clock-o fa-fw"></i> Away
                                        </a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-sign-out fa-fw"></i> Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="panel-body">
                            <ul class="chat">
                                <li class="left clearfix">
                                    <span class="chat-img pull-left">
                                        <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">Jack Sparrow</strong>
                                            <small class="pull-right text-muted">
                                                <i class="fa fa-clock-o fa-fw"></i> 12 mins ago
                                            </small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                        </p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img pull-right">
                                        <img src="http://placehold.it/50/FA6F57/fff" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <small class=" text-muted">
                                                <i class="fa fa-clock-o fa-fw"></i> 13 mins ago</small>
                                            <strong class="pull-right primary-font">Bhaumik Patel</strong>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                        </p>
                                    </div>
                                </li>
                                <li class="left clearfix">
                                    <span class="chat-img pull-left">
                                        <img src="http://placehold.it/50/55C1E7/fff" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <strong class="primary-font">Jack Sparrow</strong>
                                            <small class="pull-right text-muted">
                                                <i class="fa fa-clock-o fa-fw"></i> 14 mins ago</small>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                        </p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img pull-right">
                                        <img src="http://placehold.it/50/FA6F57/fff" alt="User Avatar" class="img-circle" />
                                    </span>
                                    <div class="chat-body clearfix">
                                        <div class="header">
                                            <small class=" text-muted">
                                                <i class="fa fa-clock-o fa-fw"></i> 15 mins ago</small>
                                            <strong class="pull-right primary-font">Bhaumik Patel</strong>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="panel-footer">
                            <div class="input-group">
                                <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                                <span class="input-group-btn">
                                    <button class="btn btn-warning btn-sm" id="btn-chat">
                                        Send
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
		
			$("#wrapper").append(s);
		}
		

if(getCookie('token') != '')
{
	initAdminPanel();
}
else
{
	initLoginPanel();
}


