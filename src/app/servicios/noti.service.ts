import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Noti } from '../compartido/interfaces/noti';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotiService {

  dataEjemplo: Noti[] = [
    {
      "id": 1,
      "ano": 2.020000000000000e+003,
      "semana": 2.700000000000000e+001,
      "fecha_not": "30-06-2020",
      "diresa": "CAJAMARCA",
      "red": "CAJAMARCA",
      "microred": "NO DEFINIDA",
      "establecimiento": "CLINICA LIMATAMBO",
      "institucion": "PRIVADO",
      "clasificacion": "CONFIRMADO",
      "fecha_det": "00-00-0000",
      "nombre": "QUITO VILLANUEVA LAKSMI SARITA",
      "fecha_nac": "10-12-1998",
      "edad": 2.100000000000000e+001,
      "tipo_edad": "AÑOS",
      "sexo": "FEMENINO",
      "tipodoc": "DNI",
      "dni": '67182221',
      "telefono": 9.009333700000000e+008,
      "pais_residencia": "Peru",
      "departamento_residencia": "CAJAMARCA",
      "provincia_residencia": "CAJAMARCA",
      "residencia": "CAJAMARCA",
      "ubigeo": 6.010100000000000e+004,
      "direccion": "JR JESUS DE NAZARET 682",
      "fecha_ini": "00-00-0000",
      "hospitalizado": "NO",
      "fecha_hos": "00-00-0000",
      "aislamiento": "SI",
      "fecha_ais": "30-06-2020",
      "evolucion": "RECUPERADO",
      "fecha_def": "00-00-0000",
      "fiebre": 0.000000000000000e+000,
      "malestar": 0.000000000000000e+000,
      "tos": 0.000000000000000e+000,
      "garganta": 0.000000000000000e+000,
      "congestion": 0.000000000000000e+000,
      "respiratoria": 0.000000000000000e+000,
      "diarrea": 0.000000000000000e+000,
      "nauseas": 0.000000000000000e+000,
      "cefalea": 0.000000000000000e+000,
      "irritabilidad": 0.000000000000000e+000,
      "muscular": 0.000000000000000e+000,
      "abdominal": 0.000000000000000e+000,
      "pecho": 0.000000000000000e+000,
      "articulaciones": 0.000000000000000e+000,
      "temperatura": 3.700000000000000e+001,
      "exudado": 0.000000000000000e+000,
      "conjuntival": 0.000000000000000e+000,
      "convulsion": 0.000000000000000e+000,
      "coma": 0.000000000000000e+000,
      "disnea": 0.000000000000000e+000,
      "auscultacion": 0.000000000000000e+000,
      "rxpulmonar": 0.000000000000000e+000,
      "embarazo": 0.000000000000000e+000,
      "trimestre": 0.000000000000000e+000,
      "postparto": 0.000000000000000e+000,
      "cardiovascular": 0.000000000000000e+000,
      "diabetes": 0.000000000000000e+000,
      "hepatica": 0.000000000000000e+000,
      "neurologica": 0.000000000000000e+000,
      "inmunodeficiencia": 0.000000000000000e+000,
      "renal": 0.000000000000000e+000,
      "hepatico": 0.000000000000000e+000,
      "pulmonar": 0.000000000000000e+000,
      "cancer": 0.000000000000000e+000,
      "ocupacion": "ESTUDIANTE",
      "otra_ocupacion": "ES",
      "viajado_14": "NO",
      "pais_1": "Sin registro",
      "pais_2": "Sin registro",
      "pais_3": "Sin registro",
      "eess_14": "NO",
      "contacto_14": "DESCONOCIDO",
      "contacto_salud": 0.000000000000000e+000,
      "contacto_familiar": 0.000000000000000e+000,
      "contacto_trabajo": 0.000000000000000e+000,
      "contacto_desconocido": 0.000000000000000e+000,
      "confirmado_14": "NO",
      "entorno_salud": 0.000000000000000e+000,
      "entorno_familiar": 0.000000000000000e+000,
      "entorno_trabajo": 0.000000000000000e+000,
      "entorno_desconocido": 0.000000000000000e+000,
      "contacto_pais": "Sin registro",
      "mercado": "NO",
      "mercado_pais": "Sin registro",
      "fecha_mue": "00-00-0000",
      "fecha_res": "00-00-0000",
      "fecha_mue1": "00-00-0000",
      "fecha_res1": "00-00-0000",
      "fecha_rap": "30-06-2020",
      "muestra_rap": "MUESTRA DE SANGRE",
      "prueba_rap": "RAPIDA",
      "resultado_rap": "Ig G POSITIVO",
      "fecha_res_rap": "30-06-2020",
      "fecha_rap1": "00-00-0000",
      "asintomatico": "SI",
      "investigador": "EDUARDO GUAYAC LLAMOCTANTA",
      "usuario_reg": 2.670250900000000e+007,
      "fecha_reg": "2020-07-01 15:07:29",
      "usuario_mod": 2.670250900000000e+007,
      "fecha_mod": "2020-07-14 12:07:10"
    }
  ]

  constructor(private http: HttpClient) { }

  devolverNotiPorIdentificacion(TIPO_DOCUEMNTO: string, NRO_DOCUMENTO: string) {

    var headers = new HttpHeaders({client_id:'diresa_seguimiento',client_secret: 'WrCcm69SZOVZpUpnYuq4'});
   
    var params = new HttpParams({fromObject:{'tipodoc': TIPO_DOCUEMNTO,'dni': NRO_DOCUMENTO}})

    return this.http.get<any>(environment.urlBackendSiscovid+'fichas/getnotipordocumento',{headers,params})
  }
}
