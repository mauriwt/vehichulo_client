
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AlertasService } from './alertas.service'

@Injectable()
export class ObservableService {

    private static headersJSON = new Headers({ 'Content-Type': 'application/json'});
    private headersFormData = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private credentials = true;
    constructor(private http: Http, private alerta: AlertasService) { }


    public setHeaders(token){
        console.log("Setenado token : "+ token);
        
        let headers = { 'Content-Type': 'application/json', 'Authorization': token};
        ObservableService.headersJSON = new Headers(headers);
    }

    public getUrlServicioGet(servicio: string) {
        return this.http.get(servicio, {headers: ObservableService.headersJSON , withCredentials: this.credentials })
            .map(response => {
                if(response.text() ==  "")
                    return "";
                return response.json();
            })
            .catch(err => this.alerta.mostrarAlertaErrorObservable(err));
    }

    public getUrlServicioPost(servicio: string, objeto: any) {
        console.log(ObservableService.headersJSON);
        
        return this.http.post(servicio,
            JSON.stringify(objeto), { headers: ObservableService.headersJSON , withCredentials: this.credentials})
            .map(response => {
                if(response.text() ==  "")
                    return "";
                return response.json();
            })
            .catch(err => this.alerta.mostrarAlertaErrorObservable(err));
    }

    public getUrlServicioPut(servicio: string, objeto: any) {
        return this.http.put(servicio,
            JSON.stringify(objeto), { headers: ObservableService.headersJSON ,  withCredentials: this.credentials})
            .map(response => {
                if(response.text() ==  "")
                    return "";
                return response.json();
            })
            .catch(err => this.alerta.mostrarAlertaErrorObservable(err));
    }

    public getUrlServicioDelete(servicio: string) {
        return this.http.delete(servicio, { headers: ObservableService.headersJSON , withCredentials: this.credentials })
            .map(response => {
                if(response.text() ==  "")
                    return "";
                return response.json();
            })
            .catch(err => this.alerta.mostrarAlertaErrorObservable(err));
    }

    public getUrlServicioPostFormData(servicio: string, objeto: any) {
        return this.http.post(servicio,
            this.generateUrlParams(objeto), { headers: this.headersFormData, withCredentials: this.credentials })
            .catch(err => this.alerta.mostrarAlertaErrorObservable(err));
    }

    public getUrlServicioPATCH(servicio: string) {
        console.log(servicio);
        return this.http.patch(servicio, { headers: ObservableService.headersJSON , withCredentials: this.credentials })
            .map(response => {
                if(response.text() ==  "")
                    return "";
                return response.json();
            })
            .catch(err => this.alerta.mostrarAlertaErrorObservable(err));
    }

    private generateUrlParams(object) {
        let res: URLSearchParams = new URLSearchParams();
        for (let o in object) {
        res.append(o, object[o]);
        }
        console.log(res);
        return res;
    }
}