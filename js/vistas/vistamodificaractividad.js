/**
 Vista con el alta de alumno.
 **/
 import { Vista } from './vista.js'

 export class VistaModificarActividad extends Vista{
   /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
    **/
   constructor (controlador, base) {
     super(controlador)
     this.base = base
     this.actividad
 
     // Cogemos referencias a los elementos del interfaz
     this.inputTitulo = document.getElementById('tituloActividadMod')
     this.inputDescripcion = document.getElementById('descripcionActividadMod')
     this.selectModulo = document.getElementById('selectModuloActividadMod')
 
     this.botonModificar = document.getElementById('btnAnadirModActividad')
     this.botonCancelar = document.getElementById('btnCancelarModActividad')
 
     this.errorTitulo = document.getElementById('errorNombreActividadMod')
     this.errorModulo = document.getElementById('errorModuloActividadMod')
 
     // Asociamos eventos
     this.botonModificar.addEventListener("click", this.modificarActividad.bind(this))
     this.botonCancelar.addEventListener("click", this.cancelar.bind(this))
 
     // Ejecutar metodos necesarios
 
   }
 
   /**
    * Realiza el la modificacion de un actividad
    */
     modificarActividad() {
       if (this.comprobacion()) {
         const actividad = {
          id: this.actividad.id,
           titulo: this.inputTitulo.value.trim(),
           descripcion: this.inputDescripcion.value.trim(),   
           
         }
         actividad.modulos= []
         for (const iModulo of document.querySelectorAll('input[data-idModulo]')) {
           if (iModulo.checked) { actividad.modulos.push(iModulo.getAttribute('data-idModulo')) }
         }


         this.controlador.modificarActividad(actividad)
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
       this.errorModulo.style.display = 'none'
     }

     limpiarCampos() {
        this.inputTitulo.value = ''
        this.inputDescripcion.value = ''
        document.querySelectorAll('input[data-idModulo]').forEach(checkbox => {
         checkbox.checked = false;
         });
         
        this.ocultarErrores()
      }
 
   /**
    * Carga los datos de los cursos en el select.
    * @param modulos Lista de modulos.
    */
   cargarDatos(actividad, modulos) {
    this.actividad = actividad
    console.log(actividad)
    console.log(modulos)
    this.inputTitulo.value = actividad.titulo.trim();
    this.inputDescripcion.value = (actividad.descripcion ?? "").trim();
    //separar los modulos de la actividad en un array
    const modulosActividad = actividad.modulos ? actividad.modulos.split(", ").map(m => m.trim()) : [];

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
          //Marcar los que coincidan
          if(modulosActividad.includes(modulos[i].codigo)) {
            input.checked = true;  
        }
     }
   }
 }