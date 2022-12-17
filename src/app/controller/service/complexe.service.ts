import {Injectable} from '@angular/core';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';


import {Complexe} from '../model/complexe.model';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ComplexeService {

    private url = environment.baseUrl+'complexes';
    private _items: Array<Complexe>;
    private _selected: Complexe;
    private _selectes: Array<Complexe>;

    private _createDialog: boolean;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {
    // }
    constructor(private http: HttpClient) {
    }

    public findAll(): Observable<Array<Complexe>> {
        console.log("entred to findAll");
        return this.http.get<Array<Complexe>>(this.url);
    }

    public save(): Observable<Complexe> {
        return this.http.post<Complexe>(this.url, this.selected);
    }

    public edit(): Observable<Complexe> {
        return this.http.put<Complexe>(this.url + '/' + this.selected.id, this.selected);
    }

    public deleteById(): Observable<number> {
        return this.http.delete<number>(this.url + '/' + this.selected.id);
    }

    public deleteMultipleById(): Observable<number> {
        return this.http.post<number>(this.url + 'delete-multiple-by-reference' , this.selectes);
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

    public deleteMultipleIndexById(){
        for (const item of this.selectes){
            this.deleteIndexById(item.id);
            console.log('entred to delet multiple');
            console.log(item.id);
            this.deleteByIdselectedItems(item.id).subscribe(
                data=>{
                    console.log("deleted"+item.id);
                },error => {
                    console.log(error);
                }
            )

        }
    }
    public deleteByIdselectedItems(id:number): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }

    get items(): Array<Complexe> {
        return this._items;
    }

    set items(value: Array<Complexe>) {
        this._items = value;
    }

    get selected(): Complexe {
        return this._selected;
    }

    set selected(value: Complexe) {
        this._selected = value;
    }

    get selectes(): Array<Complexe> {
        return this._selectes;
    }

    set selectes(value: Array<Complexe>) {
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
