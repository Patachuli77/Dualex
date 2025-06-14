/**
  Controlador principal de la aplicación.
**/

// Modelos
import { Modelo } from './modelos/modelo.js'

// Vistas
import { VistaLogin } from './vistas/vistalogin.js'
import { VistaDialogo } from './vistas/vistadialogo.js'
import { VistaMensaje } from './vistas/vistamensaje.js'
import { VistaMenu } from './vistas/vistamenu.js'

// Vista de tareas del alumno
import { VistaTareas } from './vistas/vistatareas.js'
// Detalle de Tarea
import { VistaTarea } from './vistas/vistatarea.js'
// Listado de Alumnos
import { VistaAlumnos } from './vistas/vistaalumnos.js'
// Informe de Alumno
import { VistaInforme } from './vistas/vistainforme.js'
// Vista del alta de Empresa
import { VistaEmpresa } from './vistas/vistaempresa.js'
//Vista del listado de Empresas
import { VistaEmpresas } from './vistas/vistaempresas.js'
//Vista de editar empresa
import { VistaEditarEmpresa } from './vistas/vistaeditarempresa.js'
//vista Profesores
import { VistaProfesores } from './vistas/vistaprofesores.js'
//Vista del menú del Coordinador
import { Vistaconvenio } from './vistas/vistaconvenio.js'
import { VistaConvenios } from './vistas/vistaconvenios.js'
import { VistaMenuCoordinador } from './vistas/vistamenucoordinador.js'
// Vista de alta de alumno
import { VistaAltaAlumno } from './vistas/vistaaltaalumno.js'
//Vista alta actividad
import { VistaAltaActividad } from './vistas/vistaaltaactividad.js'
//vista alta modulo
import { VistaAltaModulo } from './vistas/vistaaltamodulo.js'
//vista alta ciclo
import { VistaAltaCiclo } from './vistas/vistaaltaciclo.js'
//Vista modificar modulo
import { VistaModificarModulo } from './vistas/vistamodificarmodulo.js'
// Vista de modificación de alumno
import { VistaModificarAlumno } from './vistas/vistamodificaralumno.js'
// Vista de Gestión de alumnos
import { VistaGestionAlumnos } from './vistas/vistagestionalumnos.js'
// Vista de Gestión de modulos
import { VistaGestionModulos } from './vistas/vistagestionmodulos.js'
//Vista de Gestion de ciclos
import{VistaGestionCiclos} from './vistas/vistagestionciclos.js'
// Vista de Gestión de profesores
import { VistaGestionProfesores } from './vistas/vistagestionprofesores.js'
// Vista de alta de profesor
import { VistaAltaProfesor } from './vistas/vistaaltaprofesor.js'
// Vista de modificación de profesor
import { VistaModificarProfesor } from './vistas/vistamodificarprofesor.js'
//Vista de modificacion de ciclos
import { VistaModificarCiclo } from './vistas/vistamodificarciclo.js'
//Vista Actividades ///////////////
import { VistaGestionActividades } from './vistas/vistagestionactividades.js'
//Vista de modificacion de una actividad
import { VistaModificarActividad } from './vistas/vistamodificaractividad.js'
// Créditos
import { VistaCreditos } from './vistas/vistacreditos.js'

// Servicios
import { Rest } from './servicios/rest.js'

/**
  Controlador principal de la aplicación.
**/
class DualEx {
  #usuario = null // Usuario logeado.

  constructor () {
    window.onload = this.iniciar.bind(this)
    window.onerror = function (error) { console.log('Error capturado. ' + error) }
  }

  /**
    Inicia la aplicación cargando la vista de login.
    Se llama al cargar la página.
  **/
  iniciar () {
    this.modelo = new Modelo()
    this.alumno = null
    this.vistaLogin = new VistaLogin(this, document.getElementById('divLogin'))
    this.vistaDialogo = new VistaDialogo(this, document.getElementById('divDialogo'))
    this.vistaMensaje = new VistaMensaje(this, document.getElementById('divMensaje'))
    this.vistaMenu = new VistaMenu(this, document.getElementById('divMenu'))
    this.vistaAlumnos = new VistaAlumnos(this, document.getElementById('divAlumnos'))
    this.vistaTarea = new VistaTarea(this, document.getElementById('divTarea'))
    this.vistaTareas = new VistaTareas(this, document.getElementById('divTareas'))
    this.vistaInforme = new VistaInforme(this, document.getElementById('divInforme'))
    this.vistaCreditos = new VistaCreditos(this, document.getElementById('divCreditos'))
    this.vistaEmpresa = new VistaEmpresa(this, document.getElementById('divEmpresa'))
    this.vistaMenuCoordinador = new VistaMenuCoordinador(this, document.getElementById('divMenuCoordinador'))
    this.vistaEmpresas = new VistaEmpresas(this, document.getElementById('divEmpresas'))
    this.vistaEditarEmpresa = new VistaEditarEmpresa(this, document.getElementById('divEditarEmpresa'))
    this.vistaProfesores = new VistaProfesores(this, document.getElementById('divProfesores'))
    this.vistaConvenio = new Vistaconvenio(this, document.getElementById('divConvenio')) // Vista alta convenios
    this.vistaConvenios = new VistaConvenios(this, document.getElementById('divConvenios')) // Vista listado convenios
    this.vistaAlumnoAlta = new VistaAltaAlumno(this, document.getElementById('divAltaAlumno'))
    this.vistaModuloAlta = new VistaAltaModulo(this, document.getElementById('divAltaModulo'))
    this.vistaModificarModulo = new VistaModificarModulo(this, document.getElementById('divModificarModulo'))
    this.vistaActividadAlta = new VistaAltaActividad(this, document.getElementById('divAltaActividad'))
    this.vistaActividadListado = new VistaGestionActividades(this, document.getElementById('divGestionActividades')) //Vista alta actividades
    this.vistaModulosListado = new VistaGestionModulos(this, document.getElementById('divGestionModulos'))
    this.vistaAlumnosListado = new VistaGestionAlumnos(this, document.getElementById('divGestionAlumnos'))
    this.vistaModificarAlumno = new VistaModificarAlumno(this, document.getElementById('divModificarAlumno'))
    this.vistaProfesoresListado = new VistaGestionProfesores(this, document.getElementById('divGestionProfesores'))
    this.vistaCiclosListado = new VistaGestionCiclos(this, document.getElementById('divGestionCiclos'))
    this.vistaModificarActividad = new VistaModificarActividad(this, document.getElementById('divModificarActividad'))
    this.vistaProfesorAlta = new VistaAltaProfesor(this, document.getElementById('divAltaProfesor'))
    this.vistaModificarProfesor = new VistaModificarProfesor(this, document.getElementById('divModificarProfesor'))
    this.vistaModificarCiclo = new VistaModificarCiclo(this, document.getElementById('divModificarCiclo'))
    this.vistaCicloAlta = new VistaAltaCiclo(this, document.getElementById('divAltaCiclo'))
    this.vistaLogin.mostrar()
  }

