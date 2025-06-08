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
     this.ciclos = []
     this.modulos = []

     // Cogemos referencias a los elementos del interfaz
     this.inputTitulo = document.getElementById('tituloActividadMod')
     this.inputDescripcion = document.getElementById('descripcionActividadMod')
     this.selectModulo = document.getElementById('selectModuloActividadMod')
     this.selectCiclo = document.getElementById('selectCicloActividadMod')

     this.botonModificar = document.getElementById('btnAnadirModActividad')
     this.botonCancelar = document.getElementById('btnCancelarModActividad')
 
     this.errorTitulo = document.getElementById('errorNombreActividadMod')
     this.errorModulo = document.getElementById('errorModuloActividadMod')
 
     // Asociamos eventos
     this.botonModificar.addEventListener("click", this.modificarActividad.bind(this))
     this.botonCancelar.addEventListener("click", this.cancelar.bind(this))
     this.selectCiclo.addEventListener("change",this.mostrarModulosCiclo.bind(this))
 
     // Ejecutar metodos necesarios
 
   }
  /**
    * Muestra los modulos relacionados al ciclo seleccionado
    */

  mostrarModulosCiclo() {
    const ciclo = this.selectCiclo.value
    
   this.controlador.getModulosByCiclo(ciclo)
    .then(modulos => {
      const checkboxes = this.selectModulo.querySelectorAll('input[data-idModulo]');
      
      checkboxes.forEach(checkbox => {
        checkbox.parentElement.style.display = 'none'; 
      })
      for (let i = 0; i < modulos.length; i++) {
        const modulo = modulos[i];
        const checkbox = Array.from(checkboxes).find(cb => cb.getAttribute('data-idModulo') === modulo.id.toString());
        
        
         if (checkbox) {
          checkbox.parentElement.style.display = 'block';
        }
      }
        
      })
    
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
    * Carga los datos de los ciclos en el select.
    * @param modulos Lista de modulos.
    */
   cargarDatos(actividad) {
    // Limpiar las opciones existentes del select
    this.selectCiclo.innerHTML = '';
     this.selectModulo.innerHTML = '';
    
    this.actividad = actividad
    
    this.controlador.getModulos()
    .then(modulos => {
      this.inputTitulo.value = actividad.titulo.trim();
      this.inputDescripcion.value = (actividad.descripcion ?? "").trim();
      //separar los modulos de la actividad en un array
      const modulosActividad = actividad.modulos ? actividad.modulos.split(", ").map(m => m.trim()) : [];

      
  
      // Recorrer los ciclos y agregar opciones al select
      for(let i = 0; i < modulos.length; i++){

        const div = document.createElement('div')
          this.selectModulo.appendChild(div)
          const input = document.createElement('input')
            div.appendChild(input)
            div.style.display = 'none'
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
    })
    

     this.controlador.recibirDatosCiclo()
     .then(ciclos => {
    
      let option1 = document.createElement('option')
          this.selectCiclo.appendChild(option1)
          option1.value = ''
          option1.textContent = 'Seleccione'
          option1.disabled = 'true'

          
          for (let i = 0; i < ciclos.length; i++) {
            this.ciclos[i] = ciclos[i]
            let option = document.createElement('option')
            this.selectCiclo.appendChild(option)
            option.value = ciclos[i].id
            option.textContent = ciclos[i].siglas
          }
     })


   }
 }