/**
 Vista con el alta de ciclos.
 **/
 import { Vista } from './vista.js'

 export class VistaGestionCiclos extends Vista{
   /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
    **/
   constructor (controlador, base) {
     super(controlador)
     this.base = base
     
     
     // Cogemos referencias a los elementos del interfaz
     
    
     // Asociamos eventos
   
 
     // Ejecutar metodos necesarios
 
   }
  /**
   * Carga las ciclos en el listado filtrados por modulo.
   */
   cargarFiltrado(){


    this.controlador.getCiclos().then(ciclos => {
      
      this.crearDivCiclo(ciclos);
    });
   }
    crearDivCiclo(ciclos) {
    
    // Inicializar la tabla si aún no lo está
    if (!$.fn.DataTable.isDataTable('#tablaCiclos')) {
      $('#tablaCiclos').DataTable();
    }
  
    const tabla = $('#tablaCiclos').DataTable();
    tabla.clear(); // Limpiar datos existentes
  
    ciclos.forEach(ciclo => {
      tabla.row.add([
        `<span class="ciclo" data-id="${ciclo.id}" style="cursor:pointer">${ciclo.nombre}</span>`,
        `<span>${ciclo.siglas}</span>`,
        `<span>${ciclo.grado}</span>`,
        `<span class="iconos">
           <img class="icono borrar" data-id="${ciclo.id}" src="iconos/delete.svg" style="cursor:pointer" title="Eliminar">
         </span>`
      ]);
    });
  
    tabla.draw();
  
    // Evento para modificar ciclo
    $('#tablaCiclos').off('click', 'span.ciclo').on('click', 'span.ciclo', (e) => {
      const id = $(e.currentTarget).data('id');
      const ciclo = ciclos.find(a => a.id === id);
      if (ciclo) {
        this.modificarCiclo(ciclo);
      }
    });
  
    // Evento para borrar ciclo
    $('#tablaCiclos').off('click', 'img.icono').on('click', 'img.icono', (e) => {
      const id = $(e.currentTarget).data('id');
      const ciclo = ciclos.find(a => a.id === id);
      if (ciclo) {
        this.borrarCiclo(ciclo.id, ciclo.nombre);
      }
    })
  
    
  }

  modificarCiclo (ciclo) {
    this.controlador.mostrarModificarCiclo(ciclo)
  }

  /**
   * Borra la ciclo seleccionado.
   * @param ciclodId {Number} Identificador de la ciclo.
   */
  borrarCiclo(cicloId, cicloNombre) {
    
    this.controlador.eliminarCiclo(cicloId, cicloNombre)
  }

}
 
 