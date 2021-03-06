import { Component, OnInit, ɵConsole } from '@angular/core';
import { CrucesService } from 'src/app/servicios/cruces.service';
import { PersonasService } from 'src/app/servicios/personas.service';
import { DatosGeneralesPersona } from 'src/app/compartido/interfaces/datos-generales-persona';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-monitor-seguimiento',
  templateUrl: './monitor-seguimiento.component.html',
  styleUrls: ['./monitor-seguimiento.component.scss']
})
export class MonitorSeguimientoComponent implements OnInit {

  constructor(private cruces: CrucesService, private personass: PersonasService) { }
  fichas: string[] = ['ficha0', 'ficha100', 'ficha200', 'ficha300', 'medicamentos','notiweb']
  page_number: number = 0
  page_size: number = 10000
  pages: number[]
  dataPie = {}
  contador = {}
  COD_IPRESS
  public tipo_ambito : string ;
  public codigo_ambito : string;
  Desde: Date;
  Hasta: Date;
  flgBuscarFecha : boolean;
  public flgMostrarFiltroAmbito : boolean; 
  public flgSinIpress : boolean;
  public flgBuscarEnAmbito : boolean;
  public filtroDni : string;


  ngOnInit(): void {
    this.fichas = ['ficha0', 'ficha100', 'ficha200', 'ficha300', 'medicamentos','notiweb']
    this.tipo_ambito = localStorage.getItem("tipo_ambito");
    this.codigo_ambito = localStorage.getItem("codigo_ambito");
    this.flgSinIpress = false;
    this.flgBuscarEnAmbito = false;
    this.flgBuscarFecha = true;
    this.Hasta = new Date();
    this.Desde = new Date(this.Hasta.getFullYear(),this.Hasta.getMonth()-1, this.Hasta.getDate())

    if(this.tipo_ambito=="REGION" || this.tipo_ambito == "SUBREGION"  || this.tipo_ambito == "RED"){
      this.flgMostrarFiltroAmbito = true;
    }

  }
  resultadosCruces: any[] = []
  resultadosdni: any[]
  resultados: any[] = []
  resultadosfiltrados: any[] = []
  FichasSeleccionadas: string[] = []
  CargarFichaPrimaria() {

  }

  selecionoIpess(e) {
    this.COD_IPRESS = e
    console.log("Ipress Seleccionada")
    console.log(this.COD_IPRESS)
  }


  async Comparar() {
    console.log('datos')
    let res = await this.cruces.buscarDni().toPromise()


  }
  generarPaginas() {
    this.pages = []
    let countpages = this.resultados.length / this.page_size
    for (let index = 0; index < countpages; index++) {

      this.pages.push(index + 1)


    }


  }
  generarDatosGrafico() {

    this.FichasSeleccionadas.map((ficha) => {
      this.contador[ficha] = { existe: 0, noexiste: 0 }

    })

    this.resultadosfiltrados.map((resultado) => {


      this.FichasSeleccionadas.map((ficha) => {

        if (resultado[ficha].existe == true) {
          this.contador[ficha].existe = this.contador[ficha].existe + 1
        } else {
          this.contador[ficha].noexiste = this.contador[ficha].noexiste + 1
        }

      })

    })


  }

  asignarDatosGrafico() {
    this.FichasSeleccionadas.map((ficha) => {
      this.dataPie[ficha] = {

        labels: ['Tiene', 'No Tiene'],
        datasets: [
          {
            backgroundColor: ['blue', 'red'],
            data: [this.contador[ficha].existe, this.contador[ficha].noexiste],
            label: ficha,


          }


        ],
        plugin:[ChartDataLabels],
        options:{

          plugins: {
            datalabels: {
              anchor: 'start',
              align: 'start',
              formatter: Math.round,
              font: {
                weight: 'bold'
              }
            }
          },

          showTooltips: false,
          onAnimationComplete: function () {
      
              var ctx = this.chart.ctx;
              ctx.font = this.scale.font;
              ctx.fillStyle = this.scale.textColor
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
      
              this.datasets.forEach(function (dataset) {
                  dataset.bars.forEach(function (bar) {
                      ctx.fillText(bar.value, bar.x, bar.y - 5);
                  });
              })
          }
        }
       


      }


    })


  }
  
