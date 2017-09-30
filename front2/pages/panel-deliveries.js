/**
 * Iniciar panel de entregas
 *
 * @param {string} type - Tipo de panel. Los valores válidos son: today,delayed,pending.
 */
function initDeliveriesPanel(type)
{
	let init = function(title, json)
	{
		initContentPanel(title, function(container)
		{
			createAdvancedTable(
				container,
				json.deliveries.length,
				["#", "#Venta", "Fecha", "Dirección", "Entregado" ],
				function(col, row)
				{
					if(col == 0)	return json.deliveries[row].id;
					if(col == 1)	return json.deliveries[row].sale_id;
					if(col == 2)	return json.deliveries[row].date;
					if(col == 3)	return json.deliveries[row].location;
					if(col == 4)	return json.deliveries[row].delivered == 1 ? "Si" : "No";
					return "";
				});
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
