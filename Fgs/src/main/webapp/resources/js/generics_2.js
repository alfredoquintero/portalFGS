/** 
 * Funciones genericas que se usarán dentro de todo el proyecto
 * 
 */

var requestBussy = false;
var winH = $(window).height();
var winW = $(window).width();

/***
 * Función para mostrar de manera segura un mensaje en la consola de JS del navegador. 
 * @param msg
 */
function logger(msg){
	try{
		//no funciona en IE
		console.log(msg);
	}catch(err){}//nada
}

var msgTimmer=null;
var divTimmer=null;
/***
 * Función para mostrar en la sección de errores (warnContainer y errorContainer) el mensaje y los errores indicados.
 * se puede mandar array de errores en la propiedad result. Ej. jsonObject.result = ['idUno|error propiedad uno','idDos|Error en la propiedad2']
 * para mostrar un error general se debe settear propiedad mensaje Ej. jsonObject.mensaje="ocurrió un problema con su operación"
 * @param jsonObject var obj = new Object(); obj.mensaje="Mensaje de error";obj.result= ['idUno|error propiedad uno','idDos|Error en la propiedad2'];
 */
function parseActionErrors(jsonObject){

	if(jsonObject!=null){
		if("NOSESSION"== jsonObject.mensaje){
			$("#errorContainer").hide();
			$("#successContainer").hide();

			$("#warnText").html("Estimado usuario, su sesi&oacute;n ya no es v&aacute;lida, por favor inicie sesi&oacute;n nuevamente.");
			$("#warnContainer").slideDown("fast");					
		}else{
			if(jsonObject.result!=null && jsonObject.result.length>0){
				for(var i=0;i<jsonObject.result.length;i++){
					var err = jsonObject.result[i];
					//logger('ERROR: '+ err);
					if(err!=null && err.length>3 && err.indexOf('|')>1){
						var indx = err.indexOf('|');
						var idErr = err.substring(0,indx);
						var txtErr= err.substring((indx+1),err.length);
						logger('ID: ' + idErr + ', ' + txtErr);
						var obj = $("#"+idErr);
						if(obj[0]){
							obj.siblings(".actionError").text(txtErr);
						}
					}
				}
			}

			$("#successContainer").hide();
			$("#warnContainer").hide();
			if(jsonObject.mensaje!=null && jsonObject.mensaje!=""){
				$("#errorText").html(jsonObject.mensaje);
				$("#errorContainer").slideDown('fast');
				clearTimeout(msgTimmer);
				msgTimmer = setTimeout(function(){$("#errorContainer").fadeOut(1000);}, 8000);
			}
		}
	}else{
		$("#errorContainer").hide();
		$("#successContainer").hide();
		$("#warnText").html("Estimado usuario, su sesi&oacute;n ya no es v&aacute;lida, por favor inicie sesi&oacute;n nuevamente.");
		$("#warnContainer").slideDown("fast");
		clearTimeout(msgTimmer);
		msgTimmer = setTimeout(function(){$("#warnContainer").fadeOut(1000);}, 8000);
	}
}

/***
 * Método para hacer append de un form y  enviarlo.
 * @param action Url action.
 * @param method default 'POST'
 * @param values objeto jQuery con valores (name y value). ejemplo : doSubmit(formURL, 'POST',  [{ name: 'nombre', value: 'Hiber' }]);
 */
function doSubmit(action, method, values) {
	var form = $('<form/>', {
		action: action,
		method: method
	});
	$.each(values, function() {
		form.append($('<input/>', {
			type: 'hidden',
			name: this.name,
			value: this.value
		}));    
	});
	form.appendTo('body').submit();
}
/***
 * Método JS para cargar un modulo de usuario.
 * @param idMod id del modulo a cargar.
 */
function funLoadModuloDeUsuario(idMod){
	$('#menu').hide();
	requestBussy=true;
	var formURL = "loadModuloDeUsuario";

	doSubmit(formURL, 'POST', [{ name: 'idModulo', value: idMod }]);

}

