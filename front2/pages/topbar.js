function createTopBar(nav){
	// -------------------- Declaraciones ---------------------------//
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
	var self = {
		addDropdown: function(panel, icon, type, filler){
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
		},
		addDropdownDiv: function(ul){
			ul.append('<li class="divider"></li>');
		},
		addDropdownItem: function(ul, icon, label, onclick){
			let li = $('<li><a href="javascript:void(0)"><i class="fa '+icon+' fa-fw"></i> '+label+'</a></li>');
			li.on('click', onclick);
			ul.append(li);
		},
		addDropdownAlert: function(ul, icon, label, elapsed, onclick){
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
		},
		render: function(){
			self.addDropdown(links, 'fa-bell', "dropdown-alerts", function(ul){
				let needDivider = false;
				// 1) Obtener las entregas de hoy
				api.getTodayDeliveries(function(json)
				{
					if(json.ret == 0 && json.deliveries.length > 0)
					{
						needDivider = true;
						self.addDropdownAlert(ul, 'fa-car', 'Entregas de hoy', json.deliveries.length, function(){initDeliveriesPanel('today');});
					}
					// 2) Obtener las entregas atrasadas
					api.getPendingDeliveries(function(json)
					{
						if(needDivider)
							self.addDropdownDiv(ul);
						if(json.ret == 0 && json.deliveries.length > 0)
						{
							needDivider = true;
							self.addDropdownAlert(ul, 'fa-car', 'Entregas atrasadas', json.deliveries.length, function(){initDeliveriesPanel('delayed');});
						}
						// 3) Por ahora nada más, ...
					});
				});
			});
			self.addDropdown(links, 'fa-user', "dropdown-user", function(ul){
				self.addDropdownItem(ul, 'fa-user', 'Perfil', function(){});
				self.addDropdownItem(ul, 'fa-gear', 'Configuración', function(){});
				self.addDropdownDiv(ul);
				self.addDropdownItem(ul, 'fa-sign-out', 'Salir', function(){
					clearAllCookies();
					location.reload();
				});
			});
			
			// ...
			nav.append(header);
			nav.append(links);
		}
	}
	return self;
}