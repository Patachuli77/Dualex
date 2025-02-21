/**
 Vista con el alta de Actividades.
 **/
 import { Vista } from './vista.js'

 export class VistaGestionActividades extends Vista{
   /**
    Constructor de la clase.
    @param {Object} controlador Controlador de la vista.
    @param {Node} base Nodo al que se añadirá la vista.
    **/
   constructor (controlador, base) {
     super(controlador)
     this.base = base
     this.modulos = []
     // Cogemos referencias a los elementos del interfaz
     this.listaActividades = document.getElementById('gestionActividadesListado')
     this.listaActividadesSelect = document.getElementById('selectModuloListadoActividades')
 
     // Asociamos eventos
     this.listaActividadesSelect.addEventListener("change",this.cargarFiltrado.bind(this))
 
     // Ejecutar metodos necesarios
 
   }
 
   /**
   * Carga los cursos en el select de la vista.
   */
  cargarFiltroModulos(){
    if (this.modulos.length === 0) {
      this.controlador.getModulos()
        .then(modulos => {

          let option1 = document.createElement('option')
          this.listaActividadesSelect.appendChild(option1)
          option1.value = ''
          option1.textContent = 'Seleccione'
          option1.disabled = 'true'

          
          for (let i = 0; i < modulos.length; i++) {
            this.modulos[i] = modulos[i]
            let option = document.createElement('option')
            this.listaActividadesSelect.appendChild(option)
            option.value = modulos[i].codigo
            option.textContent = modulos[i].codigo
          }
        })
        .catch(error => console.log(error))
    }
  }
  /**
   * Carga las actividades en el listado filtrados por modulo.
   */
  cargarFiltrado(){
    this.listaActividades.innerHTML = ''
    const modulo = this.listaActividadesSelect.value
    this.controlador.getActividadesByModulo(modulo)
      .then(actividades => {
        if (actividades.length > 0){
          for(let i=0; i<actividades.length; i++){
              this.crearDivActividad(actividades[i])
          }
        } else {
          const div = document.createElement('div')
          this.listaActividades.appendChild(div)
          div.textContent = 'No hay ninguna actividad que coincida.'
        }
      })
  }
  crearDivActividad (actividad){

    const div = document.createElement('div')
    this.listaActividades.appendChild(div)

    const spanActividad= document.createElement('span')
    div.appendChild(spanActividad)
    spanActividad.classList.add('actividad')
    spanActividad.textContent = `${actividad.titulo} `
    spanActividad.addEventListener("click", () => this.modificarActividad(actividad))

    

    const spanIconos = document.createElement('span')
    div.appendChild(spanIconos)
    spanIconos.classList.add('iconos')

    const spanIconoBorrar = document.createElement('img')
    spanIconos.appendChild(spanIconoBorrar)
    spanIconoBorrar.classList.add('icono')
    spanIconoBorrar.src = 'iconos/delete.svg'
    spanIconoBorrar.addEventListener("click", () => this.borrarActividad(actividad.id, actividad.titulo))

  }

  /**
     * Redirige a la vista para modificar la actividad.
     * @param actividad {} Datos modificables del alumno.
     */
  modificarActividad (actividad) {
    
    this.controlador.mostrarModificarActividad(actividad, this.modulos)
  }

  /**
   * Borra la actividad seleccionado.
   * @param actividadId {Number} Identificador de la actividad.
   */
  borrarActividad(actividadId, actividadTitulo) {
    this.controlador.eliminarActividad(actividadId, actividadTitulo)
  }

}
 
 