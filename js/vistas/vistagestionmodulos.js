/**
 Vista con la gestion de los modulos.
 **/
 import { Vista } from './vista.js'

 export class VistaGestionModulos extends Vista{
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
     this.listaModulos = document.getElementById('gestionModulosListado')
     this.listaModulosSelect = document.getElementById('selectCursoListadoModulos')
 
     // Asociamos eventos
     this.listaModulosSelect.addEventListener("change",this.cargarFiltrado.bind(this))
 
     // Ejecutar metodos necesarios
 
   }
 
   /**
   * Carga los cursos en el select de la vista.
   */
   cargarFiltroCursos(){
    if (this.cursos.length === 0) {
      this.controlador.getCursos()
        .then(cursos => {

          let option1 = document.createElement('option')
          this.listaModulosSelect.appendChild(option1)
          option1.value = ''
          option1.textContent = 'Seleccione'
          option1.disabled = 'true'

          for (let i = 0; i < cursos.length; i++) {
            this.cursos[i] = cursos[i]
            let option = document.createElement('option')
            this.listaModulosSelect.appendChild(option)
            option.value = cursos[i].codigo
            option.textContent = cursos[i].codigo
          }
        })
        .catch(error => console.log(error))
    }
  }
  /**
   * Carga las actividades en el listado filtrados por modulo.
   */
  cargarFiltrado(){
    this.listaModulos.innerHTML = ''
    const curso = this.listaModulosSelect.value
    this.controlador.getModulosByCurso(curso)
      .then(modulos => {
        if (modulos.length > 0){
          for(let i=0; i<modulos.length; i++){
              this.crearDivModulo(modulos[i])
          }
        } else {
          const div = document.createElement('div')
          this.listaModulos.appendChild(div)
          div.textContent = 'No hay ninguna actividad que coincida.'
        }
      })
  }
  crearDivModulo (modulo){

    const div = document.createElement('div')
    this.listaModulos.appendChild(div)


    const spanCodigoModulo= document.createElement('span')
    div.appendChild(spanCodigoModulo)
    spanCodigoModulo.classList.add('modulo')
    spanCodigoModulo.style.color = `${modulo.color_letra} `
    spanCodigoModulo.style.backgroundColor = `${modulo.color_fondo} `
    spanCodigoModulo.textContent = `${modulo.codigo} `

    const spanModulo= document.createElement('span')
    div.appendChild(spanModulo)
    spanModulo.classList.add('modulo')
    spanModulo.textContent = `${modulo.titulo} `
    //spanActividad.addEventListener("click", () => this.modificarActividad(actividad))

    

    /*const spanIconos = document.createElement('span')
    div.appendChild(spanIconos)
    spanIconos.classList.add('iconos')

    const spanIconoBorrar = document.createElement('img')
    spanIconos.appendChild(spanIconoBorrar)
    spanIconoBorrar.classList.add('icono')
    spanIconoBorrar.src = 'iconos/delete.svg'
    spanIconoBorrar.addEventListener("click", () => this.borrarActividad(actividad.id, actividad.titulo))
*/
  }



}
 