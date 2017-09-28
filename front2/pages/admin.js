
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
	initContentPanel('Inicio', function()
	{
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


//-------- Ejecucion-----------//
if(getCookie('token') != '')
{
	initAdminPanel();
}
else
{
	initLoginPanel();
}