function soloNumeros(event){
	// permitir: backspace, delete, tab, escape, enter,etc
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
		//no hacer nada, permitir el evento
		return;
		//(event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )
	}else if (event.shiftKey || !((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105))) {
		event.preventDefault(); 
	}
}

function soloNumerosTiempo(event,value){
	var length = 0;
	var count=0;
	if(value!=null){
		length = value.length;
		if(value.indexOf(":")>0){
			count++;
		}
	}
	// permitir: backspace, delete, tab, escape, enter,etc
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39) || (event.keyCode == 190 && event.shiftKey &&  count==0 && length>=1 ) ) {
		//no hacer nada, permitir el evento
		return;
		//(event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )
	}else if (event.shiftKey || !((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105))) {
		event.preventDefault(); 
	}
}

function soloNumerosDecimal(event,value){
	var length = 0;
	var count=0;
	if(value!=null){
		length = value.length;
		if(value.indexOf(".")>0){
			count++;
		}
	}
	// permitir: backspace, delete, tab, escape, enter,etc
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39) || ((event.keyCode == 190 ||  event.keyCode == 110) && event.shiftKey==false &&  count==0 && length>=1 ) ) {
		//no hacer nada, permitir el evento
		return;
		//(event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )
	}else if (event.shiftKey || !((event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105))) {
		event.preventDefault(); 
	}
}

function cleanActionErrors(){
	if($(".actionError")[0]){
		$(".actionError").each(function(){
			$(this).text('');
		});
	}
	if($(".errItem")[0]){
		$(".errItem").each(function(){		
			$(this).css("color","#000000");
		});
	}

	$("#errorContainer").hide();
	$("#warnContainer").hide();
	$("#successContainer").hide();
}

function showWait(){
	requestBussy=true;
	try{
		//clearTimeout(divTimmer);
		//divTimmer = setTimeout(function(){$("body").addClass('ui-state-disabled');}, 1000);
		var divh= $("#waithDiv");
		if(divh[0]){
			$(divh).css('top',(winH/3-28));
			$(divh).css('left',(winW/2-23));
			divh.fadeIn("fast");			
		}
	}catch(Errr){
		logger(Err);
	}
}

function hideWait(){
	requestBussy=false;
	try{
		if($("#waithDiv")[0]){
			$("#waithDiv").hide(0);
		}
		//$("body").removeClass('ui-state-disabled');
	}catch(Errr){
		logger(Err);
	}
}

function noCancel(){
	//no hace nada.
}

function doConfirm(confirmText,okText, cancelText, okCallback, cancelCallback, parameter) { alert('entrra en doConfirm');
	$("#dialog-confirm-text").text(confirmText);
	$("#dialog-input-text").css('display','none');
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height:150,
        width:300,
        modal: true,
        buttons: [{
            text: okText,
            click : function() {    
                $( this ).dialog( "close" );
	                if(parameter!=null && parameter[0]){
	                	okCallback(parameter);
	                }else{
	                	okCallback();
	                }
            }
        }, 
        {
        	text: cancelText,
            click: function() {
                $( this ).dialog( "close" );
                cancelCallback();
            }
        }]
    });
}

function doPrompt(promptText,okText, cancelText, okCallback, cancelCallback, defaultValue, elements) {
	$("#dialog-confirm-text").text(promptText);
	$("#dialog-input-text").css('display','block');
	$("#dialog-input-text").attr('disabled',false);
	if(defaultValue!=null && defaultValue.length>0){
		$("#dialog-input-text").val(defaultValue);
	}else{
		$("#dialog-input-text").val('');
	}
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height:220,
        width:300,
        modal: true,
        buttons: [{
            text: okText,
            click : function() {    
	                $( this ).dialog( "close" );
	                if(elements && elements!=null){
	                	okCallback(elements);
	                }else{
	                	okCallback();
	                }
                }
            }, {
            text: cancelText,
            click: function() {
                $( this ).dialog( "close" );
                cancelCallback();
            }}]
        });
    }

