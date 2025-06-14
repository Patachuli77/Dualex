/**
  Vista del menú de navegación de la aplicación.
  Muestra los enlaces de contexto.
**/

import { Vista } from './vista.js'

export class VistaMenu extends Vista{
  /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista principal.
    @param {Node} base Nodo al que se añadirá la vista principal.
  **/
  constructor (controlador, base) {
	super(controlador, 'flex')
    this.base = base
  
    // Cogemos referencias a los elementos del interfaz

    // Asociamos eventos
  }

  /**
    Muestra el menú asociado a la lista de alumnos de un profesor.
    El menú incluye: título y logout.
  **/
  verAlumnosProfesor () {
    this.limpiar()
    this.verUsuario()
    // this.verTitulo('Lista Alumnos')
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Lista de Alumnos'))
    h1.appendChild(this.crearIconoAyuda('Muestra la lista de alumnos que tienen tareas registradas de los módulos asignados al profesor'))
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la vista de informe de alumno.
    @param alumno {Alumno} Datos del alumno.
  **/
  verInforme (alumno) {
    this.limpiar()
    this.verUsuario()
    this.verTitulo(`Informe de ${alumno.nombre} ${alumno.apellidos}`)
    this.base.appendChild(this.crearIcono('volver.svg', 2, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)))
    this.base.appendChild(this.crearIcono('print.svg', 1, 'imprimir', this.controlador.imprimir.bind(this.controlador)))
    this.verLogout(3)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la vista de créditos.
  **/
  verCreditos () {
    this.limpiar()
    this.verUsuario()
    this.verTitulo('Acerca de DUALEX')
    if (this.controlador.getUsuario().rol === 'profesor' || this.controlador.getUsuario().rol === 'coordinador') { this.base.appendChild(this.crearIcono('volver.svg', 2, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false))) } else { this.base.appendChild(this.crearIcono('volver.svg', 2, 'volver', this.controlador.mostrarTareasAlumno.bind(this.controlador, this.controlador.getUsuario()))) }
    this.verLogout(3)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la vista de tarea.
    @param tarea {Tarea} Datos de la tarea.
  **/
  verTarea (tarea) {
    this.limpiar()
    this.verUsuario()
    if (tarea) { this.verTitulo(`Tarea: ${tarea.titulo}`) } else { this.verTitulo('Nueva Tarea') }
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarTareasAlumno.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
    Muestra el menú asociado a la lista de tareas de un alumno.
    El menú incluye: título y logout. Y si es un alumno se añade el icono de crear tarea.
    @param alumno {Alumno} Datos del alumno.
  **/
  verTareasAlumno (alumno) {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'alumno') {
      this.verTitulo('Tus Tareas')
      this.base.appendChild(this.crearIcono('add.svg', 1, 'nueva tarea', this.controlador.mostrarTarea.bind(this.controlador, null)))
    } else {
      this.verTitulo(`Tareas de ${alumno.nombre} ${alumno.apellidos}`)
      this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)))
    }
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
    Elimina los elementos del menú.
  **/
  limpiar () {
	this.eliminarHijos(this.base)
  }

  /**
    Pone el icono de "Acerca de"
  **/
  verAcercaDe () {
    this.base.appendChild(this.crearIcono('question_mark.svg', 10, 'acerca de Dualex', this.controlador.verCreditos.bind(this.controlador)))
  }

  /**
    Muestra el usuario logeado.
  **/
  verUsuario () {
    const div = document.createElement('div')
    this.base.appendChild(div)
    div.textContent = this.controlador.getUsuario().email
    div.classList.add('usuario')
  }

  /**
    Muestra el título del menú.
    @param titulo {String} Título del menú.
  **/
  verTitulo (titulo) {
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.textContent = titulo
  }

  /**
    Añade el icono de logout.
    @param orden {Number} Orden de posición en el menú.
  **/
  verLogout (orden) {
    this.base.appendChild(this.crearIcono('logout.svg', orden, 'logout', this.controlador.logout.bind(this.controlador)))
  }

  /**
    Añade el icono de Nueva Tarea.
    @param order {Number} Orden de posición en el menú.
  **/
  verNuevaTarea (orden) {
    this.base.appendChild(this.crearIcono('add.svg', orden, 'nueva tarea', this.controlador.mostrarTarea.bind(this.controlador, null)))
  }

  /**
    Crea un icono para el menú.
    @param imagen {String} Nombre del fichero de imagen (svg) que formará el icono.
    @param orden {Number} Número de orden del icono en el menú.
    @param titulo {String} Texto que se mostrará en el tooltip del icono.
    @param callback {Function} Función que se llamará al pulsar el icono.
    @return {HTMLElement} Elemento HTML (img) que forma el icono.
  **/
  crearIcono (imagen, orden = null, titulo, callback = null) {
    const icono = document.createElement('img')
    icono.setAttribute('src', 'iconos/' + imagen)
    icono.setAttribute('title', titulo)
    icono.classList.add('icono')
    if (orden) { icono.style.order = orden }
    if (callback) { icono.onclick = callback }
    return icono
  }

  crearIconoAyuda (texto) {
    return this.crearIcono('help.svg', null, texto)
  }
  
  /**
 * Método verEmpresas: muestra la lista de empresas en la interfaz de usuario.
 * Este método verifica el rol del usuario y muestra los elementos correspondientes en la interfaz.
 * Si el usuario es un coordinador, muestra la lista de empresas con opciones para agregar una nueva empresa y volver atrás.
 * @returns {void}
 */
  verEmpresas () {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'coordinador') {
      this.verTitulo('Lista de Empresas')
      this.base.appendChild(this.crearIcono('add.svg', 2, 'Nueva empresa', this.controlador.mostrarVistaEmpresa.bind(this.controlador, null)))
    }
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)))
    this.verLogout(2)
    this.verAcercaDe()
  }

