/**
 Vista con el listado de alumnos de un ciclo.
 **/
import { Vista } from './vista.js'

export class VistaGestionAlumnos extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.cursos = []

    // Cogemos referencias a los elementos del interfaz
    this.listaAlumnos = document.getElementById('gestionAlumnosListado')
    

    // Asociamos eventos
    

    // Ejecutar metodos necesarios

  }

  /**
   * Carga los cursos en el select de la vista.
   */
  

  /**
   * Carga los alumnos en el listado filtrados por curso.
   */
  cargarFiltrado(){

    this.controlador.getAlumnos().then(alumnos => {
      console.log(alumnos)
      this.crearDivAlumno(alumnos);
    });
  }

  /**
   Crea el div asociado a un alumno y lo añade a la base.
   @param alumno {Alumno} Datos del alumno.
   **/
  crearDivAlumno (alumnos){
    if (!$.fn.DataTable.isDataTable('#tablaAlumnos')) {
      $('#tablaAlumnos').DataTable();
    }
  
    const tabla = $('#tablaAlumnos').DataTable();
    tabla.clear(); // Limpiar datos existentes
  
    alumnos.forEach(alumno => {
      tabla.row.add([
        `<span class="alumno" data-id="${alumno.id}" style="cursor:pointer">${alumno.apellidos}</span>`,
        `<span>${alumno.nombre}</span>`,
        `<span>${alumno.codigo}</span>`,
        `<span>${alumno.email}</span>`,
        `<span class="iconos">
           <img class="icono borrar" data-id="${alumno.id}" src="iconos/delete.svg" style="cursor:pointer" title="Eliminar">
         </span>`
      ]);
    });
  
    tabla.draw();
  
    // Evento para modificar actividad
    $('#tablaAlumnos').off('click', 'span.alumno').on('click', 'span.alumno', (e) => {
      const id = $(e.currentTarget).data('id');
      const alumno = alumnos.find(a => a.id === id);
      if (alumno) {
        this.modificarAlumno(alumno, alumno.idCurso);
      }
    });
  
    // Evento para borrar actividad
    $('#tablaAlumnos').off('click', 'img.icono').on('click', 'img.icono', (e) => {
      const id = $(e.currentTarget).data('id');
      const alumno = alumnos.find(a => a.id === id);
      if (alumno) {
        this.borrarAlumno(alumno.id, alumno.nombre);
      }
    });
  }

  /**
   * Borra el alumno seleccionado.
   * @param alumnoId {Number} Identificador del alumno.
   */
  borrarAlumno(alumnoId, alumnoNombre) {
    this.controlador.eliminarAlumno(alumnoId, alumnoNombre)
  }


  /**
   * Redirige a la vista para modificar el alumno.
   * @param alumno {} Datos modificables del alumno.
   */
  modificarAlumno (alumno) {
    this.controlador.mostrarModificarAlumno(alumno)
  }

}
