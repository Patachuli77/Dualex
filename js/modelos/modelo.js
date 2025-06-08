/**
  Modelo de la aplicación.
  Se responsabiliza del mantenimiento y gestión de los datos.
  Utiliza el Servicio de Rest.
**/

// Servicios
import { Rest } from '../servicios/rest.js'

/**
  Modelo de la aplicación.
  Se responsabiliza del mantenimiento y gestión de los datos.
  Utiliza el Servicio de Rest.
**/
export class Modelo {
  /**
    Devuelve la lista de alumnos de un profesor.
    La lista está formada por los alumnos que están asignados a los módulos a los que el profesor está asignado.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getAlumnosProfesor () {
    return Rest.get('alumno', ['profesor'])
  }
  getProfesoresByModulo(modulo){
    const queryParams = new Map()
    queryParams.set('modulo', modulo)
    return Rest.get('gestionprofesores', [], queryParams)

  }
  /**
    Devuelve la lista de tareas de un alumno.
    @param alumno {Alumno} Datos del alumno.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getTareasAlumno (alumno) {
    const queryParams = new Map()
    queryParams.set('id', alumno.id)
    return Rest.get('tarea', ['alumno'], queryParams)
  }

  /**
    Devuelve la lista de actividades definidas.
    @param idCurso {Number} Identificador del curso.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getActividadesCurso (idCurso) {
    return Rest.get('actividad', [idCurso])
  }
  /*
  lista todas activivdades
  
  */
  getActividades () {
    return Rest.get('gestionactividades')
  }

  /*
  lista todos los ciclos
  
  */

  getCiclos () {
    return Rest.get('gestionciclos')
  }
  
  
  /**
   Devuelve la lista de las actividades por modulo.
   La lista está formada por las actividades que están asignados a un modulo.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
   getActividadesByModulo (modulo) {
    const queryParams = new Map()
    queryParams.set('modulo', modulo)
    return Rest.get('gestionactividades', [], queryParams)
  }
  /**
   Devuelve la lista de las actividades por modulo.
   La lista está formada por las actividades que están asignados a un modulo.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
   getActividadesByModulo (modulo) {
    const queryParams = new Map()
    queryParams.set('modulo', modulo)
    return Rest.get('gestionactividades', [], queryParams)
  }

  /**
    Devuelve la lista de calificaciones definidas.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getCalificaciones () {
    return Rest.get('calificacion')
  }

  /**
    Devuelve la lista de periodos definidos.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getPeriodos () {
    return Rest.get('periodo')
  }

  /**
    Crea una tarea.
    @param tarea {Tarea} Datos de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  crearTarea (tarea) {
    return Rest.post('tarea', [], tarea)
  }

  /**
    Devuelve los datos de una tarea.
    @param idTarea {Number} Identificador de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getTarea (idTarea) {
    return Rest.get('tarea', [idTarea])
  }

  /**
    Modifica una tarea.
    @param tarea {Tarea} Datos de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  modificarTarea (tarea) {
    return Rest.put('tarea', [], tarea)
  }

  /**
    Borrar una tarea.
    @param tarea {Tarea} Datos de la tarea.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  borrarTarea (tarea) {
    return Rest.delete('tarea', [tarea.id])
  }

  /**
    Devuelve la información del informe de evaluación de un alumno.
    @param alumno {Alumno} Datos del alumno.
    @param periodo {Number} Identificador del periodo para el que se solicita el informe.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
  getInformeAlumno (alumno, periodo) {
    const queryParams = new Map()
    queryParams.set('id_alumno', alumno.id)
    queryParams.set('id_periodo', periodo)
    return Rest.get('informe', [], queryParams)
  }

  /**
    Devuelve la lista de cursos definidos.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getCursos () {
      return Rest.get('curso')
    }
  /**
   *  Devuelve la lista de ciclos definidos.
     @return {Promise} Devuelve la promesa asociada a la petición.
   */
     getCiclos () {
      return Rest.get('ciclo')
    }

    /**
    Devuelve la lista de modulos definidos.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getModulos () {
      return Rest.get('modulo')
    }
    /**
    Devuelve la lista de actividades del alumno con su nota media.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getActividadNotas (id,periodo) {
      const queryParams = new Map()
      queryParams.set('id_alumno', id)
      queryParams.set('periodo', periodo)
      return Rest.get('actividad', ['actividadNota'], queryParams)
    }
    /**
    Devuelve la lista de módulos del alumno con su nota media.
    @return {Promise} Devuelve la promesa asociada a la petición.
  **/
    getModulosNotas (id,periodo) {
      const queryParams = new Map()
      queryParams.set('id_alumno', id)
      queryParams.set('periodo', periodo)
      return Rest.get('modulo', ['moduloNota'], queryParams)
    }
    
    getEmpresas(){
        return Rest.get('empresa')
    }
    
    /**
     * Crea una empresa.
     * @param {Empresa} empresa - Datos de la empresa.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    crearEmpresa(empresa) {
      return Rest.post('empresa', [], empresa);
    }

    /**
     * Borra una empresa por su ID.
     * @param {number} id - ID de la empresa a borrar.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    borrarEmpresa(id) {
      return Rest.delete('empresa', [id]);
    }

    /**
     * Obtiene los datos de una empresa por su ID.
     * @param {number} id - ID de la empresa.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    getEmpresaById(id) {
      return Rest.get('empresa', [id]);
    }

    /**
     * Edita una empresa.
     * @param {Empresa} datosdelaempresa - Datos actualizados de la empresa.
     * @return {Promise} - Devuelve la promesa asociada a la petición.
     */
    editarEmpresa(datosdelaempresa) {
      return Rest.put('empresa', [], datosdelaempresa);
    }
    
