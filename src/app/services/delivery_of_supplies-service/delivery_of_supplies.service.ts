import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeliveryOfSupplies } from "src/app/models/deliveryOfSupplies";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeliveryOfSuppliesService {
    /**
       * external api call
       * @const environment stores the external API base URL
       */
    private API_URL = `${environment.api_url}`;
    constructor(private _http: HttpClient) { }

    createDeliveryOfSupplies(deliveries: DeliveryOfSupplies[]): Observable<boolean> {
        return this._http.post<boolean>(`${this.API_URL}/delivery`, deliveries);
    }
}