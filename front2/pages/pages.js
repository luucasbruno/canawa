function createPage(type){
	var getDataPage = function(type){
		switch(type){
			case 'brands':
				var dataPage = {columns:[
											{title: "#", data: "id"},
											{title: "Nombre", data: "name"}
									],
								name: 'Marcas'
				};break;
			case 'categories':
				var dataPage = {columns:[
											{title: "#", data: "id"},
											{title: "Descripción", data: "description"}
										],
								name : 'Categorías'
				};break;
			case 'clients':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "Nombre", data: "name"},
											{title: "CUIT", data: "cuit"},
											{title: "Correo electrónico", data: "email"},
											{title: "Teléfono", data:"phone"},
											{title: "Dirección", data: "location"},
									],
								name: 'Clientes'
				};break;
			case 'products':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "Nombre", data: "name"},
											{title: "Marca", data: "brand"},
											{title: "Proveedor", data: "provider"},
											{title: "Precio minorista", data:"retail_price"},
											{title: "Precio mayorista", data: "wholesale_price"},
									],
								name: 'Productos'
				};break;
			case 'suppliers':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "Nombre", data: "name"},
											{title: "Correo electrónico", data: "email"},
											{title: "Teléfono", data:"phone"},
											{title: "Compañía", data: "company"},
									],
								name: 'Proveedores'
				};break;
			case 'sales':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "Usuario", data: "user"},
											{title: "Cliente", data: "client"},
											{title: "Total", data: "total"},
											{title: "Fecha", data:"timestamp"},
									],
								name: 'Ventas'
						};break;
			case 'todayDeliveries':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "#Venta", data: "sale_id"},
											{title: "Fecha", data: "date"},
											{title: "Dirección", data: "location"},
											{title: "Entregado", data:"delivered",
											 render: function(isDelivered){
													return(isDelivered==1 ? "Si" : "No");
												}
											}
									],
								name: 'Entregas de Hoy'
				};break;
			case 'pendingDeliveries':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "#Venta", data: "sale_id"},
											{title: "Fecha", data: "date"},
											{title: "Dirección", data: "location"},
											{title: "Entregado", data:"delivered",
											 render: function(isDelivered){
													return(isDelivered==1 ? "Si" : "No");
												}
											}
									],
								name: 'Entregas Pendientes'
				};break;
		
			case 'delayedDeliveries':
				var dataPage = {columns: [
											{title: "#", data: "id"},
											{title: "#Venta", data: "sale_id"},
											{title: "Fecha", data: "date"},
											{title: "Dirección", data: "location"},
											{title: "Entregado", data:"delivered",
											 render: function(isDelivered){
													return(isDelivered==1 ? "Si" : "No");
												}
											}
									],
								name: 'Entregas Atrasadas'
				};break;
		}
		return dataPage;
	}
	var self = {
		dataPage: getDataPage(type),
		initContent: function(title, filler){
			let header = $("#page-header");
			let content = $("#page-content");
			
			header.html(title);
			content.html('');
			if(filler)
				filler(content);
		},
		getAsyncData: function(callback){api.get(type,callback)},
		render: function(){
			self.getAsyncData(function(data){
				self.initContent(self.dataPage.name, function(container){
					createTable(container,
								self.dataPage.columns,
								type,
								Object.values(data)[1]
					);
				});
			});
		}
	}
	return self;
}