  /**
   Devuelve la lista de alumnos por curso.
   La lista está formada por los alumnos que están asignados a un curso.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
  getAlumnos() {
    return Rest.get('gestionalumnos')
  }
  /**
   Devuelve la lista de modulos por curso.
   La lista está formada por los modulos que están asignados a un curso.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
   getModulosByCurso (curso) {
    const queryParams = new Map()
    queryParams.set('curso', curso)
    return Rest.get('gestionmodulos', [], queryParams)
  }
/**
   Devuelve la lista de modulos por curso.
   La lista está formada por los modulos que están asignados a un curso.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
   getModulosByCiclo (ciclo) {
    const queryParams = new Map()
    queryParams.set('ciclo', ciclo)
    return Rest.get('gestionmodulos', [], queryParams)
  }

  getCursosByCiclo(ciclo){
  
    const queryParams = new Map()
    queryParams.set('ciclo', ciclo)
    return Rest.get('gestionciclos', [], queryParams)
  }



verModulos(){
  return Rest.get('gestionmodulos')
}


  /**
   Borrar un alumno.
   @param alumnoId {Number} Identificador del alumno.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
  borrarAlumno (alumnoId) {
    return Rest.delete('gestionalumnos', [alumnoId])
  }

desactivarModulo(moduloId){
  
return Rest.delete('gestionmodulos', [moduloId])
}

   /**
   Borrar un actividad.
   @param actividadId {Number} Identificador de la actividad.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
   borrarActividad (actividadId) {
    return Rest.delete('gestionactividades', [actividadId])
  }

  /**
   Borrar un actividad.
   @param cicloId {Number} Identificador de la actividad.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
   borrarCiclo (cicloId) {
    return Rest.delete('gestionciclos', [cicloId])
  }

  /**
   * Realiza el alta de un alumno.
   * @param alumno {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  altaAlumno (alumno) {
    return Rest.post('gestionalumnos', [], alumno)
  }

  altaAlumnoMultiple(formData){

    return Rest.post('gestionalumnos', [], formData)
  }
  altaActividadMultiple(formData){

    return Rest.post('gestionactividades', [], formData)
  }
  /**
   * Realiza el alta de un modulo.
   * @param modulo {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  altaModulo (modulo) {
    
    return Rest.post('gestionmodulos', [], modulo)
  }
  /**
   * Realiza el alta de un modulo.
   * @param modulo {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  altaCiclo (ciclo) {
    
    return Rest.post('gestionciclos', [], ciclo)
  }
   /**
   * Realiza el alta de una actividad.
   * @param actividad {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
   altaActividad (actividad) {
    return Rest.post('gestionactividades', [], actividad)
  }

  /**
   * Modifica un alumno.
   * @param alumno {} Datos del alumno.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  modificarAlumno (alumno) {
    return Rest.put('gestionalumnos', [], alumno)
  }
   /**
   * Modifica una actividad.
   * @param actividad {} Datos de la actividad.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
   modificarActividad (actividad) {
    return Rest.put('gestionactividades', [], actividad)
  }
  /**
   * Modifica una actividad.
   * @param actividad {} Datos de la actividad.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
   modificarCiclo (ciclo) {
    return Rest.put('gestionciclos', [], ciclo)
  }
   modificarModulo (modulo) {
    return Rest.put('gestionmodulos', [], modulo)
  }
/**
   * Peticion que devuelve los datos de los convenios.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  recibirDatosConvenios () {
    return Rest.get('convenio')
  }

  /**
   * Peticion que edita los datos de un convenio por su id.
   * @param id - {Number} Identificador del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  editarConvenio (id, datos) {
    return Rest.put('convenio', [id], datos)
  }

  /**
   * Peticion que devuelve los datos de un convenio por su id.
   * @param id - {Number} Identificador del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  getConvenioById (id) {
    return Rest.get('convenio', [id])
  }

  /**
   * Peticion que borra un convenio por su id.
   * @param id - {Number} Identificador del convenio.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  borrarConvenioById (id) {
    return Rest.delete('convenio', [id])
  }
  
  /**
   Devuelve la lista de profesores por curso.
   La lista está formada por los profesores que están asignados a un curso.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
  getProfesores () {
    return Rest.get('gestionprofesores')
  }

  /**
   Borrar un profesor.
   @param profesorId {Number} Identificador del profesor.
   @return {Promise} Devuelve la promesa asociada a la petición.
   **/
  borrarProfesor (profesorId) {
    return Rest.delete('gestionprofesores', [profesorId])
  }

  /**
   * Realiza el alta de un profesor.
   * @param profesor {} Datos del profesor.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  altaProfesor (profesor) {
    return Rest.post('gestionprofesores', [], profesor)
  }
  

  /**
   * Modifica un profesor.
   * @param profesor {} Datos del profesor.
   * @returns {Promise} Devuelve la promesa asociada a la petición.
   */
  modificarProfesor (profesor) {
    return Rest.put('gestionprofesores', [], profesor)
  }
}