  /**
    Muestra el error en la vista de mensajes.
    @param error {Error} Error que se ha producido.
  **/
  gestionarError (error) {
    this.vistaMensaje.mostrar(error)
    console.error(error)
  }

  /**
    Recibe el token del login con Google y lo envía al servidor para identificar al usuario.
    @param token {Object} Token de identificación de usuario de Google.
  **/
  login (token) {
    Rest.post('login', [], token.credential, true)
      .then(usuario => {
        this.#usuario = usuario
        Rest.setAutorizacion(this.#usuario.autorizacion)
        this.vistaMenu.mostrar(true)
        this.vistaLogin.mostrar(false)
        switch (usuario.rol) {
          case 'alumno':
            this.mostrarTareasAlumno(this.#usuario)
            break
          case 'profesor':
            this.mostrarAlumnos()
            break
          case 'coordinador':
            this.mostrarAlumnos()
            break
          default:
            console.error(`Rol de usuario desconocido: ${usuario.rol}`)
        }
      })
      .catch(e => { this.vistaLogin.mostrarError(e) })
  }

  /**
    Cierra la sesión del usuario.
  **/
  logout () {
    this.#usuario = null
    Rest.setAutorizacion(null)
    this.ocultarVistas()
    this.vistaMenu.mostrar(false)
    this.vistaLogin.mostrar(true)
  }

  /**
    Devuelve el usuario logeado.
    @return {Usuario} Devuelve el usuario logeado.
  **/
  getUsuario () {
    return this.#usuario
  }

  /**
    Oculta todas las vistas.
  **/
  ocultarVistas () {
    this.vistaTarea.mostrar(false)
    this.vistaTareas.mostrar(false)
    this.vistaAlumnos.mostrar(false)
    this.vistaInforme.mostrar(false)
    this.vistaCreditos.mostrar(false)
    this.vistaAlumnoAlta.mostrar(false)
    this.vistaAlumnosListado.mostrar(false)
    this.vistaModificarAlumno.mostrar(false)
    this.vistaEmpresa.mostrar(false)
    this.vistaEmpresas.mostrar(false)
    this.vistaEditarEmpresa.mostrar(false)
    this.vistaMenuCoordinador.mostrar(false)
    this.vistaConvenio.mostrar(false)
    this.vistaConvenios.mostrar(false)
    this.vistaProfesores.mostrar(false)
    this.vistaProfesoresListado.mostrar(false)
    this.vistaProfesorAlta.mostrar(false)
    this.vistaModificarProfesor.mostrar(false)
    this.vistaActividadListado.mostrar(false)
    this.vistaActividadAlta.mostrar(false)
    this.vistaModificarActividad.mostrar(false)
    this.vistaModulosListado.mostrar(false)
    this.vistaModuloAlta.mostrar(false)
    this.vistaModificarModulo.mostrar(false)
    this.vistaCiclosListado.mostrar(false)
    this.vistaCicloAlta.mostrar(false)
    this.vistaModificarCiclo.mostrar(false)
  }


  /**
    Muestra la vista de tareas del alumno.
    @param alumno {Alumno} Datos del alumno.
  **/
  mostrarTareasAlumno (alumno) {
    this.alumno = alumno
    // Para saber volver cuando sea el profesor
    if (this.#usuario.rol === 'profesor' || this.#usuario.rol === 'coordinador') {
      if (!alumno) {
        alumno = this.alumnoMostrado 
        this.alumno = this.alumnoMostrado
      } 
      else {
        this.alumnoMostrado = alumno
      }
    }
   
    //if (alumno == null) { alumno = this.#usuario }
		alumno = this.alumno ?? this.#usuario 
    this.ocultarVistas()
    this.modelo.getTareasAlumno(alumno)
      .then(tareas => {
        this.vistaMenu.verTareasAlumno(alumno)
				this.tareas = tareas
        this.vistaTareas.cargar(tareas)
        this.ocultarVistas()
        this.vistaTareas.mostrar(true)
      })
      .catch(error => this.gestionarError(error))
  }

  /**
    Muestra la vista del informe de un alumno.
    @param alumno {Alumno} Datos del alumno.
    @param periodo {Number} Número del periodo del que se solicita el informe
  **/
  mostrarInformeAlumno (alumno, periodo) {
    this.alumno = alumno
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') return
    this.ocultarVistas()
    this.modelo.getInformeAlumno(alumno, periodo)
      .then(informe => {
        this.vistaMenu.verInforme(alumno)
        this.vistaInforme.cargar(alumno, informe)
        this.ocultarVistas()
        this.vistaInforme.mostrar(true)
      })
      .catch(error => this.gestionarError(error))
  }

  /**
    Muestra la vista de alumnos del profesor.
    @param borrar {Boolean} Indica si hay que borrar la lista de alumnos anterior.
  **/
  mostrarAlumnos (borrar = true) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }
    this.modelo.getAlumnosProfesor()
      .then(alumnos => {
        this.vistaMenu.verAlumnosProfesor()
        if (borrar)
            this.vistaAlumnos.cargar(alumnos)
        this.ocultarVistas()
        this.vistaAlumnos.mostrar(true)
        if (this.#usuario.rol === 'coordinador')
          this.vistaMenuCoordinador.mostrar(true) 
      })
      .catch(error => this.gestionarError(error))
  }

  /**
    Muestra la vista de tarea.
    @param tarea {Tarea} Datos de la tarea. Si es nula se mostrará la vista vacía para crear una nueva Tarea.
  **/
  mostrarTarea (tarea) {
    if (tarea) {
      this.modelo.getTarea(tarea.id)
        .then(tareas => {
          this.vistaMenu.verTarea(tareas[0])
          this.ocultarVistas()
          this.vistaTarea.mostrar(true, tareas[0])
        })
    } else {
      this.vistaMenu.verTarea(null)
      this.ocultarVistas()
      this.vistaTarea.mostrar(true)
    }
  }

  /**
   * Muestra la vista de gestion de modulos
   * 
   */

  mostrarGestionModulos () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verGestionModulos()
    this.vistaModulosListado.cargarFiltrado()
    //this.vistaAlumnoAlta.limpiarCampos()
    this.ocultarVistas()
    this.vistaModulosListado.mostrar(true)
  }

