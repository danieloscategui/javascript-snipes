var app = new Vue({
	el: '#condicion_mant',
	data: {
		estado: '',
		estados: {},
		condicion: {},
		condicionPadre:'',
		tablaCondiciones: '',
		tablaSubCondiciones:'',
		hideCondicionList: false,
		hideCondicionForm: true
	},
	mounted(){
		this.loadEstados();
		this.setupDataTable();
	},
	methods: {
		loadEstados: function(){
			var url = "api/estado/list";
			axios.get(url).then(response => {
				var array = new Array();
				$.each(response.data, function(i, data){
					var d = new Object();
					d['key'] = data.id;
					d['val'] = data.descripcion;
					array.push(d);
				})
				this.estados = array;
			});
		},
		estadoSelected: function(val){
			if (val > 0) {
				this.estado = val;
				this.condicionPadre = '';
				this.loadCondiciones();
			}
		},
		loadCondiciones: function(){
			var url = 'api/estado/'+this.estado+'/condicion';
			this.condicionPadre = '';
			tablaSubCondiciones.clear();
			tablaSubCondiciones.draw();
			tablaCondiciones.ajax.url(url).load();
		},
		loadSubcondiciones: function(idCondicion){
			var url = 'api/estado/'+this.estado+'/condicion/' + idCondicion;
			tablaSubCondiciones.ajax.url(url).load();
			url = "api/condicion/" + idCondicion;
			axios.get(url).then(response => {
				this.condicionPadre = response.data.descripcion;
			});
		},
		showCondicion: function(idCondicion){
			// tambien se usa para mostrar una subcondicion
			this.resetCondicionForm();
			this.hideCondicionList = true;
			this.hideCondicionForm = false;
			var url = "api/condicion/" + idCondicion;
			axios.get(url).then(response => {
				this.condicion = response.data;
				if(!this.condicion.idPadre) this.condicionPadre = ''
			});
		},
		showCondicionList: function(){
			(this.condicion.idPadre > 0)? this.loadSubcondiciones(this.condicion.idPadre) : this.loadCondiciones();
			this.hideCondicionList = false;
			this.hideCondicionForm = true;
			this.resetCondicionForm();
		},
		saveCondicion: function(){
			this.condicion.id > 0 ? this.updateCondicion() : this.createCondicion();
		},
		createCondicion:function(){
				var url="api/condicion";
				axios.post(url, this.condicion)
				.then(response => {
					if (response.data.success){
						alertify.success(response.data.message, 3, function(){
							app.showCondicionList();
						});
					}
				})
				.catch(error => {
					messageBecaError = error.response.data;
					alert(messageBecaError);
				});
		},
		updateCondicion:function(){
			var url="api/condicion";
			axios.put(url, this.condicion)
			.then(response => {
				if (response.data.success){
					alertify.success(response.data.message, 3, function(){
						app.showCondicionList();
					});
				}
			})
			.catch(error => {
				messageBecaError = error.response.data;
				alert(messageBecaError);
			});
		},
		setupDataTable: function(){
			tablaCondiciones = 
				$('#tbl-condiciones').DataTable({
					"type": "GET",
					"columns":[
						{"data":"descripcion"},
						{"orderable":false, "defaultContent": "", "className":"text-center",
						 "render": function(data, type, row, meta){
							 		if (type === 'display'){
							 			data = '<a class="fa fa-edit text-green" title="Ver registro" onclick=app.showCondicion($(this).data("id")) data-id='+ row.id +'></a>\t';
							 			data += '<a class="fa fa-list-alt text-green" title="Ver sub condiciones" onclick=app.loadSubcondiciones($(this).data("id")) data-id='+ row.id +'></a>\t'
							 			data += '<a class="fa fa-plus-square text-green" title="Crear sub condici&oacute;n" onclick=app.newCondicion($(this).data("id")) data-id='+ row.id +'></a>'
							 		}
							 		return data;
								   }
							}
					],
					"autoWidth": false
				});
			
			tablaSubCondiciones = 
				$('#tbl-subcondiciones').DataTable({
					"type": "GET",
					"columns":[
						{"data":"descripcion"},
						{"orderable":false, "defaultContent": "", "className":"text-center",
						 "render": function(data, type, row, meta){
							 		if (type === 'display'){
							 			data = '<a class="fa fa-edit text-green" title="Ver registro" onclick=app.showCondicion($(this).data("id")) data-id='+ row.id +'></a>';
							 		}
							 		return data;
							 	   }
						}
					],
					"autoWidth": false
				});
			
		},
		newCondicion: function(idCondicion){
			this.hideCondicionList = true;
			this.hideCondicionForm = false;
			this.resetCondicionForm();
			this.condicion.idEstado = this.estado
			this.condicion.idPadre = (idCondicion>0)? idCondicion : null;
			if(!idCondicion) this.condicionPadre = ''
		},
		resetCondicionForm: function(){
			this.condicion = {};
			$('#form-condicion').find("input[type=text], input[type=email]").val("");
		}
	}
});