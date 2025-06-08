/**
 Vista con la gestion de los modulos.
 **/
 import { Vista } from './vista.js'

 export class VistaGestionModulos extends Vista{
   /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
    **/
   constructor (controlador, base) {
     super(controlador)
     this.base = base
     
     // Cogemos referencias a los elementos del interfaz
     this.listaModulos = document.getElementById('gestionModulosListado')
     //this.listaModulosSelect = document.getElementById('selectCicloListadoModulos')
 
     // Asociamos eventos
     
 
     // Ejecutar metodos necesarios
 
   }
   
  /**
   * Carga las actividades en el listado filtrados por modulo.
   */
  cargarFiltrado(){
    this.controlador.verModulos().then(modulos => {
      
      this.crearDivModulo(modulos);
    });
  }
  crearDivModulo (modulos){
console.log(modulos)
    // Inicializar la tabla si aún no lo está
    if (!$.fn.DataTable.isDataTable('#tablaModulos')) {
      $('#tablaModulos').DataTable();
    }
  
    const tabla = $('#tablaModulos').DataTable();
    tabla.clear(); // Limpiar datos existentes
  
    modulos.forEach(modulo => {
      const estiloTitulo = modulo.activo === 0 ? 'color:red;' : '';
      tabla.row.add([
        `<span class="modulo" data-id="${modulo.id}" style="cursor:pointer; ${estiloTitulo}">${modulo.titulo}</span>`,
        `<span class = codigo style= "color : ${modulo.color_letra}; background-color : ${modulo.color_fondo}; ">${modulo.codigo}</span>`,
        `<span>${modulo.siglas_ciclo}</span>`,
        `<span class="iconos">
           <img class="icono borrar" data-id="${modulo.id}" src="iconos/delete.svg" style="cursor:pointer" title="Eliminar">
         </span>`
      ]);
    });
  
    tabla.draw();
  
    // Evento para modificar modulo
    $('#tablaModulos').off('click', 'span.modulo').on('click', 'span.modulo', (e) => {
      const id = $(e.currentTarget).data('id');
      const modulo = modulos.find(a => a.id === id);
      if (modulo) {
        this.modificarModulo(modulo);
      }
    });
  
    // Evento para borrar modulo
    $('#tablaModulos').off('click', 'img.icono').on('click', 'img.icono', (e) => {
      const id = $(e.currentTarget).data('id');
      const modulo = modulos.find(a => a.id === id);
      if (modulo) {
        this.controlador.desactivarModulo(modulo.id, modulo.titulo);
      }
    })
  }

  /**
   * Redirige a la vista para modificar el modulo.
   * @param modulo {} Datos modificables del alumno.
   */
  modificarModulo (modulo) {
    this.controlador.mostrarModificarModulo(modulo)
  }




}
 