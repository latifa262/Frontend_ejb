import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef, OnInit} from '@angular/core';
import {startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay,  isSameMonth,  addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView,} from 'angular-calendar';
import { Reservation } from '../../../controller/model/reservation.model';
import {CommonModule} from '@angular/common';

import { ReservationService } from '../../../controller/service/reservation.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}; 

@Component({
  selector: 'mwl-reservations-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
styles: [
  `
    h3 {
      margin: 0 0 10px;
    }

    pre {
      background-color: #f5f5f5;
      padding: 15px;
    }
  `,
],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  disabled: boolean;

  constructor(
    private modal: NgbModal,
    private reservationService:ReservationService) {}

  ngOnInit(){
    console.log('---------siiiiiiir-----');
    this.getAllmyReservations();
  }

//load data function  
  getAllmyReservations(){

    this.reservationService.getReservation().subscribe(
      (myDbData: Reservation[]) => {
        console.log(myDbData);
        myDbData.forEach((item)=>{
          this.events.push({
            id:item.id, 
            start:new Date(item.heureDebut.toLocaleString()),
            end:new Date(item.heureFin.toLocaleString()),
            title:'A day event',
            color: colors.red,
            actions: this.actions
          })
        });
        this.refresh.next();
      }
     );
  }

///////////////////////

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    console.log(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        /*color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },*/
      },
    ];
  }

//add function
reservation: Reservation;

reservations: Reservation[] = [];
addEventtodb(){
  /*this.reservationService.addReservation().subscribe(data => {
   this.items.push({...data});

});*/
}

get items(): Array<Reservation> {
  return this.reservationService.items;
}

set items(value: Array<Reservation>) {
  this.reservationService.items = value;
}
//////////////

//delete function
  deleteEvent(eventToDelete: CalendarEvent) {
    console.log(eventToDelete.id);
    this.reservationService.deleteReservation(eventToDelete.id).subscribe(response => {});
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
//////////////////////////

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}