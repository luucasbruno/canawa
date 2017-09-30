/**
 * Iniciar panel de logeo
 */
function initLoginPanel(){
	let s = `
			<div class="container">
				<div class="row">
					<div class="col-md-4 col-md-offset-4">
						<div class="login-panel panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">Canawa</h3>
							</div>
							<div class="panel-body">
								<form role="form" id="form" action="javascript:void(0)">
									<fieldset>
										<div class="form-group">
											<input class="form-control" placeholder="Usuario" id="username" type="text" autofocus>
										</div>
										<div class="form-group">
											<input class="form-control" placeholder="Contraseña" id="password" type="password" value="">
										</div>
										<button class="btn btn-lg btn-success btn-block">Entrar</button>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>`;

	$(document.body).html(s);

	$('#form').on('submit', function(){
		api.login($('#username').val(), $('#password').val(), function(json)
		{
			if(json.ret != 0)
			{
				// TODO: tratar error
			}
			else
			{
				setCookie('token', json.token, 0);
				location.reload();
			}
		});
	});
}