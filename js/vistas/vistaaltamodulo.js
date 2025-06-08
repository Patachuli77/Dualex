/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaAltaModulo extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base

    // Cogemos referencias a los elementos del interfaz
    this.inputTitulo = document.getElementById('tituloModulo')
    this.inputCodigo = document.getElementById('codigoModulo')
    this.inputColorFondo = document.getElementById('colorFondo')
    this.inputColorLetra = document.getElementById('colorTexto')
    this.selectCiclo= document.getElementById('selectCicloModulo')
    this.selectProfesor = document.getElementById('selectProfesorModulo')

    this.divEjemploColorModulo = document.getElementById('ejemploColorModulo')


    this.botonAlta = document.getElementById('btnAnadirAltaModulo')
    this.botonLimpiar = document.getElementById('btnLimpiarAltaModulo')
    this.botonCancelar = document.getElementById('btnCancelarAltaModulo')

    
    this.errorTitulo  = document.getElementById('errorTituloModulo')
    this.errorCodigo  = document.getElementById('errorCodigoModulo')
    this.errorColorFondo  = document.getElementById('errorColorFondo')
    this.errorColorLetra  = document.getElementById('errorColorTexto')
    this.errorProfesores  = document.getElementById('errorProfesorModulo')

    // Asociamos eventos
    this.botonAlta.addEventListener("click", this.altaModulo.bind(this))///


    this.inputCodigo.addEventListener("change", this.crearEjemplo.bind(this) )
    this.inputColorFondo.addEventListener("change", this.crearEjemplo.bind(this) )
    this.inputColorLetra.addEventListener("change", this.crearEjemplo.bind(this) )

    this.botonLimpiar.addEventListener("click", this.limpiarCampos.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))/////

    // Ejecutar metodos necesarios

  }
    /**
     * Crea el ejemplo de como quedaria la tarjeta
     */
    crearEjemplo() {
         this.divEjemploColorModulo.innerHTML = ""
        if(this.inputCodigo != '' && this.inputColorFondo.value != '' && this.inputColorLetra.value != ''){
            
           

            let span = document.createElement('span')
            span.textContent = this.inputCodigo.value.trim()
            span.style.padding = "5px"
            span.style.color = "#" + this.inputColorLetra.value.trim()
            span.style.backgroundColor = "#" + this.inputColorFondo.value.trim()
            this.divEjemploColorModulo.appendChild(span)
        }
        
    }

  /**
   * Realiza el alta de un alumno.
   */
    altaModulo() {
      if (this.comprobacion()) {
        const modulo = {
          titulo: this.inputTitulo.value.trim(),
          codigo: this.inputCodigo.value.trim(),
          color_fondo: '#' + this.inputColorFondo.value.trim(),
          color_letra: '#' + this.inputColorLetra.value.trim(),
          ciclo: this.selectCiclo.value

        }
        modulo.profesores= []
        for (const iProfesor of document.querySelectorAll('input[data-idProfesor]')) {
          if (iProfesor.checked) { modulo.profesores.push(iProfesor.getAttribute('data-idProfesor')) }
        }
        
          this.controlador.altaModulo(modulo)
          this.limpiarCampos()
          this.cancelar()
        
        
      }
    }

  /**
   * Comprueba que los campos del formulario estén rellenos correctamente.
   */
    comprobacion() {
      let isValid = true
      const regexNombre = /^[a-zA-Z\s]+$/
      const regexHex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ // Código HEX sin '#'
      // Validar título
      if (this.inputTitulo.value.trim() === '' || !regexNombre.test(this.inputTitulo.value)) {
        this.errorTitulo.style.display = 'block';
        isValid = false;
      } else {
        this.errorTitulo.style.display = 'none';
      }

      // Validar código
      if (this.inputCodigo.value.trim() === '' || !regexNombre.test(this.inputCodigo.value)) {
        this.errorCodigo.style.display = 'block';
        isValid = false;
      } else {
        this.errorCodigo.style.display = 'none';
      }

      // Validar color de fondo
      if (this.inputColorFondo.value.trim() === '' || !regexHex.test(this.inputColorFondo.value)) {
        this.errorColorFondo.style.display = 'block';
        isValid = false;
      } else {
        this.errorColorFondo.style.display = 'none';
      }

      // Validar color de letra
      if (this.inputColorLetra.value.trim() === '' || !regexHex.test(this.inputColorLetra.value)) {
        this.errorColorLetra.style.display = 'block';
        isValid = false;
      } else {
        this.errorColorLetra.style.display = 'none';
      }

      // Validar al menos un profesor seleccionado (checkboxes)
      const profesorSeleccionado = document.querySelectorAll('input[data-idProfesor]:checked');
      if (profesorSeleccionado.length === 0) {
        this.errorProfesores.style.display = 'block';
        isValid = false;
      } else {
        this.errorProfesores.style.display = 'none';
      }
      if (isValid === false) {return false;}
      return true;
    }

    /**
     * Limpiar los campos del formulario.
     */
    limpiarCampos() {
      this.inputTitulo.value = ''
      this.inputCodigo.value = ''
      this.inputColorFondo.value = ''
      this.inputColorLetra.value = ''
      this.divEjemploColorModulo.innerHTML = ""
      this.ocultarErrores()
    }

    /**
     * Vuelve a la vista de gestión de alumnos.
     */
    cancelar() {
      this.controlador.mostrarGestionModulos()
    }

  /**
   * Oculta los errores de los campos del formulario.
   */
    ocultarErrores() {

      this.errorTitulo.style.display = 'none'
    this.errorCodigo.style.display = 'none'
    this.errorColorFondo.style.display = 'none'
    this.errorColorLetra.style.display = 'none'
    this.errorProfesores.style.display = 'none'
    }

  /**
   * Carga los datos de los ciclos en el select.
   * @param ciclos Lista de ciclos.
   */
  cargarDatos() {
    // Limpiar las opciones existentes del select
   
    this.selectCiclo.innerHTML = '';
    this.selectProfesor.innerHTML = '';

    this.controlador.getProfesores()
    .then(profesores => {
     profesores.sort((a, b) => {
      const apellidoA = a.apellidos.toLowerCase();
      const apellidoB = b.apellidos.toLowerCase();
      return apellidoA.localeCompare(apellidoB);
     });

      for(let i = 0; i < profesores.length; i++){

        const div = document.createElement('div')
         this.selectProfesor.appendChild(div)
         const input = document.createElement('input')
           div.appendChild(input)
           input.setAttribute('type', 'checkbox')
           input.setAttribute('data-idProfesor',  profesores[i].id)
           const label = document.createElement('label')
           div.appendChild(label)
           label.textContent =  profesores[i].apellidos + ', ' +  profesores[i].nombre
          
           
      }
    })

     this.controlador.getCiclos()
     .then(ciclos => {
    
    for(let i = 0; i < ciclos.length; i++){
      let option = document.createElement('option');
      option.value = ciclos[i].id;
      option.textContent = ciclos[i].siglas;
      this.selectCiclo.appendChild(option);
    }
    })
  }
}
