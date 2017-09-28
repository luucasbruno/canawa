
function createTable(container, rows, columns, getTableItem){
	let s = '';
	
	s += '<div class="panel-body">';
		s += '<table class="table table-striped table-bordered table-hover">';
			s += '<thead>';
				s += '<tr>';
					for(i = 0; i < columns.length; i++){
						s += '<th>'+columns[i]+'</th>';
					}
				s += '</tr>';
			s += '</thead>';

			s += '<tbody>';
			for(i = 0; i < rows; i++)
			{
				s += '<tr class="odd gradeX">';
				for(j = 0; j < columns.length; j++)
				{
					s += '<td>'+getTableItem(j,i)+'</td>';
				}
				s += '</tr>';
			}
			s += '</tbody>';
		s += '</table>';
	s += '</div>';
	
	container.append(s);
}

function createAdvancedTable(container, rows, columns, getTableItem){
	let s = `
	<div class="panel-body">
		<table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
			<thead>
				<tr>`;
					for(i = 0; i < columns.length; i++)
					{
						s += '<th>'+columns[i]+'</th>';
					}
					s += `
				</tr>
			</thead>
			<tbody>
				`;
				for(i = 0; i < rows; i++)
				{
				s += '<tr class="odd gradeX">';
					for(j = 0; j < columns.length; j++)
					{
						s += '<td>'+getTableItem(j,i)+'</td>';
					}
				s += '</tr>';
				}
				
			s += `
			</tbody>
		</table>
	</div>
	`;
	container.html(s);
}



