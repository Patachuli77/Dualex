/**
 Vista con el listado de profesores.
 **/
import { Vista } from './vista.js'

export class VistaGestionProfesores extends Vista{
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
    this.listaProfesores = document.getElementById('gestionProfesoresListado')

    // Ejecutar metodos necesarios

  }

  /**
   * Carga los profesores en el listado filtrados por curso.
   */
  cargarFiltrado(){
    //this.limpiar()
   
    this.controlador.getProfesores().then(profesores => {
     
      this.crearDivProfesor(profesores);
    });
  }

  /**
   Crea el div asociado a un profesor y lo añade a la base.
   @param profesor {Profesor} Datos del profesor.
   **/
  crearDivProfesor (profesores){
    
    if (!$.fn.DataTable.isDataTable('#tablaProfesores')) {
      $('#tablaProfesores').DataTable();
    
    }

    const tabla = $('#tablaProfesores').DataTable();
    tabla.clear();

    profesores.forEach(profesor =>{
       
      tabla.row.add([
        `<span class="profesor" data-id="${profesor.id }" style="cursor:pointer">${profesor.apellidos}</span>`,
        `<span>${profesor.nombre}</span>`,
        `<span>${profesor.email}</span>`,
        `<span class="iconos">
           <img class="icono borrar" data-id="${profesor.id}" src="iconos/delete.svg" style="cursor:pointer" title="Eliminar">
         </span>`

      ]);

    });


    tabla.draw();

    //evento modificar
    $('#tablaProfesores').off('click', 'span.profesor').on('click', 'span.profesor', (e) => {
      const id = $(e.currentTarget).data('id');
      const profesor = profesores.find(a => a.id === id);
      if (profesor) {
        this.modificarProfesor(profesor);
      }
    });

    $('#tablaProfesores').off('click', 'img.icono').on('click', 'img.icono', (e) => {
      const id = $(e.currentTarget).data('id');
      const profesor = profesores.find(a => a.id === id);
      if (profesor) {
        this.borrarProfesor(profesor.id, profesor.nombre);
      }
    });

    /*const div = document.createElement('div')
    this.listaProfesores.appendChild(div)

    const spanProfesor = document.createElement('span')
    div.appendChild(spanProfesor)
    spanProfesor.classList.add('profesor')
    spanProfesor.textContent = `${profesor.nombre} ${profesor.apellidos} `
    spanProfesor.addEventListener("click", () => this.modificarProfesor(profesor))

    const spanProfesorEmail = document.createElement('span')
    div.appendChild(spanProfesorEmail)
    spanProfesorEmail.textContent = `/ ${profesor.email}`

    const spanIconos = document.createElement('span')
    div.appendChild(spanIconos)
    spanIconos.classList.add('iconos')

    const spanIconoBorrar = document.createElement('img')
    spanIconos.appendChild(spanIconoBorrar)
    spanIconoBorrar.classList.add('icono')
    spanIconoBorrar.src = 'iconos/delete.svg'
    spanIconoBorrar.addEventListener("click", () => this.borrarProfesor(profesor.id, profesor.nombre))
    */
  }

  /**
   * Borra el profesor seleccionado.
   * @param profesorId {Number} Identificador del profesor.
   */
  borrarProfesor(profesorId, profesorNombre) {
    this.controlador.eliminarProfesor(profesorId, profesorNombre)
  }


  /**
   * Redirige a la vista para modificar el profesor.
   * @param profesor {} Datos modificables del profesor.
   */
  modificarProfesor (profesor) {
    this.controlador.mostrarModificarProfesor(profesor)
  }


}
