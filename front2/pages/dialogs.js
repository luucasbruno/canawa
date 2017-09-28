/**
 * Crear un dialogo modal
 * 
 * @param {string}   title    - Título
 * @param {function} fill     - Función callback para generar el contenido
 * @param {function} onShow   - Función luego de hacerse visible
 * @param {function} onSubmit - Función que se invoca luego del submit
 */
function createDialog(title, fill, onShow, onSubmit)
{
	var txt = '<div class="modal fade" id="idModal" tabindex="-1" role="dialog" aria-labelledby="idModalInputLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="idModalInputLabel">'+title+'</h4> </div> <div class="modal-body"> <form id="idModalInputForm" action="javascript:void(0)" class="clearfix">';
	var content;
	
	if(undefined != (content = fill()))
	{
		txt += content;
	}
	
	txt += '</form>';
	
	txt += '</div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button> <button type="button" class="btn btn-primary" id="idModalInputAccept">Aceptar</button> </div> </div> </div> </div>';

	$(document.body).append(txt);
	
	var onAccept = function()
	{
		$('#idModal').modal('hide');
		onSubmit($('#idModal'));
	}
	$('#idModal').on('shown.bs.modal', function (e)
	{
		$('#idModalInputAccept').focus();
		onShow($('#idModal'));
	});
	$('#idModal').on('hidden.bs.modal', function (e)
	{
		$('#idModal').remove();
	});
	$('#idModalInputForm').on('submit', onAccept);
	$('#idModalInputAccept').on('click', onAccept);

	$('#idModal').modal('show');
}

