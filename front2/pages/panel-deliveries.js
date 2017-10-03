 /**
 * Iniciar panel de entregas
 *
 * @param {string} type - Tipo de panel. Los valores válidos son: today,delayed,pending.
 */
function initDeliveriesPanel(type){
	let init = function(title, json)
	{
		initContentPanel(title, function(container)
		{
			createTable(
					container,
					columnas = [
						{title: "#", data: "id"},
						{title: "#Venta", data: "sale_id"},
						{title: "Fecha", data: "date"},
						{title: "Dirección", data: "tlocation"},
						{title: "Entregado", data:"delivered"
						 render: function(isDelivered){
						 	return(isDelivered==1 ? "Si" : "No");
						 }
						}
					],
					'deliveries',
					json.deliveries
				);
		});
	}
	if(type == 'today')
	{
		api.getTodayDeliveries(function(json)	{ init('Entregas de hoy', json); });
	}
	else if(type == 'delayed')
	{
		api.getDelayedDeliveries(function(json)	{ init('Entregas atrasadas', json); });
	}
	else if(type == 'pending')
	{
		api.getPendingDeliveries(function(json)	{ init('Entregas pendientes', json); });
	}
	else
	{
		// TODO: Tratar error
	}
}
