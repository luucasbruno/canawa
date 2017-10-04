
/**
 * Iniciar panel principal de administración
 */
function createAdminPanel(){
	var nav = $('<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0"></nav>');
	var wrapper = $('#wrapper');
	var self = {
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
		topBar: createTopBar(nav), 
		sideBar: createSideBar(nav),
		initContent: function(title, filler){
			let header = $("#page-header");
			let content = $("#page-content");
			
			header.html(title);
			content.html('');
			if(filler)
				filler(content);
		},
		render: function(){
			self.topBar.render();
			self.sideBar.render();
			wrapper.append(nav);
			wrapper.append(self.pageWrapper);
			self.initContent('Inicio', function(){});

		}
	}
	return self;
}
//-------- Ejecucion-----------//
if(getCookie('token') != '')
{
	var adminPanel = createAdminPanel();
	adminPanel.render();
}
else
{
	var loginPanel = createLoginPanel();
	loginPanel.render();
}