   /**
   * Muestra la vista de gestion de ciclos
   * 
   */

  mostrarGestionCiclos () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verGestionCiclos()
    this.vistaCiclosListado.cargarFiltrado()
    this.vistaCicloAlta.limpiarCampos()
    this.ocultarVistas()
    this.vistaCiclosListado.mostrar(true)
  }
  /**
   * Muestra la vista de gestion de alumnos.
   */
  mostrarGestionAlumnos () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verGestionAlumnos()
    this.vistaAlumnosListado.cargarFiltrado()
    this.vistaAlumnoAlta.limpiarCampos()
    this.ocultarVistas()
    this.vistaAlumnosListado.mostrar(true)
  }

  /**
   * Muestra la vista de alta de alumno.
   */
  mostrarAltaAlumno () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verAltaAlumno()
    this.vistaAlumnoAlta.cargarDatos()
    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaAlumnoAlta.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaAlumnoAlta.inputNombre.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de alta de alumno:', error);
    });
  }

  /**
   * Muestra la vista de alta de alumno.
   */
  mostrarAltaCiclo () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verAltaCiclo()
    this.vistaCicloAlta.cargarDatos()
    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaCicloAlta.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaCicloAlta.inputNombre.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de alta de ciclo:', error);
    });
  }
  /**
   * Muestra la vista de alta de modulos.
   */
  mostrarAltaModulo () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verAltaModulo()
    this.vistaModuloAlta.limpiarCampos()
    this.vistaModuloAlta.cargarDatos(this.vistaModulosListado.ciclos)
    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaModuloAlta.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaModuloAlta.inputTitulo.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de alta de modulo:', error);
    });
  }
  /**
   * Muestra la vista de alta de actividad.
   */
  mostrarAltaActividad () {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verAltaActividad()
    this.vistaActividadAlta.cargarDatos()
    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaActividadAlta.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaActividadAlta.inputTitulo.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de alta de alumno:', error);
    });
  }

  /**
   * Muestra la vista de modificación de alumno.
   * @param alumno {} Datos del alumno a modificar.
   * @param cursos {} Lista de cursos.
   */
  mostrarModificarAlumno (alumno, cursos) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verModificarAlumno()
    this.vistaModificarAlumno.cargarDatos(alumno)

    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaModificarAlumno.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaModificarAlumno.inputNombre.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de modificación de alumno:', error);
    });
  }
   /**
   * Muestra la vista de modificación de la actividad.
   * @param actividad {} Datos de la actividad a modificar.
   */
   mostrarModificarActividad (actividad, modulos) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verModificarActividad()
    this.vistaModificarActividad.cargarDatos(actividad)

    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaModificarActividad.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaModificarActividad.inputTitulo.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de modificación de Actividad:', error);
    });
  }
  /**
   * Muestra la vista de modificación de la actividad.
   * @param ciclo {} Datos del ciclo a modificar.
   */

  mostrarModificarCiclo (ciclo) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verModificarCiclo()
    this.vistaModificarCiclo.cargarDatos(ciclo)

    this.ocultarVistas()
    new Promise((resolve) => {
      this.vistaModificarCiclo.mostrar(true);
      resolve();
    }).then(() => {
      this.vistaModificarCiclo.inputNombre.focus();
    }).catch((error) => {
      console.error('Error mostrando vista de modificación de Actividad:', error);
    });
  }
 /**
   * Muestra la vista de modificación de modulo.
   * @param modulo {} Datos del modulo a modificar.
   */
 mostrarModificarModulo (modulo) {
  if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

  this.vistaMenu.verModificarModulo()

  this.vistaModificarModulo.cargarDatos(modulo)

  this.ocultarVistas()
  new Promise((resolve) => {
    this.vistaModificarModulo.mostrar(true);
    resolve();
  }).then(() => {
    //this.vistaModificarModulo.inputTitulo.focus();
  }).catch((error) => {
    console.error('Error mostrando vista de modificación de Modulo:', error);
  });
}


 /**
   * Realiza una petición para insertar un nuevo modulo.
   * @param modulo {} Datos del modulo a insertar.
   */
 altaModulo (modulo) {
  if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

  this.modelo.altaModulo(modulo)
    .then(resultado => {
      this.vistaMensaje.mostrar('El modulo se creó correctamente', VistaMensaje.OK)
      this.vistaModuloAlta.limpiarCampos()
      this.vistaModulosListado.cargarFiltrado()
    })
    .catch(error => this.gestionarError(error))
}

 /**
   * Realiza una petición para insertar un nuevo ciclo.
   * @param ciclo {} Datos del ciclo a insertar.
   */
 altaCiclo (ciclo) {
  if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

  this.modelo.altaCiclo(ciclo)
    .then(resultado => {
      this.vistaMensaje.mostrar('El modulo se creó correctamente', VistaMensaje.OK)
      this.vistaCicloAlta.limpiarCampos()
      this.vistaCiclosListado.cargarFiltrado()
    })
    .catch(error => this.gestionarError(error))
}



  /**
   * Realiza una petición para insertar un nuevo alumno.
   * @param alumno {} Datos del alumno a insertar.
   */
  altaAlumno (alumno) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.altaAlumno(alumno)
      .then(resultado => {
        this.vistaMensaje.mostrar('El alumno se creó correctamente', VistaMensaje.OK)
        this.vistaAlumnoAlta.limpiarCampos()
        this.vistaAlumnosListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }
   /**
   * Realiza una petición para insertar una nueva actividad.
   * @param actividad {} Datos de la actividad a insertar.
   */
   altaActividad (actividad) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.altaActividad(actividad)
      .then(resultado => {
        this.vistaMensaje.mostrar('La actividad se creó correctamente', VistaMensaje.OK)
        this.vistaActividadAlta.limpiarCampos()
        this.vistaActividadListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Realiza una petición para modificar un alumno.
   * @param alumno {} Datos del alumno a modificar.
   */
  modificarAlumno (alumno) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.modificarAlumno(alumno)
      .then(resultado => {
        this.vistaMensaje.mostrar('El alumno se actualizó correctamente', VistaMensaje.OK)
        this.vistaAlumnosListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Realiza una petición para modificar un modulo.
   * @param modulo {} Datos del modulo a modificar.
   */
  modificarModulo (modulo) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.modificarModulo(modulo)
      .then(resultado => {
        this.vistaMensaje.mostrar('El modulo se actualizó correctamente', VistaMensaje.OK)
        this.vistaModulosListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }
  /**
   * Realiza una petición para modificar un ciclo.
   * @param ciclo {} Datos del ciclo a modificar.
   */
  modificarCiclo (ciclo) {
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.modificarCiclo(ciclo)
      .then(resultado => {
        this.vistaMensaje.mostrar('El ciclo se actualizó correctamente', VistaMensaje.OK)
        this.vistaCiclosListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }
  /**
   * Realiza una petición para modificar una actividad.
   * @param actividad {} Datos de la actividad a modificar.
   */
  modificarActividad(actividad) {
   
    if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.modificarActividad(actividad)
      .then(resultado => {
        this.vistaMensaje.mostrar('La Actividad se actualizó correctamente', VistaMensaje.OK)
        this.vistaActividadListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
    *  Muestra la vista de gestion de actividades
  */
  mostrarGestionActividades() {
      
      if (this.#usuario.rol !== 'profesor' && this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

      this.vistaMenu.verGestionActividades()
      this.vistaActividadListado.cargarFiltrado()//Modificacion
      this.vistaActividadAlta.limpiarCampos()
      this.ocultarVistas()
      this.vistaActividadListado.mostrar(true)
    //flag
  }

  
   /**
   * Develve la lista de actividades de un modulo
   * @param modulo id del modulo por el que se busca
   * @returns array
   */
   getActividadesByModulo(modulo){
    return this.modelo.getActividadesByModulo(modulo)
  }

  /**
   * Develve la lista de actividades
   * @returns array
   */
  getActividades(){
    return this.modelo.getActividades()
  }

  /**
   * Develve la lista de ciclos
   * @returns array
   */
  getCiclos(){
    return this.modelo.getCiclos()
  }

  /**
    Devuelve la lista de actividades definidas.
    @param idCurso {Number} Identificador del curso.
    @return {Promise} Promesa de resolución de la petición.
  **/
  verActividadesCurso (idCurso) {
    return this.modelo.getActividadesCurso(idCurso)
  }

  /**
    Devuelve la lista de calificaciones definidas.
    @return {Promise} Promesa de resolución de la petición.
  **/
  verCalificaciones () {
    return this.modelo.getCalificaciones()
  }

  /**
    Crea una nueva tarea y vuelve a la vista de tareas del alumno.
    @param tarea {Tarea} Datos de la nueva tarea.
  **/
  crearTarea (tarea) {
    this.modelo.crearTarea(tarea)
      .then(resultado => {
        this.vistaMensaje.mostrar('La tarea se creó correctamente', VistaMensaje.OK)
        this.mostrarTareasAlumno(this.#usuario)
      })
      .catch(error => this.gestionarError(error))
  }

  /**
    Modifica una tarea y vuelve a la vista de tareas del alumno.
    @param tarea {Tarea} Datos de la tarea.
		@param siguienteTarea {Tarea} Datos de la siguiente tarea a mostrar.
  **/
  modificarTarea (tarea, siguienteTarea = null) {
    this.modelo.modificarTarea(tarea)
      .then(resultado => {
        if(!siguienteTarea){
          this.vistaMensaje.mostrar('La tarea se modificó correctamente', VistaMensaje.OK)
          if (this.#usuario.rol === 'profesor' || this.#usuario.rol === 'coordinador')
            this.mostrarTareasAlumno(this.alumnoMostrado) 
          else 
            this.mostrarTareasAlumno(this.#usuario) 
        }
		else
			this.mostrarTarea(siguienteTarea)
      })
      .catch(error => this.gestionarError(error))
  }

  /**
    Elimina una tarea.
    @param tarea {Tarea} Datos de la tarea.
  **/
  eliminarTarea (tarea) {
    const titulo = `¿Realmente quiere ELIMINAR la tarea  "${tarea.titulo}"?`
    const mensaje = 'Esta operación no puede deshacerse.'
    this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
      if (confirmar) {
        this.modelo.borrarTarea(tarea)
          .then(respuesta => {
            this.vistaMensaje.mostrar('La tarea se eliminó correctamente.', VistaMensaje.OK)
             if (this.#usuario.rol === 'profesor' || this.#usuario.rol === 'coordinador')
            this.mostrarTareasAlumno(this.alumnoMostrado) 
            else 
              this.mostrarTareasAlumno(this.#usuario) 
        
          })
          .catch(error => this.gestionarError(error))
      } else { this.vistaDialogo.cerrar() }
    })
  }

  /**
    Imprime la vista actual.
  **/
  imprimir () {
    window.print()
  }

  /**
    Devuelve una promesa que devolverá la lista de periodos con su identificador y su título.
    @return {Promise} Promesa de resolución de la petición.
  **/
  verPeriodos () {
    return this.modelo.getPeriodos()
  }

  /**
    Muestra la vista de créditos de la aplicación.
  **/
  verCreditos () {
    this.vistaMenu.verCreditos()
    this.ocultarVistas()
    this.vistaCreditos.mostrar(true)
  }

  /**
   * Develve la lista de cursos existentes
   * @returns array
   */
  getCursos(){
    return this.modelo.getCursos()
  }
  /**
   * Develve la lista de modulos existentes
   * @returns array
   */
  getModulos(){
    return this.modelo.getModulos()
  }

  /**
   * Develve la lista de alumnos de un profesor
   * @returns array
   */
  getAlumnosProfesor(){
    return this.modelo.getAlumnosProfesor()
  }

  /**
   * Develve la lista actividades de un alumno y su nota media
   * @param id id del alumno del que queremos ver el informe.
   * @param periodo periodo del que queremos ver el informe.
   * @returns array
   */
  traerActividadNotas(id,periodo){
    return this.modelo.getActividadNotas(id,periodo)
  }

  /**
   * Develve la lista módulos de un alumno y su nota media
   * @param id id del alumno del que queremos ver el informe.
   * @param periodo periodo del que queremos ver el informe.
   * @returns array
   */
  traerModulosNotas(id,periodo){
    return this.modelo.getModulosNotas(id,periodo)
  }

  /**
   * Develve la lista de tareas de un alumno
   * @returns array
   */
  getTareas(){
		//let alumno = this.alumno ?? this.#usuario 
    //return this.modelo.getTareasAlumno(alumno)
		return this.tareas
  }

  /**
   * Cambia el nombre del título de la tarea en la barra superior/menú
   * @param tarea tarea de la que queremos poner el título
   */
  cargarNombreTarea(tarea){
    console.log(tarea.titulo)
    this.vistaMenu.verTarea(tarea)
  }
  
   /**
   * Crea una nueva empresa.
   * @param {Empresa} datosdelaempresa - Datos de la nueva empresa.
   */
   crearEmpresa(datosdelaempresa) {
    this.modelo.crearEmpresa(datosdelaempresa)
    .then( () => {this.irAVistaEmpresas()} )
    .catch(error => {
        this.gestionarError(error)
      })
  }

  /**
   * Borra una empresa.
   * @param {number} id - ID de la empresa a borrar.
   * @returns {Promise} - Promesa que se resuelve cuando se borra la empresa.
   */
  borrarEmpresa(id) {
    return this.modelo.borrarEmpresa(id)
      .then(() => {
        this.irAVistaEmpresas();
      })
      .catch(error => this.gestionarError(error));
  }

  /**
   * Obtiene los datos de una empresa por su ID.
   * @param {number} id - ID de la empresa.
   * @returns {Promise} - Promesa que se resuelve con los datos de la empresa.
   */
  mostrarDatosEmpresa(id) {
    return this.modelo.getEmpresaById(id);
  }

  /**
   * Edita una empresa.
   * @param {Object} datosEmpresa - Datos de la empresa a editar.
   * @returns {Promise} - Promesa que se resuelve cuando se edita la empresa.
   */
  editarEmpresa(datosEmpresa) {
    return this.modelo.editarEmpresa(datosEmpresa)
    .then( () => {this.irAVistaEmpresas()} )
    .catch(error => {
        this.gestionarError(error)
      })
  }

  /**
   * Navega a la vista de alumnos.
   */
  irAVistaAlumnos() {
    this.ocultarVistas();
    this.vistaAlumnos.mostrar(true);
  }

  /**
   * Navega a la vista de convenios.
   */
  irAVistaConvenios() {
    this.ocultarVistas()
    this.vistaMenu.verConvenios()
    this.vistaConvenios.cargarDatosConvenios()
    this.vistaConvenios.mostrar(true)
  }

 
  /**
   * Navega a la vista de profesores.
   */
  irAVistaProfesores() {
    this.ocultarVistas();
    this.vistaProfesores.mostrar(true);
  }

  /**
   * Navega a la vista de empresas.
   */
  irAVistaEmpresas() {
    this.ocultarVistas();
    this.vistaMenu.verEmpresas();
    this.vistaEmpresas.cargarEmpresas();
    this.vistaEmpresas.mostrar(true);
  }

  /**
   * Obtiene la lista de empresas.
   * @returns {Promise} - Promesa que se resuelve con la lista de empresas.
   */
  mostrarEmpresas() {
    return this.modelo.getEmpresas();
  }

  /**
   * Muestra la vista para crear una nueva empresa.
   */
  mostrarVistaEmpresa() {
    this.ocultarVistas();
    this.vistaMenu.crearEmpresa();
    this.vistaEmpresa.mostrar(true);
  }

   /**
   * Muestra la vista para crear una nueva empresa.
   */
  mostrarEditarEmpresa() {
    this.ocultarVistas();
    this.vistaMenu.editarEmpresa();
    this.vistaEditarEmpresa.mostrar(true);
  }
  /**
   * Muestra la vista para crear un convenio.
   */

  mostrarVistaConvenio(){
    this.ocultarVistas()
    this.vistaMenu.crearConvenio()
    this.vistaConvenio.mostrar(true)
  }

  /**
   * Realiza una peticion de alta de convenio
   * @param formData Datos para la peticion
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  enviarSolicitudConvenio (formData) {
    return Rest.post('convenio', [], formData, false)
      .then(respuesta => {
        this.vistaConvenios.cargarDatosConvenios()
        this.irAVistaConvenios()
      })
      .catch(error => {
        this.gestionarError(error)
      })
  }

  /**
   * Realiza una petición para obtener los datos de la tabla ciclos
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosCiclo () {
    return Rest.get('ciclo')
  }

  /**
   * Realiza una petición para obtener los datos de la tabla empresa
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosEmpresa () {
    return Rest.get('empresa')
  }

  /**
   * Realiza una petición para obtener los datos de la tabla convenio
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosConvenios () {
    return Rest.get('convenio')
  }
  /**
   * Develve la lista de alumnos
   * @returns array
   */
  getAlumnos(){
    return this.modelo.getAlumnos()
  }
  /**
   * Develve la lista de modulos de ciclo
   *  @param ciclo id del ciclo
   * @returns array
   */
    getModulosByCiclo(ciclo){
      return this.modelo.getModulosByCiclo(ciclo)
    }

    /**
   * Develve la lista de profesores de un modulo
   * @param modulo id del modulo
   * @returns array
   */
    getProfesoresByModulo(modulo){
      return this.modelo.getProfesoresByModulo(modulo)
    }


  /**
   * Develve la lista de modulos de un curso
   * @returns array
   */
  getModulosByCurso(curso){
    return this.modelo.getModulosByCurso(curso)
  }
  /**
   * Develve la lista de cursos de un ciclo
   * @returns array
   */

  getCursosByCiclo(ciclo){
    return this.modelo.getCursosByCiclo(ciclo)
  }
   /**
   * Enseña un mensaje para hacer el alta multiple de alumnos
   * @returns array
   */
  altaAlumnoMultiple(){
  const titulo = `¿AÑADIR MULTIPLES ALUMNOS?`
    const mensaje = "Usa la plantilla en el formato .xlsx"
    const contenedor = document.getElementById('altaMultiple');
    const inputArchivo = document.getElementById('multiple');
    contenedor.style.display = 'flex'; 

     this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
        contenedor.style.display = 'none';
      if (confirmar) {
         
        const validado = this.vistaAlumnoAlta.validarDocumento()
        if (validado){
          const archivo = this.vistaAlumnoAlta.archivo.files[0]
          const formData = new FormData()
          formData.append('archivo', archivo)
           this.modelo.altaAlumnoMultiple(formData)
           
            .then(respuesta => {
              this.vistaMensaje.mostrar('Alumnos añadidos correctamente.', VistaMensaje.OK)
              this.vistaAlumnosListado.cargarFiltrado()
               inputArchivo.value = ''
            })
            .catch(error => {
              this.gestionarError(error)
            inputArchivo.value = ''; 

          })
        }else{
          
        this.vistaDialogo.cerrar() 
         inputArchivo.value = ''

        } 
      } else { 
        console.log("cancelado")
         inputArchivo.value = ''
      
        this.vistaDialogo.cerrar() 
      }
    }, true)

  }
   /**
   * Enseña un mensaje para hacer el alta multiple de actividades
   * @returns array
   */

   altaActividadMultiple(){
  const titulo = `¿AÑADIR MULTIPLES ACTIVIDADES?`
    const mensaje = "Usa la plantilla en el formato .xlsx"
    const contenedor = document.getElementById('altaMultiple');
    const inputArchivo = document.getElementById('multiple');
    contenedor.style.display = 'flex'; // o 'block', según tu CSS

     this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
        contenedor.style.display = 'none';
      if (confirmar) {
        const validado = this.vistaActividadAlta.validarDocumento()
        if (validado){
          const archivo = this.vistaActividadAlta.archivo.files[0]
          const formData = new FormData()
          formData.append('archivo', archivo)
           this.modelo.altaActividadMultiple(formData)
           
            .then(respuesta => {
              this.vistaMensaje.mostrar('Actividades añadidas correctamente.', VistaMensaje.OK)
              this.vistaAlumnosListado.cargarFiltrado()
              inputArchivo.value = '';
            })
            .catch(error => {
            this.gestionarError(error)
            inputArchivo.value = '';  // <-- también limpia si hay error
          })
      } else {
          console.log("meh")
        
        inputArchivo.value = '';
        this.vistaDialogo.cerrar() 

        } 
      } else { 
        console.log("cancelado")
        
      inputArchivo.value = '';
        this.vistaDialogo.cerrar() 
      }
    }, true)

  }
 
  
  eliminarAlumno (alumnoId, alumnoNombre) {
    const titulo = `¿Realmente quiere ELIMINAR al alumno  "${alumnoNombre}"?`
    const mensaje = 'Esta operación no puede deshacerse.'
    this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
      if (confirmar) {
        this.modelo.borrarAlumno(alumnoId)
          .then(respuesta => {
            this.vistaMensaje.mostrar('El alumno se eliminó correctamente.', VistaMensaje.OK)
            this.vistaAlumnosListado.cargarFiltrado()
          })
          .catch(error => this.gestionarError(error))
      } else { this.vistaDialogo.cerrar() }
    })
  }

  eliminarActividad (actividadId, actividadTitulo) {
    const titulo = `¿Realmente quiere ELIMINAR la actividad  "${actividadTitulo}"?`
    const mensaje = 'Esta operación no puede deshacerse.'
    this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
      if (confirmar) {
        this.modelo.borrarActividad(actividadId)
          .then(respuesta => {
            this.vistaMensaje.mostrar('La actividad se eliminó correctamente.', VistaMensaje.OK)
            this.vistaActividadListado.cargarFiltrado()
          })
          .catch(error => this.gestionarError(error))
      } else { this.vistaDialogo.cerrar() }
    })
  }
   eliminarCiclo (cicloId, cicloNombre) {
    const titulo = `¿Realmente quiere ELIMINAR el ciclo  "${cicloNombre}"?`
    const mensaje = 'Esta operación no puede deshacerse.'
    this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
      if (confirmar) {
        this.modelo.borrarCiclo(cicloId)
          .then(respuesta => {
            this.vistaMensaje.mostrar('El ciclo se eliminó correctamente.', VistaMensaje.OK)
            this.vistaCiclosListado.cargarFiltrado()
          })
          .catch(error => this.gestionarError(error))
      } else { this.vistaDialogo.cerrar() }
    })
  }
  
  /**
   * Borra un convenio.
   * @param id - {Number} ID del convenio que se quiere borrar.
   * @returns {Promise} - Promesa que se resuelve cuando se borra el convenio.
   */
  borrarConvenio (id) {
    return this.modelo.borrarConvenioById(id)
      .then(() => {
        this.vistaMensaje.mostrar('El convenio ha sido eliminado', VistaMensaje.OK)
        this.irAVistaConvenios()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Obtiene los datos de un convenio en concreto
   * @param id - {Number} ID del convenio que se quiere obtener sus datos.
   * @returns {Promise} - Promesa que se resuelve con los datos del convenio.
   */
  obtenerDatosConvenioById (id) {
    return this.modelo.getConvenioById(id)
      .then(datosConvenio => {
        this.mostrarVistaConvenioE(datosConvenio)
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Muestra la vista de edición de un convenio.
   * @param datosConvenio - {Object} Datos del convenio a editar.
   */
  mostrarVistaConvenioE (datosConvenio) {
    this.ocultarVistas()
    this.vistaMenu.crearConvenioEditar()
    this.vistaConvenio.mostrar(true, datosConvenio)
  }

  /**
   * Edita un convenio.
   * @param id - {Number} ID del convenio que se quiere editar.
   * @param datosConvenio - {Object} Datos del convenio a editar.
   * @returns {Promise<void>} - Promesa que se resuelve cuando se edita el convenio.
   */
  editarConveino (id, datosConvenio) {
    return this.modelo.editarConvenio(id, datosConvenio)
      .then(() => {
        this.vistaMensaje.mostrar('El convenio se ha actualizado correctamente', VistaMensaje.OK)
        this.irAVistaConvenios()
      })
      .catch(error => this.gestionarError(error))
  }
  
    /**
   * Muestra la vista de gestion de profesores.
   */
  mostrarGestionProfesores () {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verGestionProfesores()
    this.vistaProfesorAlta.limpiarCampos()
    this.vistaProfesoresListado.cargarFiltrado()
    this.ocultarVistas()
    this.vistaProfesoresListado.mostrar(true)
  }

  /**
   * Muestra la vista de alta de profesor.
   */
  mostrarAltaProfesor () {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verAltaProfesor()
    this.ocultarVistas()
    this.vistaProfesorAlta.mostrar(true)
  }

  /**
   * Muestra la vista de modificación de profesor.
   * @param profesor {} Datos del profesor a modificar.
   */
  mostrarModificarProfesor (profesor) {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.vistaMenu.verModificarProfesor()
    this.vistaModificarProfesor.cargarDatos(profesor)
    this.ocultarVistas()
    this.vistaModificarProfesor.mostrar(true);
  }

  /**
   * Realiza una petición para insertar un nuevo profesor.
   * @param profesor {} Datos del profesor a insertar.
   */
  altaProfesor (profesor) {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.altaProfesor(profesor)
      .then(resultado => {
        this.vistaMensaje.mostrar('El profesor se creó correctamente', VistaMensaje.OK)
        this.vistaProfesorAlta.limpiarCampos()
        this.ocultarVistas()
        this.mostrarGestionProfesores()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Realiza una petición para modificar un profesor.
   * @param profesor {} Datos del profesor a modificar.
   */
  modificarProfesor (profesor) {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.modificarProfesor(profesor)
      .then(resultado => {
        this.vistaMensaje.mostrar('El profesor se actualizó correctamente', VistaMensaje.OK)
        this.ocultarVistas()
        this.mostrarGestionProfesores()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Develve la lista de profesores de un curso
   * @returns array
   */
  getProfesores(){
    return this.modelo.getProfesores()
  }

  /**
   * Develve la lista de modulos
   */
  verModulos(){

    return this.modelo.verModulos()
  }
  /**
   * Desactiva un modulo.
   * @param moduloId - {Number} ID del profesor que se quiere borrar.
   * @param modulonombre - {String} Nombre del profesor que se quiere borrar.
   */
  
  desactivarModulo(moduloId, modulonombre){
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }
    const titulo = `¿Realmente quiere DESACTIVAR al modulo "${modulonombre}"?`
    const mensaje = 'Esta operación no puede deshacerse.'
    this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
      if (confirmar) {
        this.modelo.desactivarModulo(moduloId)
          .then(respuesta => {
            this.vistaMensaje.mostrar('El modulo se desactivo correctamente.', VistaMensaje.OK)
            this.vistaModulosListado.cargarFiltrado()
          })
          .catch(error => this.gestionarError(error))
      } else { this.vistaDialogo.cerrar() }
    })
  }

  /**
   * Elimina un profesor.
   * @param profesorId - {Number} ID del profesor que se quiere borrar.
   * @param profesorNombre - {String} Nombre del profesor que se quiere borrar.
   */
  eliminarProfesor (profesorId, profesorNombre) {
  	if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }
    const titulo = `¿Realmente quiere ELIMINAR al profesor "${profesorNombre}"?`
    const mensaje = 'Esta operación no puede deshacerse.'
    this.vistaDialogo.abrir(titulo, mensaje, confirmar => {
      if (confirmar) {
        this.modelo.borrarProfesor(profesorId)
          .then(respuesta => {
            this.vistaMensaje.mostrar('El profesor se eliminó correctamente.', VistaMensaje.OK)
            this.vistaProfesoresListado.cargarFiltrado()
          })
          .catch(error => this.gestionarError(error))
      } else { this.vistaDialogo.cerrar() }
    })
  }
/*
  /*
   * Realiza una petición para insertar un nuevo profesor.
   * @param profesor {} Datos del profesor a insertar.
   *
  altaProfesor (profesor) {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.altaProfesor(profesor)
      .then(resultado => {
        this.vistaMensaje.mostrar('El profesor se creó correctamente', VistaMensaje.OK)
        this.vistaProfesorAlta.limpiarCampos()
        this.vistaProfesoresListado.cargarFiltrado()
        this.ocultarVistas()
        this.mostrarGestionProfesores()
      })
      .catch(error => this.gestionarError(error))
  }

  /**
   * Realiza una petición para modificar un profesor.
   * @param profesor {} Datos del profesor a modificar.
   *
  modificarProfesor (profesor) {
    if (this.#usuario.rol !== 'coordinador') { throw Error('Operación no permitida.') }

    this.modelo.modificarProfesor(profesor)
      .then(resultado => {
        this.vistaMensaje.mostrar('El profesor se actualizó correctamente', VistaMensaje.OK)
         this.ocultarVistas()
        this.vistaProfesoresListado.cargarFiltrado()
      })
      .catch(error => this.gestionarError(error))
  }*/
}

/* eslint-disable no-new */
new DualEx()