/**
 * Método crearEmpresa: muestra la interfaz para agregar una nueva empresa.
 * Este método verifica el rol del usuario y muestra los elementos correspondientes en la interfaz.
 * Si el usuario es un coordinador, muestra la interfaz para agregar una nueva empresa.
 * @returns {void}
 */
  crearEmpresa () {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'coordinador') {
      this.verTitulo('Alta de Empresas')
    }
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.irAVistaEmpresas.bind(this.controlador, false)))
    this.verLogout(2)
    this.verAcercaDe()
  }


  editarEmpresa () {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'coordinador') {
      this.verTitulo('Editar empresa')
    }
     this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.irAVistaEmpresas.bind(this.controlador, false)))
    this.verLogout(2)
    this.verAcercaDe()
  }
  verConvenios () {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'coordinador') {
      this.verTitulo('Lista de Convenios')
      this.base.appendChild(this.crearIcono('add.svg', 2, 'Nuevo Convenio', this.controlador.mostrarVistaConvenio.bind(this.controlador, null)))
      this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)))
    }
    this.verLogout(2)
    this.verAcercaDe()
  }

  crearConvenio() {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'coordinador') {
      this.verTitulo('Alta de Convenios')
      this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.irAVistaConvenios.bind(this.controlador, false)))
    }
    this.verLogout(2)
    this.verAcercaDe()
  }
  
   /**
   Muestra el menú asociado a la lista de gestión de alumnos.
   El menú incluye: título, logout y add.
   **/
  verGestionAlumnos () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Listado de Alumnos'))
    h1.appendChild(this.crearIconoAyuda('Muestra el listado de alumnos para ser gestionados por el profesor o coordinador'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)));
    this.base.appendChild(this.crearIcono('add.svg', 2, 'nuevo alumno', this.controlador.mostrarAltaAlumno.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }
   /**
   Muestra el menú asociado a la lista de gestión de modulos.
   El menú incluye: título, logout y add.
   **/
   verGestionModulos () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Listado de Modulos'))
    h1.appendChild(this.crearIconoAyuda('Muestra el listado de modulos para ser gestionados por el coordinador'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)));
    this.base.appendChild(this.crearIcono('add.svg', 2, 'nuevo modulo', this.controlador.mostrarAltaModulo.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }

   /**
   Muestra el menú asociado a la lista de gestión de ciclos.
   El menú incluye: título, logout y add.
   **/
   verGestionCiclos () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Listado de Ciclos'))
    h1.appendChild(this.crearIconoAyuda('Muestra el listado de ciclos para ser gestionados por el coordinador'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)));
    this.base.appendChild(this.crearIcono('add.svg', 2, 'nuevo ciclo', this.controlador.mostrarAltaCiclo.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
   * Muestra el menu asociado a la lista de gestion de actividades.
   * El menu incluye: titulo, logout y add.
   **/

  verGestionActividades () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Listado de Actividades'))
    h1.appendChild(this.crearIconoAyuda('Muestra el listado de actividades para ser gestionados por el profesor o coordinador'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)));
    this.base.appendChild(this.crearIcono('add.svg', 2, 'nuevo alumno', this.controlador.mostrarAltaActividad.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }
   verAltaCiclo () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Alta de Ciclo'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para dar de alta a un ciclo'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionCiclos.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }
  /**
   Muestra el menú asociado a el alta de alumnos.
   El menú incluye: título, logout y retorno.
   **/
  verAltaAlumno () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Alta de Alumno'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para dar de alta a un alumno'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionAlumnos.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }
    /**
   Muestra el menú asociado a el alta de Actividad.
   El menú incluye: título, logout y retorno.
   **/
   verAltaActividad () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Alta de Actividad'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para dar de alta a una actividad'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionActividades.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }
  /**
   Muestra el menú asociado a el alta de modulos.
   El menú incluye: título, logout y retorno.
   **/
   verAltaModulo () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Alta de Modulo'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para crear un modulo'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionModulos.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }

  verModificarAlumno () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Modificar Alumno'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para modificar los datos de un alumno'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionAlumnos.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }

  verModificarModulo () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Modificar Modulo'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para modificar los datos de un modulo'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionModulos.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }

  verModificarCiclo () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Modificar Ciclo'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para modificar los datos de un ciclo'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionCiclos.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }
  
  verModificarActividad () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Modificar Actividad'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para modificar los datos de una Actividad'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionActividades.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
   * Muestra el menu correspondiente a la edicion de convenios en la interfaz de usuario.
   */
  crearConvenioEditar () {
    this.limpiar()
    this.verUsuario()
    if (this.controlador.getUsuario().rol === 'coordinador') {
      this.verTitulo('Editar Convenio')
      this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.irAVistaConvenios.bind(this.controlador, false)))
    }
    this.verLogout(2)
    this.verAcercaDe()
  }
  
  /**
   Muestra el menú asociado a la lista de gestión de alumnos.
   El menú incluye: título, logout y add.
   **/
  verGestionProfesores () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Listado de Profesores'))
    h1.appendChild(this.crearIconoAyuda('Muestra el listado de profesores para ser gestionados por el coordinador'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarAlumnos.bind(this.controlador, false)));
    this.base.appendChild(this.crearIcono('add.svg', 2, 'nuevo profesor', this.controlador.mostrarAltaProfesor.bind(this.controlador, null)))
    this.verLogout(2)
    this.verAcercaDe()
  }

  /**
   Muestra el menú asociado a el alta de alumnos.
   El menú incluye: título, logout y retorno.
   **/
  verAltaProfesor () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Alta de Profesor'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para dar de alta a un profesor'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionProfesores.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }

  verModificarProfesor () {
    this.limpiar()
    this.verUsuario()
    const h1 = document.createElement('h1')
    this.base.appendChild(h1)
    h1.appendChild(document.createTextNode('Modificar Profesor'))
    h1.appendChild(this.crearIconoAyuda('Muestra el el formulario para modificar los datos de un profesor'))
    this.base.appendChild(this.crearIcono('volver.svg', 1, 'volver', this.controlador.mostrarGestionProfesores.bind(this.controlador, false)));
    this.verLogout(2)
    this.verAcercaDe()
  }

}
