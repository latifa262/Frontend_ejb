import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Reservation} from '../model/reservation.model';
import { Observable} from 'rxjs';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView,} from 'angular-calendar';
import {CommonModule,DatePipe} from '@angular/common';
import { id } from 'date-fns/locale';

@Injectable()
export class ReservationService {

    configUrl = 'http://localhost:8080/api/reservations';

    constructor(private http: HttpClient,public datepipe: DatePipe) { }
    
/////////////////////
    getReservation() :Observable<Reservation[]>{

       return this.http.get<Reservation[]>(this.configUrl);
    }
/////////////////////////
private _selected: Reservation;
id;
    addReservation(event:CalendarEvent){
        
       let event1:Date = new Date(this.datepipe.transform(event.start, 'yyyy-MM-ddTHH:mm:ss.SSSSSS'));
       let end1 :Date = new Date(this.datepipe.transform(event.end, 'yyyy-MM-ddTHH:mm:ss.SSSSSS'));

        return this.http.post<Reservation>(this.configUrl,{heureDebut:event1,heureFin:end1}).subscribe(data => {
            this.id = data.id;
        });
     }
/////////////////////////    
     deleteReservation(id){

        return this.http.delete(this.configUrl+'/'+id);
    }

//////////////////////////

updateReservation(event:CalendarEvent){
        
    let event1:Date = new Date(this.datepipe.transform(event.start, 'yyyy-MM-ddTHH:mm:ss.SSSSSS'));
    let end1 :Date = new Date(this.datepipe.transform(event.end, 'yyyy-MM-ddTHH:mm:ss.SSSSSS'));
    
     return this.http.put<Reservation>(this.configUrl,{heureDebut:event1,heureFin:end1}).subscribe(data => {
         this.id = data.id;
     });
  }

}
