/**
 Vista con el alta de alumno.
 **/
 import { Vista } from './vista.js'

 export class VistaAltaActividad extends Vista{
   /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
    **/
   constructor (controlador, base) {
     super(controlador)
     this.base = base
 
     // Cogemos referencias a los elementos del interfaz
     this.inputTitulo = document.getElementById('tituloActividad')
     this.inputDescripcion = document.getElementById('descripcionActividad')
     this.selectModulo = document.getElementById('selectModuloActividad')
 
     this.botonAlta = document.getElementById('btnAnadirAltaActividad')
     this.botonLimpiar = document.getElementById('btnLimpiarAltaActividad')
     this.botonCancelar = document.getElementById('btnCancelarAltaActividad')
 
     this.errorTitulo = document.getElementById('errorNombreActividad')
     this.errorDescripcion = document.getElementById('errorApellidosAlumno')
     this.errorModulo = document.getElementById('errorModuloActividad')
 
     // Asociamos eventos
     this.botonAlta.addEventListener("click", this.altaActividad.bind(this))
     this.botonLimpiar.addEventListener("click", this.limpiarCampos.bind(this))
     this.botonCancelar.addEventListener("click", this.cancelar.bind(this))
 
     // Ejecutar metodos necesarios
 
   }
 
   /**
    * Realiza el alta de una actividad.
    */
     altaActividad() {
       if (this.comprobacion()) {
         const actividad = {
           titulo: this.inputTitulo.value.trim(),
           descripcion: this.inputDescripcion.value.trim(),   
         }
         actividad.modulos= []
         for (const iModulo of document.querySelectorAll('input[data-idModulo]')) {
           if (iModulo.checked) { actividad.modulos.push(iModulo.getAttribute('data-idModulo')) }
         }


         this.controlador.altaActividad(actividad)
         this.limpiarCampos()
         this.cancelar()
       }
     }
 
   /**
    * Comprueba que los campos del formulario estén rellenos correctamente.
    */
     comprobacion() {
       let isValid = true
       const regex = /^[a-zA-Z\s]+$/
 
       if (this.inputTitulo.value === '' || this.inputTitulo.value === null ||
           !regex.test(this.inputTitulo.value)){
           this.errorTitulo.style.display = 'block'
           isValid = false;
       } else {
           this.errorTitulo.style.display = 'none'
       }
       
        let modulos = []
       for (const iModulo of document.querySelectorAll('input[data-idModulo]')) {
         if (iModulo.checked) { modulos.push(iModulo.getAttribute('data-idModulo')) }
       }

       if (modulos.length === 0) {
        this.errorModulo.style.display = 'block'
        isValid = false;
       } else {
        this.errorModulo.style.display = 'none'
       }
 
       if (isValid === false) {return false;}
       return true;
     }
 
     /**
      * Limpiar los campos del formulario.
      */
     limpiarCampos() {
       this.inputTitulo.value = ''
       this.inputDescripcion.value = ''
       document.querySelectorAll('input[data-idModulo]').forEach(checkbox => {
        checkbox.checked = false;
        });
        
       this.ocultarErrores()
     }
 
     /**
      * Vuelve a la vista de gestión de actividades.
      */
     cancelar() {
       this.controlador.mostrarGestionActividades()
     }
 
   /**
    * Oculta los errores de los campos del formulario.
    */
     ocultarErrores() {
       this.errorTitulo.style.display = 'none'
       this.errorDescripcion.style.display = 'none'
       this.errorModulo.style.display = 'none'
     }
 
   /**
    * Carga los datos de los cursos en el select.
    * @param modulos Lista de modulos.
    */
   cargarDatos(modulos) {
     // Limpiar las opciones existentes del select
     this.selectModulo.innerHTML = '';
 
     // Recorrer los cursos y agregar opciones al select
     for(let i = 0; i < modulos.length; i++){

       const div = document.createElement('div')
        this.selectModulo.appendChild(div)
        const input = document.createElement('input')
          div.appendChild(input)
          input.setAttribute('type', 'checkbox')
          input.setAttribute('data-idModulo',  modulos[i].id)
          const label = document.createElement('label')
          div.appendChild(label)
          label.textContent =  modulos[i].codigo + '. ' +  modulos[i].titulo
          
     }
   }
 }
 