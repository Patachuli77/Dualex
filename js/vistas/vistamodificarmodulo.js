/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaModificarModulo extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.modulo
    // Cogemos referencias a los elementos del interfaz
    this.inputTitulo = document.getElementById('tituloModuloMod')
    this.inputCodigo = document.getElementById('codigoModuloMod')
    this.inputColorFondo = document.getElementById('colorFondoMod')
    this.inputColorLetra = document.getElementById('colorTextoMod')
    this.selectCiclo= document.getElementById('selectCicloModuloMod')
    this.selectProfesor = document.getElementById('selectProfesorModuloMod')

    this.divEjemploColorModulo = document.getElementById('ejemploColorModuloMod')


    this.botonAlta = document.getElementById('btnAnadirModModulo')
    this.botonCancelar = document.getElementById('btnCancelarModModulo')


    this.errorTitulo  = document.getElementById('errorTituloModuloMod')
    this.errorCodigo  = document.getElementById('errorCodigoModuloMod')
    this.errorColorFondo  = document.getElementById('errorColorFondoMod')
    this.errorColorLetra  = document.getElementById('errorColorTextoMod')
    this.errorProfesores  = document.getElementById('errorProfesorModuloMod')

    

    // Asociamos eventos
    this.botonAlta.addEventListener("click", this.modificarModulo.bind(this))///


    this.inputCodigo.addEventListener("change", this.crearEjemplo.bind(this) )
    this.inputColorFondo.addEventListener("change", this.crearEjemplo.bind(this) )
    this.inputColorLetra.addEventListener("change", this.crearEjemplo.bind(this) )
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
    modificarModulo() {
      if (this.comprobacion()) {
        const modulo = {
          titulo: this.inputTitulo.value.trim(),
          codigo: this.inputCodigo.value.trim(),
          color_fondo: '#' + this.inputColorFondo.value.trim(),
          color_letra: '#' + this.inputColorLetra.value.trim(),
          ciclo: this.selectCiclo.value,
          id: this.modulo.id

        }
        modulo.profesores= []
        for (const iProfesor of document.querySelectorAll('input[data-idProfesor]')) {
          if (iProfesor.checked) { modulo.profesores.push(iProfesor.getAttribute('data-idProfesor')) }
        }
        
        this.controlador.modificarModulo(modulo)
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
      this.divEjemploColorModulo.innerHTML = ''
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
  cargarDatos(modulo) {
    // Limpiar las opciones existentes del select
    this.limpiarCampos()
    this.modulo = modulo

    this.selectCiclo.innerHTML = '';
    this.selectProfesor.innerHTML = '';

    this.inputTitulo.value = modulo.titulo.trim();
    this.inputCodigo.value = modulo.codigo.trim();
    this.inputColorFondo.value = modulo.color_fondo.trim().slice(1);
    this.inputColorLetra.value = modulo.color_letra.trim().slice(1);
   
    Promise.all([
      this.controlador.getProfesores(), // todos los profesores
      this.controlador.getProfesoresByModulo(modulo.id) // asignados al módulo
    ]).then(([todosProfesores, profesoresModulo]) => {
      console.log(todosProfesores, profesoresModulo)
      // Paso 3: ordenamos por apellidos
      todosProfesores.sort((a, b) => {
        return a.apellidos.toLowerCase().localeCompare(b.apellidos.toLowerCase());
      });

      // Creamos un Set con los IDs de los profesores del módulo
      const idsAsignados = new Set(profesoresModulo.map(p => p.id));

      // Recorremos todos los profesores y creamos los checkboxes
      todosProfesores.forEach(profesor => {
        const div = document.createElement('div');
        this.selectProfesor.appendChild(div);

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('data-idProfesor', profesor.id);

        // Si está en la lista del módulo, lo marcamos
        if (idsAsignados.has(profesor.id)) {
          input.checked = true;
        }

        const label = document.createElement('label');
        label.textContent = profesor.apellidos + ', ' + profesor.nombre;

        div.appendChild(input);
        div.appendChild(label);
      });

    });

    this.controlador.getCiclos()
     .then(ciclos => {
    
    for(let i = 0; i < ciclos.length; i++){
      let option = document.createElement('option');
      option.value = ciclos[i].id;
      
      option.textContent = ciclos[i].siglas;
      if(ciclos[i].siglas == modulo.siglas_ciclo){
        option.selected =true;
      }
      this.selectCiclo.appendChild(option);
    }
    })
    
  }
}