function alerta(texto,okText) {
	$("#dialog-confirm-text").text(texto);
	$("#dialog-input-text").css('display','none');
    $( "#dialog-confirm" ).dialog({
        resizable: false,
        height:150,
        width:300,
        modal: true,
        buttons: [{
            text: okText,
            click : function() {    
                $( this ).dialog( "close" );                
                }
            }]
        });
    }


function validaHora(hr){
	var hasErrors = false;
	var hora  = ""+hr;
	if(hora==null ||hora.trim().length<=3){
		hasErrors=true;		
	}else{
		var index = hora.indexOf(":");
		if(index<=0){
			hasErrors=true;
		}else {
			//horas
			var horas = hora.substr(0,index);
			logger("HORAS; " + horas);
			if(isNaN(horas) || horas.length<2){
				hasErrors=true;				
			}else{
				var h= new Number(horas);
				if(h<0 || h>23){
					hasErrors=true;					
				}
			}

			//Minutos
			var min = hora.substr(index+1,hora.length);
			logger("MIN; " + min);
			if(isNaN(min) || min.length<2){
				hasErrors=true;				
			}else{
				var m= new Number(min);
				if(m<0 || m>59){
					hasErrors=true;					
				}
			}
		}
		
		
	}
	logger("HAS ERRORES: " + hasErrors);
	return !hasErrors;
}


function validaHoraMayor(hora1,hora2){
	var esMayor = false;
	var h1=0;
	var h2=0;
	var m1=0;
	var m2=0;
	hasErrors=false;	
	if(hora1==null ||hora1.trim().length<=3){
		hasErrors=true;		
	}else{
		var index = hora1.indexOf(":");
		if(index<=0){
			hasErrors=true;
		}else {
			//hora1s
			var hora1s = hora1.substr(0,index);
			logger("HORAS; " + hora1s);
			if(isNaN(hora1s) || hora1s.length<2){
				hasErrors=true;				
			}else{
				h1= new Number(hora1s);
				if(h1<0 || h1>23){
					hasErrors=true;					
				}
			}

			//Minutos
			
			var min = hora1.substr(index+1,hora1.length);
			logger("MIN; " + min);
			if(isNaN(min) || min.length<2){
				hasErrors=true;				
			}else{
				m1= new Number(min);
				if(m1<0 || m1>59){
					hasErrors=true;					
				}
			}
		}
		
		
	}
	
	//hora2
	if(hora2==null ||hora2.trim().length<=3){
		hasErrors=true;		
	}else{
		var index = hora2.indexOf(":");
		if(index<=0){
			hasErrors=true;
		}else {
			//hora2s
			var hora2s = hora2.substr(0,index);
			logger("HORAS; " + hora2s);
			if(isNaN(hora2s) || hora2s.length<2){
				hasErrors=true;				
			}else{
				h2= new Number(hora2s);
				if(h2<0 || h2>23){
					hasErrors=true;					
				}
			}

			//Minutos
			
			var min = hora2.substr(index+1,hora2.length);
			logger("MIN; " + min);
			if(isNaN(min) || min.length<2){
				hasErrors=true;				
			}else{
				m2= new Number(min);
				if(m2<0 || m2>59){
					hasErrors=true;					
				}
			}
		}
		
		
	}
	if(!hasErrors){
		if(h1<h2){
			esMayor=true;
		}else if(''+h1==''+h2 && m1<m2){
			esMayor=true;
		}
	}
	logger("HAS ERRORES: " + hasErrors + ", " + h1+ ":" + m1 + ", " + h2 + ":" + m2 + ", esMAyor: " + esMayor );
	
	return esMayor;
}

function resetFormElement(eL){
	if(eL!=null){
		var e= $(eL);
		if(e[0]){
			e.wrap('<form>').closest('form').get(0).reset();
			e.unwrap();
		}
	}
}


