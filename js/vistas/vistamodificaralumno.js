/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaModificarAlumno extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.alumno
    this.cursos = []

    // Cogemos referencias a los elementos del interfaz
    this.divAltaAlumno = document.getElementById('divAltaAlumno')

    this.inputNombre = document.getElementById('nombreAlumnoMod')
    this.inputApellidos = document.getElementById('apellidosAlumnoMod')
    this.inputEmail = document.getElementById('emailAlumnoMod')
    this.selectCurso = document.getElementById('selectCicloModAlumno')
    this.inputDni = document.getElementById('dniAlumnoMod')
    this.inputNia = document.getElementById('niaAlumnoMod')
    this.inputSituacionMatricula = document.getElementById('situacionMatriculaAlumnoMod')
    this.inputTelefono = document.getElementById('telefonoAlumnoMod')
    this.inputMateriasMatricula = document.getElementById('materiasAlumnoMod')
    this.inputMateriasPendientes = document.getElementById('materiasPendientesAlumnoMod')
    this.inputExpedienteCentro = document.getElementById('expedienteAlumnoMod')
    this.inputRegimen = document.getElementById('regimenAlumnoMod')
  
    this.inputAviso = document.getElementById('avisoAlumnoMod')

    this.inputRepetidorSi = document.getElementById('repetidorAlumnoMod')
    this.inputRepetidorNo = document.getElementById('repetidorAlumnoNoMod')
    this.inputBilingueSi = document.getElementById('bilingueAlumnoMod')
    this.inputBilingueNo = document.getElementById('bilingueAlumnoNoMod')

    this.botonModificar = document.getElementById('btnAnadirModAlumno')
    this.botonCancelar = document.getElementById('btnCancelarModAlumno')

    this.errorNombre = document.getElementById('errorNombreAlumnoMod')
    this.errorApellidos = document.getElementById('errorApellidosAlumnoMod')
    this.errorEmail = document.getElementById('errorEmailAlumnoMod')
    this.errorCurso = document.getElementById('errorCursoAlumnoMod')

    // Asociamos eventos
    this.botonModificar.addEventListener("click", this.modificarAlumno.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Realiza el alta de un alumno.
   */
    modificarAlumno() {
      let repetidor = ' '
      if (this.inputRepetidorSi.checked) {
        repetidor = this.inputRepetidorSi.value;
        } else if (this.inputRepetidorNo.checked) {
            repetidor = this.inputRepetidorNo.value;
        }

        let bilingue = ' '
      if (this.inputBilingueSi.checked) {
        bilingue = this.inputBilingueSi.value;
        } else if (this.inputBilingueNo.checked) {
            bilingue = this.inputBilingueNo.value;
        }



      if (this.comprobacion()) {
        const alumno = {
          nombre: this.inputNombre.value.trim(),
          apellidos: this.inputApellidos.value.trim(),
          email: this.inputEmail.value.trim(),
          curso: this.selectCurso.value,
          nia: this.inputNia.value.trim(),
          dni: this.inputDni.value.trim(),
          situacion_matricula: this.inputSituacionMatricula.value.trim(),
          telefono: this.inputTelefono.value.trim(),
          aviso: this.inputAviso.value.trim(),
          materias_matricula: this.inputMateriasMatricula.value,
          materias_pendientes: this.inputMateriasPendientes.value,
          expediente: this.inputExpedienteCentro.value.trim(),
          regimen: this.inputRegimen.value.trim(),
          bilingue,
          repetidor,
          id: this.alumno.id,

        }
        this.controlador.modificarAlumno(alumno)
        this.cancelar()
      }
    }

  /**
   * Comprueba que los campos del formulario estén rellenos correctamente.
   */
    comprobacion() {
      let isValid = true
      const regex = /^[a-zA-Z\s]+$/
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

      if (this.inputNombre.value === '' || this.inputNombre.value === null ||
          !regex.test(this.inputNombre.value)){
          this.errorNombre.style.display = 'block'
          isValid = false;
      } else {
          this.errorNombre.style.display = 'none'
      }

      if (this.inputApellidos.value === '' || this.inputApellidos.value === null ||
        !regex.test(this.inputApellidos.value)) {
          this.errorApellidos.style.display = 'block'
        isValid = false;
      } else {
          this.errorApellidos.style.display = 'none'
      }

      if (this.inputEmail.value === '' || this.inputEmail.value === null ||
          !regexEmail.test(this.inputEmail.value)) {
          this.errorEmail.style.display = 'block'
        isValid = false;
      } else {
          this.errorEmail.style.display = 'none'
      }

      if (this.selectCurso.value === '' || this.selectCurso.value === null) {
          this.errorCurso.style.display = 'block'
        isValid = false;
      } else {
          this.errorCurso.style.display = 'none'
      }

      if (isValid === false) {return false;}
      return true;
    }

    /**
     * Vuelve a la vista de gestión de alumnos.
     */
    cancelar() {
      this.controlador.mostrarGestionAlumnos()
    }

  /**
   * Oculta los errores de los campos del formulario.
   */
    ocultarErrores() {
      this.errorNombre.style.display = 'none'
      this.errorApellidos.style.display = 'none'
      this.errorEmail.style.display = 'none'
      this.errorCurso.style.display = 'none'
    }

  /**
   * Carga los datos de un alumno en el formulario y los cursos en el select.
   * @param alumno Datos del alumno.
   * @param cursos Lista de cursos.
   */
  cargarDatos(alumno, cursos) {
    this.ocultarErrores()
    this.alumno = alumno

    this.inputNombre.value = alumno.nombre.trim();
    this.inputApellidos.value = alumno.apellidos.trim();
    this.inputEmail.value = alumno.email.trim();
    this.inputDni.value = alumno.dni ? alumno.dni.trim() : '';
    this.inputNia.value = alumno.nia ? alumno.nia.trim() : '';
    this.inputSituacionMatricula.value = alumno.situacion_matricula ? alumno.situacion_matricula.trim() : '';
    this.inputTelefono.value = alumno.telefono ? alumno.telefono.trim() : '';
    this.inputMateriasMatricula.value = alumno.materias_matricula ? alumno.materias_matricula.trim() : '';
    this.inputMateriasPendientes.value = alumno.materias_pendientes ? alumno.materias_pendientes.trim() : '';
    this.inputExpedienteCentro.value = alumno.expediente_centro ? alumno.expediente_centro.trim() : '';
    this.inputRegimen.value = alumno.tipo_regimen ? alumno.tipo_regimen.trim() : '';
    this.inputAviso.value = alumno.aviso ? alumno.aviso.trim() : '';

    // Set radios repetidor (asumiendo que es boolean o 0/1)
    if (alumno.es_repetidor == 1 || alumno.es_repetidor === true || alumno.es_repetidor === '1') {
      this.inputRepetidorSi.checked = true;
      this.inputRepetidorNo.checked = false;
    } else {
      this.inputRepetidorSi.checked = false;
      this.inputRepetidorNo.checked = true;
    }

    // Set radios bilingue (igual)
    if (alumno.bilingue == 1 || alumno.bilingue === true || alumno.bilingue === '1') {
      this.inputBilingueSi.checked = true;
      this.inputBilingueNo.checked = false;
    } else {
      this.inputBilingueSi.checked = false;
      this.inputBilingueNo.checked = true;
    }

    this.cursos = []
    // Recorrer los cursos y agregar opciones al select
    if (this.cursos.length === 0) {
       this.selectCurso.innerHTML = '';
      this.controlador.getCursos()
        .then(cursos => {

          let option1 = document.createElement('option')
          this.selectCurso.appendChild(option1)
          option1.value = ''
          option1.textContent = 'Seleccione'
          option1.disabled = 'true'

          for (let i = 0; i < cursos.length; i++) {
            this.cursos[i] = cursos[i]
            let option = document.createElement('option')
            this.selectCurso.appendChild(option)
            option.value = cursos[i].id

   
   

            option.textContent = cursos[i].codigo

            if (cursos[i].codigo === alumno.codigo.trim()) {
              option.selected = true;
            }
          }
        })
        .catch(error => console.log(error))
    }
  }



}
