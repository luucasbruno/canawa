function createTable(container,columns,id,data){
	let s = `
	<div class="panel-body">
		<table width="100%" class="table table-striped table-bordered table-hover" id="dataTable-`+id+`"></table>
	</div>
	`;
	container.html(s);

	///----------- Inicialización de las dataTables
	$(document).ready(function() {
		var table = $('#dataTable-'+id).DataTable({
			data: data,
			stateSave: true,
			columns: columns
		});

	table.on('click', 'tr', function(){
		$(this).toggleClass('selected');
	});
	$('#submit-'+id).click( function (){
		let rows = table.rows('.selected').data(); // array con los datos de las filas que fueron seleccionadas
	} );
} );
}