  devolverCrucesDnis() {
    //obtener ipress seleccionada
    let ipress = this.COD_IPRESS
    console.log("CODIGO ==== Ipres")
    console.log(ipress)
    if(ipress == undefined) ipress = 'todos'
    if(this.flgSinIpress) ipress = '0'
    if(this.flgBuscarEnAmbito) ipress = 'todos'

    this.cruces.devolverCruces(ipress,this.tipo_ambito,this.codigo_ambito,this.flgBuscarFecha,this.Desde.toLocaleDateString("fr-CA"),this.Hasta.toLocaleDateString("fr-CA")).subscribe(respuesta => {
      
      // eliminar duplicados
    let docs = respuesta.reduce((ac, cv)=>{
      if(ac.map(a=>a.Nro_Documento).indexOf(cv.Nro_Documento)===-1){
        ac.push(cv)
      }
      return ac
    }, [])
      
      this.resultados = docs
      this.resultadosfiltrados = docs.slice() //copiar por valor
      this.generarPaginas()
      this.generarDatosGrafico()
      this.asignarDatosGrafico()
    })

  }

  seleccionarPagina(e) {

    this.page_number = e - 1
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.generarDatosGrafico()
    this.asignarDatosGrafico()
  }

  selectData(event) {
    let elementofiltra: any = {}

    if (event.element._view.label == 'Tiene') {
      elementofiltra.existe = true

    } else {
      elementofiltra.existe = false

    }
    elementofiltra.ficha = event.element._view.datasetLabel
    console.log(elementofiltra)

    this.fitrarSegunSelecGrafico(elementofiltra)
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset
  }


  fitrarSegunSelecGrafico(elementofiltra) {

    let nuevofiltrado = []
    this.resultadosfiltrados.map((resul) => {
      let elementf: any = {}

      if (resul[elementofiltra.ficha].existe == elementofiltra.existe) {

        elementf = resul
        nuevofiltrado.push(elementf)
      }

    })

    this.resultadosfiltrados = nuevofiltrado
    this.generarDatosGrafico()
    this.asignarDatosGrafico()

  }

  filtrarSegunDNI(e){
   
    if(this.filtroDni!=null && this.filtroDni != ""){
      this.resultadosfiltrados = this.resultadosfiltrados.filter(r=>r.Nro_Documento==this.filtroDni);
      
    } else{
      //copiar por referencia
      this.resultadosfiltrados = this.resultados.slice();
    }
    this.generarDatosGrafico()
    this.asignarDatosGrafico()
    
  }

  limpiarFiltros(e){
    this.filtroDni = "";
    this.filtrarSegunDNI(e);
  }



  Exportar_Excel(){
    //preparar para la exportacion
    //console.log(this.resultadosfiltrados);
    let datos : any = []
    this.resultadosfiltrados.forEach(r=>{
      let fila : any = {
        numero: r.numero,
        Nro_Documento: r.Nro_Documento,
        Apellidos_Nombres: r.Apellidos_Nombres,        
        fecha_actualizacion : new Date(r.fecha_actual).toLocaleDateString("es-Pe"),
        ultima_ficha_actualizada : r.ultima_ficha_actualizada
      }

      if(this.FichasSeleccionadas.indexOf("ficha0") >= 0){
        fila.ficha0 = r.ficha0.existe ? "SI" : "NO";
      }
      if(this.FichasSeleccionadas.indexOf("ficha100") >= 0){
        fila.ficha100 = r.ficha100.existe ? "SI" : "NO";
      }
      if(this.FichasSeleccionadas.indexOf("ficha200") >= 0){
        fila.ficha200 = r.ficha200.existe ? "SI" : "NO";
      }
      if(this.FichasSeleccionadas.indexOf("ficha300") >= 0){
        fila.ficha300 = r.ficha300.existe ? "SI" : "NO";
      }
      if(this.FichasSeleccionadas.indexOf("medicamentos") >= 0){
        fila.medicamentos = r.medicamentos.existe ? "SI" : "NO";
      }
      if(this.FichasSeleccionadas.indexOf("notiweb") >= 0){
        fila.notiweb = r.notiweb.existe ? "SI" : "NO";
      }

      datos.push(fila)
    })

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(datos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "resultado");
  });

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
}


}
