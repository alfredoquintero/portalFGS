	
	/*
	 * Modulo para la creación del menu dinamico
	 * **/	

		function loadMenu(){
			loadMenuByUser($('#idUserSesion').val());
		}

		function loadMenuByUser(idUser){
			 logger('Entra a loadMenuByUser, idUser:'+idUser);	
			$.ajax({
				url : 'loadMenuByUser',
				type : "POST",
				data : {'menuJson.idUser':idUser},
				dataType : "json",
				success : 
					function(jsonResponse, textStatus, jqXHR) {
						logger('Modulos:'+jsonResponse.result);
						
						if (jsonResponse.success == true) { 
							logger('loadModulosByRol - Success::::');
							obtieneMenuByUser(jsonResponse);
						} else {
							logger('loadModulosByRol - parseActionErrors::::');							
						}
					},
				error : 
					function(jqXHR, textStatus, errorThrown) {
						
						logger("loadModulos - Ocurrio un error en su peticion Errs_ " + textStatus + ", " + errorThrown);
						var error = new Object();
						error.mensaje = "Ocurrio un error al intentar procesar su peticion, por favor reintentelo.";
						
					}
			});	
		}
		 
		
			
		function obtieneMenuByUser(jsonResponse){
			 logger('En obtieneMenuByUser');	
			
			var header = '<ul class="navbar-nav mr-auto" id="menuByUser">';
			var menuStr = '';
			var menu = '';
			var menuFinal = '';
			var footer = '</ul>';
			
			$.each(jsonResponse.result, function(index, arrayValores) {
				 logger('obtieneModulos; recorriendo todo el result:' + arrayValores.idmodulo);
				 //if(arrayValores.idRol!=null){
					// modulosHeader[arrayValores.idModulo] = arrayValores.idModulo;
				 alert(arrayValores.idsubmodulo);
				// }
				
				 menu = createModule(arrayValores);
				 menuFinal = menuFinal + menu; 
			});
			
			menuStr = header + menuFinal + footer;
			alert(menuStr);
			$('#menuByUser').html(menuStr);
		}
		
		function createModule(arrayVal){
			
			var menuStr = '';
			
			if(arrayVal.idsubmodulo == 0){
				menuStr = menuStr + '<li class="nav-item active">';
				menuStr = menuStr + '<a class="nav-link" href="'+arrayVal.urlModulo+'">'+arrayVal.modulo+' <span class="sr-only">(current)</span></a></li>';
			}else{
				
				menuStr = menuStr + '<li class="nav-item dropdown">';
				menuStr = menuStr + '<a class="nav-link dropdown-toggle" href="'+arrayVal.urlModulo+'" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
				menuStr = menuStr + arrayVal.modulo;
				menuStr = menuStr + '</a>';
				menuStr = menuStr + '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">';
				menuStr = menuStr + '<a class="dropdown-item" href="'+arrayVal.urlSubModulo+'">'+arrayVal.submodulo+'</a>';
				menuStr = menuStr + '</div></li>';
				
			}
	        			 
			//alert(menuStr);
			return menuStr;
			
		}
		
		function createSubModule(){
			
			
		}
		
		function createMenu(){
			
			$('#menuByUser').html($('#menusSession').val());
		}