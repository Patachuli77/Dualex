/**
 Vista con el alta de Actividades.
 **/
 import { Vista } from './vista.js'

 export class VistaGestionActividades extends Vista{
   /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
    **/
   constructor (controlador, base) {
     super(controlador)
     this.base = base
     this.modulos = []
     this.ciclos = []
     
     // Cogemos referencias a los elementos del interfaz
     this.listaActividades = document.getElementById('gestionActividadesListado')
     this.listaActividadesCicloSelect = document.getElementById('selectCicloListadoActividades')
     this.listaActividadesModuloSelect = document.getElementById('selectModuloListadoActividades')
     this.listaActividadesModuloP = document.getElementById('PModuloListadoActividades')
    
     // Asociamos eventos
   
 
     // Ejecutar metodos necesarios
 
   }
  /**
   * Carga las actividades en el listado filtrados por modulo.
   */
  cargarFiltrado(){


    this.controlador.getActividades().then(actividades => {
      
      this.crearDivActividad(actividades);
    });
    
  }
  crearDivActividad(actividades) {
    // Inicializar la tabla si aún no lo está
    if (!$.fn.DataTable.isDataTable('#tablaActividades')) {
      $('#tablaActividades').DataTable();
    }
  
    const tabla = $('#tablaActividades').DataTable();
    tabla.clear(); // Limpiar datos existentes
  
    actividades.forEach(actividad => {
      tabla.row.add([
        `<span class="actividad" data-id="${actividad.id}" style="cursor:pointer">${actividad.titulo}</span>`,
        `<span>${actividad.ciclos}</span>`,
        `<span>${actividad.modulos}</span>`,
        `<span class="iconos">
           <img class="icono borrar" data-id="${actividad.id}" src="iconos/delete.svg" style="cursor:pointer" title="Eliminar">
         </span>`
      ]);
    });
  
    tabla.draw();
  
    // Evento para modificar actividad
    $('#tablaActividades').off('click', 'span.actividad').on('click', 'span.actividad', (e) => {
      const id = $(e.currentTarget).data('id');
      const actividad = actividades.find(a => a.id === id);
      if (actividad) {
        this.modificarActividad(actividad);
      }
    });
  
    // Evento para borrar actividad
    $('#tablaActividades').off('click', 'img.icono').on('click', 'img.icono', (e) => {
      const id = $(e.currentTarget).data('id');
      const actividad = actividades.find(a => a.id === id);
      if (actividad) {
        this.borrarActividad(actividad.id, actividad.titulo);
      }
    });
  }


  /**
     * Redirige a la vista para modificar la actividad.
     * @param actividad {} Datos modificables del alumno.
     */
  modificarActividad (actividad) {
   
    this.controlador.mostrarModificarActividad(actividad)
  }

  /**
   * Borra la actividad seleccionado.
   * @param actividadId {Number} Identificador de la actividad.
   */
  borrarActividad(actividadId, actividadTitulo) {
    this.controlador.eliminarActividad(actividadId, actividadTitulo)
  }

}
 
 