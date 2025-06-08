/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaAltaCiclo extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base

    // Cogemos referencias a los elementos del interfaz
    this.inputNombre = document.getElementById('nombreCiclo')
    this.inputSiglas = document.getElementById('siglasCiclo')
    this.inputGradoMedio = document.getElementById('gradoMedio');
    this.inputGradoSuperior = document.getElementById('gradoSuperior');


    //PRIMERO
    this.inputCodigoCursoPrimero = document.getElementById('codigoCurso1');
    this.colorFondoCurso1 = document.getElementById('colorFondoCurso1')
    this.colorTextoCurso1 = document.getElementById('colorTextoCurso1')
    this.selectProfesorPrimero = document.getElementById('selectProfesorPrimerCurso')
    this.divEjemploColorPrimerCurso = document.getElementById('ejemploColorPrimerCurso')

    //SEGUNDO
    this.inputCodigoCursoSegundo = document.getElementById('codigoCurso2');
    this.colorFondoCurso2 = document.getElementById('colorFondoCurso2')
    this.colorTextoCurso2 = document.getElementById('colorTextoCurso2')
    this.selectProfesorSegundo = document.getElementById('selectProfesorSegundoCurso')
    this.divEjemploColorSegundoCurso = document.getElementById('ejemploColorSegundoCurso')

    //ERRORES
    this.errorNombre = document.getElementById('errorNombreCiclo')
    this.errorSiglas = document.getElementById('errorSiglasCiclo')
    this.errorGrado = document.getElementById('errorGradoCiclo')
    this.errorCodigoCurso1 = document.getElementById('errorCodigoCurso1')
    this.errorColorFondoCurso1 = document.getElementById('errorColorFondoCurso1')
    this.errorColortextoCurso1 = document.getElementById('errorColortextoCurso1')
    this.errorProfesorCurso1 = document.getElementById('errorProfesorCurso1')
    this.errorCodigoCurso2 = document.getElementById('errorCodigoCurso2')
    this.errorColorFondoCurso2 = document.getElementById('errorColorFondoCurso2')
    this.errorColortextoCurso2 = document.getElementById('errorColorTextoCurso2')
    this.errorProfesorCurso2 = document.getElementById('errorProfesorCurso2')



    this.botonAlta = document.getElementById('btnAnadirAltaCiclo')
    this.botonLimpiar = document.getElementById('btnLimpiarAltaCiclo')
    this.botonCancelar = document.getElementById('btnCancelarAltaCiclo')

    

    // Asociamos eventos
    this.botonAlta.addEventListener("click", this.altaCiclo.bind(this))///

    this.botonLimpiar.addEventListener("click", this.limpiarCampos.bind(this))
    this.botonCancelar.addEventListener("click", this.cancelar.bind(this))/////

    //ASOCIAMOS METODOS CHANGE

     this.inputSiglas.addEventListener("change", this.rellenarCodigoCursos.bind(this) )

    this.inputCodigoCursoPrimero.addEventListener("change", this.crearEjemploPrimero.bind(this) )
    this.colorFondoCurso1.addEventListener("change", this.crearEjemploPrimero.bind(this) )
    this.colorTextoCurso1.addEventListener("change", this.crearEjemploPrimero.bind(this) )

    this.inputCodigoCursoSegundo.addEventListener("change", this.crearEjemploSegundo.bind(this) )
    this.colorFondoCurso2.addEventListener("change", this.crearEjemploSegundo.bind(this) )
    this.colorTextoCurso2.addEventListener("change", this.crearEjemploSegundo.bind(this) )



    // Ejecutar metodos necesarios

  }
  rellenarCodigoCursos(){

    this.inputCodigoCursoPrimero.value = "1"+ this.inputSiglas.value
    this.inputCodigoCursoSegundo.value = "2"+ this.inputSiglas.value

  }
  

    crearEjemploPrimero() {
         this.divEjemploColorPrimerCurso.innerHTML = ""
        if(this.inputCodigoCursoPrimero != '' && this.colorFondoCurso1.value != '' && this.colorTextoCurso1.value != ''){
            
           

            let span = document.createElement('span')
            span.textContent = this.inputCodigoCursoPrimero.value.trim()
            span.style.padding = "5px"
            span.style.color = "#" + this.colorTextoCurso1.value.trim()
            span.style.backgroundColor = "#" + this.colorFondoCurso1.value.trim()
            this.divEjemploColorPrimerCurso.appendChild(span)
        }
        
    }

    crearEjemploSegundo() {
         this.divEjemploColorSegundoCurso.innerHTML = ""
        if(this.inputCodigoCursoSegundo != '' && this.colorFondoCurso2.value != '' && this.colorTextoCurso2.value != ''){
            
           

            let span = document.createElement('span')
            span.textContent = this.inputCodigoCursoSegundo.value.trim()
            span.style.padding = "5px"
            span.style.color = "#" + this.colorTextoCurso2.value.trim()
            span.style.backgroundColor = "#" + this.colorFondoCurso2.value.trim()
            this.divEjemploColorSegundoCurso.appendChild(span)
        }
       

      }






  /**
   * Realiza el alta de un alumno.
   */
    altaCiclo() {
      if (this.comprobacion()) {
      let grado = ' '
      if (this.inputGradoMedio.checked) {
        grado = this.inputGradoMedio.value;
        } else if (this.inputGradoSuperior.checked) {
            grado = this.inputGradoSuperior.value;
        }

      const tutorPrimero = document.querySelector('input[name="tutorPrimeroSeleccionado"]:checked');
      const idTutorPrimero = tutorPrimero ? tutorPrimero.value : null;

      const tutorSegundo = document.querySelector('input[name="tutorSegundoSeleccionado"]:checked');
      const idTutorSegundo = tutorSegundo ? tutorSegundo.value : null;



        const ciclo = {
          nombre: this.inputNombre.value.trim(),
          siglas: this.inputSiglas.value.trim(),
          grado,
          idTutorPrimero,
          codigoPrimero: this.inputCodigoCursoPrimero.value.trim(),
          colorFondoPrimero: '#' + this.colorFondoCurso1.value.trim(),
          colorLetraPrimero: '#' + this.colorTextoCurso1.value.trim(),
          idTutorSegundo,
          codigoSegundo: this.inputCodigoCursoSegundo.value.trim(),
          colorFondoSegundo: '#' + this.colorFondoCurso2.value.trim(),
          colorLetraSegundo: '#' + this.colorTextoCurso2.value.trim(),
        }



        console.log(ciclo)
        this.controlador.altaCiclo(ciclo)
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
      const regexSiglas = /^[0-9]+[A-Za-z]+$/
      const regexHex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

      const tutorPrimero = document.querySelector('input[name="tutorPrimeroSeleccionado"]:checked');
      const idTutorPrimero = tutorPrimero ? tutorPrimero.value : null;
      const tutorSegundo = document.querySelector('input[name="tutorSegundoSeleccionado"]:checked');
      const idTutorSegundo = tutorSegundo ? tutorSegundo.value : null;
      console.log(idTutorPrimero, idTutorSegundo)

      if (this.inputNombre.value === '' || this.inputNombre.value === null ||
           !regexNombre.test(this.inputNombre.value)){
           this.errorNombre.style.display = 'block'
           isValid = false;
       } else {
           this.errorNombre.style.display = 'none'
       }
       if (this.inputSiglas.value === '' || this.inputSiglas.value === null ||
           !regexNombre.test(this.inputSiglas.value)){
           this.errorSiglas.style.display = 'block'
           isValid = false;
       } else {
           this.errorSiglas.style.display = 'none'
       }
        if (this.inputGradoMedio.checked || this.inputGradoSuperior.checked) {
           this.errorGrado.style.display = 'none'
        } else{
          this.errorGrado.style.display = 'block'
        }
         if (this.inputCodigoCursoPrimero.value === '' || this.inputCodigoCursoPrimero.value === null ||
           !regexSiglas.test(this.inputCodigoCursoPrimero.value)){
           this.errorCodigoCurso1.style.display = 'block'
           isValid = false;
       } else {
           this.errorCodigoCurso1.style.display = 'none'
       }
       if (this.inputCodigoCursoSegundo.value === '' || this.inputCodigoCursoSegundo.value === null ||
            !regexSiglas.test(this.inputCodigoCursoSegundo.value)) {
            this.errorCodigoCurso2.style.display = 'block'
            isValid = false;
        } else {
            this.errorCodigoCurso2.style.display = 'none'
        }
        if (this.colorFondoCurso1.value === '' || this.colorFondoCurso1.value === null ||
            !regexHex.test(this.colorFondoCurso1.value)) {
            this.errorColorFondoCurso1.style.display = 'block'
            isValid = false;
        } else {
            this.errorColorFondoCurso1.style.display = 'none'
        }
        if (this.colorTextoCurso1.value === '' || this.colorTextoCurso1.value === null ||
            !regexHex.test(this.colorTextoCurso1.value)) {
            this.errorColortextoCurso1.style.display = 'block'
            isValid = false;
        } else {
            this.errorColortextoCurso1.style.display = 'none'
        }
        if (this.colorFondoCurso2.value === '' || this.colorFondoCurso2.value === null ||
            !regexHex.test(this.colorFondoCurso2.value)) {
            this.errorColorFondoCurso2.style.display = 'block'
            isValid = false;
        } else {
            this.errorColorFondoCurso2.style.display = 'none'
        }
        if (this.colorTextoCurso2.value === '' || this.colorTextoCurso2.value === null ||
            !regexHex.test(this.colorTextoCurso2.value)) {
            this.errorColortextoCurso2.style.display = 'block'
            isValid = false;
        } else {
            this.errorColortextoCurso2.style.display = 'none'
        }
        if (idTutorPrimero === null) {
          this.errorProfesorCurso1.style.display = 'block';
          isValid = false;
        } else {
          this.errorProfesorCurso1.style.display = 'none';
        }
        if (idTutorSegundo === null) {
          this.errorProfesorCurso2.style.display = 'block';
          isValid = false;
        } else {
          this.errorProfesorCurso2.style.display = 'none';
        }

       if (isValid === false) {return false;}
      return true;
    }

    /**
     * Limpiar los campos del formulario.
     */
    limpiarCampos() {
      this.inputNombre.value = ''
      this.inputSiglas.value = ''
      this.inputCodigoCursoPrimero.value = ''
      this.colorFondoCurso1.value = ''
      this.colorTextoCurso1.value = ''
      this.inputCodigoCursoSegundo.value = ''
      this.colorFondoCurso2.value = ''
      this.colorTextoCurso2.value = ''
      this.divEjemploColorPrimerCurso.innerHTML = ""
      this.divEjemploColorSegundoCurso.innerHTML = ""
      this.inputGradoMedio.checked = false;
      this.inputGradoSuperior.checked = false;
      if (this.selectProfesorPrimero) this.selectProfesorPrimero.selectedIndex = 0;
      if (this.selectProfesorSegundo) this.selectProfesorSegundo.selectedIndex = 0;

      
      const tutorPrimeroSeleccionado = document.querySelector('input[name="tutorPrimeroSeleccionado"]:checked');
      if (tutorPrimeroSeleccionado) tutorPrimeroSeleccionado.checked = false;

      const tutorSegundoSeleccionado = document.querySelector('input[name="tutorSegundoSeleccionado"]:checked');
      if (tutorSegundoSeleccionado) tutorSegundoSeleccionado.checked = false;
          this.ocultarErrores()
        }

    /**
     * Vuelve a la vista de gestión de alumnos.
     */
    cancelar() {
      this.controlador.mostrarGestionCiclos()
    }

  /**
   * Oculta los errores de los campos del formulario.
   */
    ocultarErrores() {
    this.errorNombre.style.display = 'none';
    this.errorSiglas.style.display = 'none';
    this.errorGrado.style.display = 'none';
    this.errorCodigoCurso1.style.display = 'none';
    this.errorColorFondoCurso1.style.display = 'none';
    this.errorColortextoCurso1.style.display = 'none';
    this.errorProfesorCurso1.style.display = 'none';
    this.errorCodigoCurso2.style.display = 'none';
    this.errorColorFondoCurso2.style.display = 'none';
    this.errorColortextoCurso2.style.display = 'none';
    this.errorProfesorCurso2.style.display = 'none';
    }

    cargarDatos(){
        this.selectProfesorPrimero.innerHTML = '';
          this.selectProfesorSegundo.innerHTML = '';
    
      this.controlador.getProfesores()
      .then(profesores => {
        profesores.sort((a, b) =>
          a.apellidos.toLowerCase().localeCompare(b.apellidos.toLowerCase())
        );

        profesores.forEach(profesor => {
          const div = document.createElement('div');

          const input = document.createElement('input');
          input.type = 'radio';
          input.name = 'tutorPrimeroSeleccionado'; // MISMO name para que solo uno se seleccione
          input.value = profesor.id;

          const label = document.createElement('label');
          label.textContent = `${profesor.apellidos}, ${profesor.nombre}`;
          label.prepend(input); // pone el input dentro del label

          div.appendChild(label);
          this.selectProfesorPrimero.appendChild(div);


          const div2 = document.createElement('div');

          const input2 = document.createElement('input');
          input2.type = 'radio';
          input2.name = 'tutorSegundoSeleccionado'; // MISMO name para que solo uno se seleccione
          input2.value = profesor.id;

          const label2 = document.createElement('label');
          label2.textContent = `${profesor.apellidos}, ${profesor.nombre}`;
          label2.prepend(input2); // pone el input dentro del label

          div2.appendChild(label2);
          this.selectProfesorSegundo.appendChild(div2);








        });
      });






    }

}
