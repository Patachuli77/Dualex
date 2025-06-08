import { Vista } from './vista.js'

/**
 Vista correspondiente al listado de convenios de la aplicación dualex.
 Sirve para dar de listar todos los convenios.
 **/
export class VistaConvenios extends Vista {
  /**
   Constructor de la clase.
   @param {Object} controlador Controlador de la vista principal.
   @param {Node} base Nodo al que se añadirá la vista principal.
   **/
  constructor (controlador, base) {
    super(controlador)
    this.base = base
    // Cogemos la referencia de la tabla de la interfaz
    this.tablaConvenios = this.base.getElementsByTagName('table')[0]
  }

  /**
   * Carga los convenios en la tabla del listado.
   */
  cargarDatosConvenios () {
    
  this.controlador.recibirDatosConvenios()
    .then(convenios => {
      // Inicializar DataTable si no está ya inicializada
      if (!$.fn.DataTable.isDataTable('#tablaConvenios')) {
        $('#tablaConvenios').DataTable();
      }

      const tabla = $('#tablaConvenios').DataTable();
      tabla.clear(); // Limpiar tabla

      if (!convenios || convenios.length === 0)
        throw new Error('No hay convenios registrados');

      // Agregar filas
      convenios.forEach(convenio => {
        tabla.row.add([
          `<span class="convenio" data-id="${convenio.id}" style="cursor:pointer">${convenio.titulo}</span>`,
          `<span>${convenio.fecha_firma}</span>`,
          `<span>${convenio.nombreEmpresa}</span>`,
          `<span>${convenio.nombreCiclo}</span>`,
          `<button class="boton-ver-convenios" data-doc="${convenio.documento}" data-titulo="${convenio.titulo}">Ver Convenio</button>`,
          `<img class="icono editar" data-id="${convenio.id}" src="iconos/edit.svg" style="cursor:pointer" title="Editar">`,
          `<img class="icono borrar" data-id="${convenio.id}" src="iconos/delete.svg" style="cursor:pointer" title="Eliminar">`
        ]);
      });

      tabla.draw();

      // Eventos
      $('#tablaConvenios').off('click', '.boton-ver-convenios').on('click', '.boton-ver-convenios', (e) => {
        const doc = $(e.currentTarget).data('doc');
        const titulo = $(e.currentTarget).data('titulo');
        this.mostrarConvenio(doc, titulo);
      });

      $('#tablaConvenios').off('click', '.icono.editar').on('click', '.icono.editar', (e) => {
        const id = $(e.currentTarget).data('id');
        this.clickEditarConvenio(id);
      });

      $('#tablaConvenios').off('click', '.icono.borrar').on('click', '.icono.borrar', (e) => {
        const id = $(e.currentTarget).data('id');
        this.clickBorrarConvenio(id);
      });

    })
    .catch(error => {
      this.controlador.gestionarError(error);
    });
}

  /**
   * Muestra el convenio en una nueva ventana.
   * @param documento codigo del documento almacenado en la base de datos.
   * @param titulo titulo del convenio.
   */
  mostrarConvenio (documento, titulo) {
    // El encabezado en B64 empieza con eso y hay que reemplzarlo
    const base64Data = documento.replace(/^data:application\/pdf;base64,/, '')

    // Crear un Blob a partir de los datos de documento
    const byteCharacters = atob(base64Data) // Decodificar los datos Base64
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/pdf' })

    // URL para el Blob
    const url = URL.createObjectURL(blob)

    // Abrir una nueva ventana y cargar el PDF en un iframe
    const newWindow = window.open()
    newWindow.document.write('<iframe src="' + url + '" width="100%" height="100%"></iframe>')
    newWindow.document.title = titulo // Titulo de la pestaña
  }

  /**
   * Maneja el evento de clic en el botón de editar un convenio.
   * @param id - {Nuber} ID del convenio a editar.
   */
  clickEditarConvenio (id) {
    this.controlador.ocultarVistas()
    this.controlador.obtenerDatosConvenioById(id)
      .catch(error => {
        console.error('Error al obtener datos de empresa:', error)
      })
  }

  /**
   * Maneja el evento de clic en el botón de borrar un convenio.
   * @param id - {Number} ID del convenio a borrar.
   */
  clickBorrarConvenio (id) {
    // Cuadro de confirmación
    const titulo = 'Confirmar borrado'
    const mensaje = '¿Realmente desea borrar este convenio?'

    this.controlador.vistaDialogo.abrir(titulo, mensaje, (confirmacion) => {
      if (confirmacion) {
        // Si el usuario confirma, proceder con las acciones de borrado
        this.controlador.borrarConvenio(id)
      }
    })
  }
}