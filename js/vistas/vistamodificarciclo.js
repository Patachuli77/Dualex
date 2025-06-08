/**
 Vista con el alta de alumno.
 **/
import { Vista } from './vista.js'

export class VistaModificarCiclo extends Vista{
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista.
   @param {Node} base Nodo al que se añadirá la vista.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    this.ciclo
    // Cogemos referencias a los elementos del interfaz
    this.inputNombre = document.getElementById('nombreCicloMod')
    this.inputSiglas = document.getElementById('siglasCicloMod')
    this.inputGradoMedio = document.getElementById('gradoMedioMod');
    this.inputGradoSuperior = document.getElementById('gradoSuperiorMod');


    //PRIMERO
    this.inputCodigoCursoPrimero = document.getElementById('codigoCurso1Mod');
    this.colorFondoCurso1 = document.getElementById('colorFondoCurso1Mod')
    this.colorTextoCurso1 = document.getElementById('colorTextoCurso1Mod')
    this.selectProfesorPrimero = document.getElementById('selectProfesorPrimerCursoMod')
    this.divEjemploColorPrimerCurso = document.getElementById('ejemploColorPrimerCursoMod')

    //SEGUNDO
    this.inputCodigoCursoSegundo = document.getElementById('codigoCurso2Mod');
    this.colorFondoCurso2 = document.getElementById('colorFondoCurso2Mod')
    this.colorTextoCurso2 = document.getElementById('colorTextoCurso2Mod')
    this.selectProfesorSegundo = document.getElementById('selectProfesorSegundoCursoMod')
    this.divEjemploColorSegundoCurso = document.getElementById('ejemploColorSegundoCursoMod')

    //ERRORES
    this.errorNombre = document.getElementById('errorNombreCicloMod')
    this.errorSiglas = document.getElementById('errorSiglasCicloMod')
    this.errorGrado = document.getElementById('errorGradoCicloMod')
    this.errorCodigoCurso1 = document.getElementById('errorCodigoCurso1Mod')
    this.errorColorFondoCurso1 = document.getElementById('errorColorFondoCurso1Mod')
    this.errorColortextoCurso1 = document.getElementById('errorColortextoCurso1Mod')
    this.errorProfesorCurso1 = document.getElementById('errorProfesorCurso1Mod')
    this.errorCodigoCurso2 = document.getElementById('errorCodigoCurso2Mod')
    this.errorColorFondoCurso2 = document.getElementById('errorColorFondoCurso2Mod')
    this.errorColortextoCurso2 = document.getElementById('errorColorTextoCurso2Mod')
    this.errorProfesorCurso2 = document.getElementById('errorProfesorCurso2Mod')

   


    this.botonMod = document.getElementById('btnAnadirModificarCiclo')
    
    this.botonCancelar = document.getElementById('btnCancelarModificarCiclo')

    

    // Asociamos eventos
    this.botonMod.addEventListener("click", this.modificarCiclo.bind(this))///

    
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

  cargarDatos(ciclo) {
   this.ocultarErrores()
    this.ciclo = ciclo;
    this.cursoPrimero= null;
    this.cursoSegundo= null;


  // Grado
  if (ciclo.grado === "Grado Medio") {
    document.getElementById('gradoMedioMod').checked = true;
  } else if (ciclo.grado === "Grado Superior") {
    document.getElementById('gradoSuperiorMod').checked = true;
  }

  this.inputNombre.value = ciclo.nombre.trim();
  this.inputSiglas.value = ciclo.siglas.trim();

  // Limpiar selectores de profesores
  this.selectProfesorPrimero.innerHTML = '';
  this.selectProfesorSegundo.innerHTML = '';

  // Obtener profesores y cursos en paralelo
  Promise.all([
    this.controlador.getProfesores(),
    this.controlador.getCursosByCiclo(ciclo.id)
  ]).then(([profesores, cursos]) => {
    // Ordenar profesores
    profesores.sort((a, b) =>
      a.apellidos.toLowerCase().localeCompare(b.apellidos.toLowerCase())
    );

    // Crear radios para ambos cursos
    profesores.forEach(profesor => {
      // Primero
      const input1 = document.createElement('input');
      input1.type = 'radio';
      input1.name = 'tutorPrimeroSeleccionado';
      input1.value = profesor.id;
      const label1 = document.createElement('label');
      label1.textContent = `${profesor.apellidos}, ${profesor.nombre}`;
      label1.prepend(input1);
      const div1 = document.createElement('div');
      div1.appendChild(label1);
      this.selectProfesorPrimero.appendChild(div1);

      // Segundo
      const input2 = document.createElement('input');
      input2.type = 'radio';
      input2.name = 'tutorSegundoSeleccionado';
      input2.value = profesor.id;
      const label2 = document.createElement('label');
      label2.textContent = `${profesor.apellidos}, ${profesor.nombre}`;
      label2.prepend(input2);
      const div2 = document.createElement('div');
      div2.appendChild(label2);
      this.selectProfesorSegundo.appendChild(div2);
    });
    // Rellenar datos del curso
    cursos.forEach(curso => {
      const colorFondo = curso.color_fondo?.slice(1) || "";
      const colorLetra = curso.color_letra?.slice(1) || "";
      
      if (curso.codigo.startsWith('1')) {
        this.cursoPrimero = curso
        this.inputCodigoCursoPrimero.value = curso.codigo;
        this.colorFondoCurso1.value = colorFondo;
        this.colorTextoCurso1.value = colorLetra;

        const input = this.selectProfesorPrimero.querySelector(
          `input[type="radio"][value="${curso.id_profesor}"]`
        );
        if (input) input.checked = true;
        this.crearEjemploPrimero()

      } else if (curso.codigo.startsWith('2')) {
        this.cursoSegundo = curso;
        this.inputCodigoCursoSegundo.value = curso.codigo;
        this.colorFondoCurso2.value = colorFondo;
        this.colorTextoCurso2.value = colorLetra;

        const input = this.selectProfesorSegundo.querySelector(
          `input[type="radio"][value="${curso.id_profesor}"]`
        );
        if (input) input.checked = true;
        this.crearEjemploSegundo()
      }
    });
  });
    
  
  
  }

  /**
   * Realiza el alta de un alumno.
   */
    modificarCiclo() {
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
          id: this.ciclo.id,
          idCursoPrimero: this.cursoPrimero.id_curso,
          idCursoSegundo: this.cursoSegundo.id_curso
        }
        if(this.comprobacion()){
          this.controlador.modificarCiclo(ciclo)
        this.limpiarCampos()
          this.cancelar()
        }

        
        
      //}
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
      this.inputGradoMedio.checked = false;
      this.inputGradoSuperior.checked = false;
      this.divEjemploColorPrimerCurso.innerHTML = ""
      this.divEjemploColorSegundoCurso.innerHTML = ""
      if (this.selectProfesorPrimero) this.selectProfesorPrimero.selectedIndex = 0;
      if (this.selectProfesorSegundo) this.selectProfesorSegundo.selectedIndex = 0;

      
      const tutorPrimeroSeleccionado = document.querySelector('input[name="tutorPrimeroSeleccionado"]:checked');
      if (tutorPrimeroSeleccionado) tutorPrimeroSeleccionado.checked = false;

      const tutorSegundoSeleccionado = document.querySelector('input[name="tutorSegundoSeleccionado"]:checked');
      if (tutorSegundoSeleccionado) tutorSegundoSeleccionado.checked = false;
          this.ocultarErrores()
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

}
