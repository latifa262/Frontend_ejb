import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Restaurant} from '../model/restaurant.model';
import { Observable} from 'rxjs';
import {  CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView,} from 'angular-calendar';
import {CommonModule,DatePipe} from '@angular/common';
import { id } from 'date-fns/locale';

@Injectable()
export class RestaurantService {
    private url = 'http://localhost:8080/api/villes';

    private _items: Array<Restaurant>;
    private _selected: Restaurant;
    private _selectes: Array<Restaurant>;

    private _createDialog: boolean;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;
    //configUrl = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }
    public findAll(): Observable<Array<Restaurant>> {
        console.log("entred to findAll");
        return this.http.get<Array<Restaurant>>(this.url);
    }

    public save(): Observable<Restaurant> {
        return this.http.post<Restaurant>(this.url, this.selected);
    }

    public edit(): Observable<Restaurant> {
        return this.http.put<Restaurant>(this.url + '/' + this.selected.id, this.selected);
    }

    public deleteById(): Observable<number> {
        return this.http.delete<number>(this.url + '/' + this.selected.id);
    }

    public deleteMultipleById(): Observable<number> {
        return this.http.post<number>(this.url + 'delete-multiple-by-reference', this.selectes);
    }

    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes) {
            this.deleteIndexById(item.id);
            console.log('entred to delet multiple');
            console.log(item.id);
            this.deleteByIdselectedItems(item.id).subscribe(
                data => {
                    console.log("deleted" + item.id);
                }, error => {
                    console.log(error);
                }
            );

        }
    }

    public deleteByIdselectedItems(id: number): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }


    get items(): Array<Restaurant> {
        return this._items;
    }

    set items(value: Array<Restaurant>) {
        this._items = value;
    }

    get selected(): Restaurant {
        return this._selected;
    }

    set selected(value: Restaurant) {
        this._selected = value;
    }

    get selectes(): Array<Restaurant> {
        return this._selectes;
    }

    set selectes(value: Array<Restaurant>) {
        this._selectes = value;
    }


    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }


}
