
/**
 * Iniciar panel principal de administración
 */
function crearAdminPanel(){
	return{
		nav: $('<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0"></nav>'),
		wrapper: $('#wrapper'),
		pageWrapper: `
				<div id="page-wrapper">
					<div class="row">
						<div class="col-lg-12">
							<h1 class="page-header" id="page-header">Inicio</h1>
						</div>
					</div>
					<div class="row" id="page-content">
					</div>
				</div>
				`,
	//	topBar: crearTopBar(nav), <-----TODO
	//	sideBar: crearSideBar(nav), <-----TODO
		initContent: function(title, filler){
			let header = $("#page-header");
			let content = $("#page-content");
			
			header.html(title);
			content.html('');
			if(filler)
				filler(content);
		},
		render: function(){
			initTopBar(this.nav);
			initSideBar(this.nav);
			this.wrapper.append(this.nav);
			this.wrapper.append(this.pageWrapper);
			this.initContent('Inicio', function(){});

		}
	}
}


/*
function initAdminPanel(){
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
	initContentPanel('Inicio', function(){
	});
}

/**
 * Iniciar un panel sin conocer cual será su contenido
 *
 * @param {string}   title  - Título del panel
 * @param {callback} filler - Función callback que generará el contenido
 */
/*
function initContentPanel(title, filler){
	let header = $("#page-header");
	let content = $("#page-content");
	
	header.html(title);
	content.html('');
	if(filler)
		filler(content);
}
*/

//-------- Ejecucion-----------//
if(getCookie('token') != '')
{
	var adminPanel = crearAdminPanel();
	adminPanel.render();
}
else
{
	initLoginPanel();
}


