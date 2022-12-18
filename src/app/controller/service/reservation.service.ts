import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Reservation} from '../model/reservation.model';
import { Observable} from 'rxjs';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView,} from 'angular-calendar';

@Injectable()
export class ReservationService {

    configUrl = 'http://localhost:8080/api/reservations';

    constructor(private http: HttpClient) { }
    
/////////////////////
    getReservation() :Observable<Reservation[]>{

       return this.http.get<Reservation[]>(this.configUrl);
    }
/////////////////////////
private _selected: Reservation;

    addReservation():Observable<Reservation>{
        return this.http.post<Reservation>(this.configUrl,  this.selected);
     }
/////////////////////////    
     deleteReservation(id){

        return this.http.delete(this.configUrl+'/'+id);
    }

//////////////////////////
    get selected(): Reservation {
        return this._selected;
    }

    set selected(value: Reservation) {
        this._selected = value;
    }

    private _items: Array<Reservation>;

    get items(): Array<Reservation> {
        return this._items;
    }

    set items(value: Array<Reservation>) {
        this._items = value;
    }

}
