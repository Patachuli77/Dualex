/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaAltaAlumno extends Vista{
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
    this.inputNombre = document.getElementById('nombreAlumno')
    this.inputApellidos = document.getElementById('apellidosAlumno')
    this.inputEmail = document.getElementById('emailAlumno')
    this.selectCurso = document.getElementById('selectCicloAltaAlumno')
    this.inputDni = document.getElementById('dniAlumno')
    this.inputNia = document.getElementById('niaAlumno')
    this.inputSituacionMatricula = document.getElementById('situacionMatriculaAlumno')
    this.inputTelefono = document.getElementById('telefonoAlumno')
    this.inputMateriasMatricula = document.getElementById('materiasAlumno')
    this.inputMateriasPendientes = document.getElementById('materiasPendientesAlumno')
    this.inputExpedienteCentro = document.getElementById('expedienteAlumno')
    this.inputRegimen = document.getElementById('regimenAlumno')
  
    this.inputAviso = document.getElementById('avisoAlumno')

    this.inputRepetidorSi = document.getElementById('repetidorAlumno')
    this.inputRepetidorNo = document.getElementById('repetidorAlumnoNo')
    this.inputBilingueSi = document.getElementById('bilingueAlumno')
    this.inputBilingueNo = document.getElementById('bilingueAlumnoNo')

    this.botonAlta = document.getElementById('btnAnadirAltaAlumno')
    this.botonAltaMultiple = document.getElementById('btnAnadirAltaAlumnoMultiple')
    this.botonLimpiar = document.getElementById('btnLimpiarAltaAlumno')
    this.botonCancelar = document.getElementById('btnCancelarAltaAlumno')

    this.errorNombre = document.getElementById('errorNombreAlumno')
    this.errorApellidos = document.getElementById('errorApellidosAlumno')
    this.errorEmail = document.getElementById('errorEmailAlumno')
    this.errorCurso = document.getElementById('errorCursoAlumno')
    this.archivo = document.getElementById('multiple')

    // Asociamos eventos
    this.botonAlta.addEventListener("click", this.altaAlumno.bind(this))
    this.botonAltaMultiple.addEventListener("click", this.altaAlumnoMultiple.bind(this))
    this.botonLimpiar.addEventListener("click", this.limpiarCampos.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))

    // Ejecutar metodos necesarios

  }

  /**
   * Realiza el alta de un alumno.
   */
    altaAlumno() {
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

        }
        //console.log(alumno)
       this.controlador.altaAlumno(alumno)
        this.limpiarCampos()
        this.cancelar()
      }
    }
    altaAlumnoMultiple(){

      this.controlador.altaAlumnoMultiple()

    }

    /**
   * Valida el campo de documento.
   * @returns {boolean} Devuelve true si el campo es valido, false en caso contrario.
   */
  validarDocumento () {
    const file = this.archivo.files[0]
    console.log(this.archivo)
    const tipoDocumento = file ? file.type : ''

    const errorDocumento = document.getElementById('errorDocumento')
    const maxSizeMB = 10 // Tamaño máximo permitido en megabytes

    if (file && tipoDocumento === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      if (file.size <= maxSizeMB * 1024 * 1024) {
        errorDocumento.textContent = ''
        return true
      } else {
        errorDocumento.textContent = `El tamaño del archivo debe ser menor o igual a ${maxSizeMB} MB.`
        return false
      }
    } else {
      errorDocumento.textContent = 'El documento debe ser un archivo xlsx.'
      return false
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
     * Limpiar los campos del formulario.
     */
    limpiarCampos() {
        this.inputNombre.value = '';
        this.inputApellidos.value = '';
        this.inputEmail.value = '';
        this.inputDni.value = '';
        this.inputNia.value = '';
        this.inputSituacionMatricula.value = '';
        this.inputTelefono.value = '';
        this.inputMateriasMatricula.value = '';
        this.inputMateriasPendientes.value = '';
        this.inputExpedienteCentro.value = '';
        this.inputRegimen.value = '';
        this.inputAviso.value = '';

        // Select
        this.selectCurso.selectedIndex = 0;

        // Radio buttons (repetidor)
        this.inputRepetidorSi.checked = false;
        this.inputRepetidorNo.checked = false;

        // Radio buttons (bilingüe)
        this.inputBilingueSi.checked = false;
        this.inputBilingueNo.checked = false;
      this.ocultarErrores()
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
   * Carga los datos de los cursos en el select.
   * @param cursos Lista de cursos.
   */
  cargarDatos() {
    // Limpiar las opciones existentes del select
    

    if (this.cursos.length === 0) {
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
          }
        })
        .catch(error => console.log(error))
    }
}
}

