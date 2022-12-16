import {Injectable} from '@angular/core';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Commande} from '../model/commande.model';
import {Complexe} from '../model/complexe.model';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ComplexeService {

    //private url = environment.baseUrl + 'commande/';
    private url='https://fit-foot.herokuapp.com/api/complexes';
    private _items: Array<Complexe>;
    private _selected: Complexe;
    private _selectes: Array<Complexe>;

    private _createDialog: boolean;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;


    params = new HttpParams({
        fromObject: { nom : 'nom',
            capaciteParEquipe : 'capaciteParEquipe'
        }
    });

    //headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {
    // }
    constructor(private http: HttpClient) {}

    public findAll(): Observable<Array<Complexe>> {
        return this.http.get<Array<Complexe>>(this.url);
    }
    //Afficher les complexe
    getPosts() {
        return this.http.get(this.url);
    }
    //Ajout d'un complexe
    postData(data: any): Observable<any> {
        return this.http.post(`${this.url}`, data)
    }
    //supprimer complexe
    deleteData(id: string): Observable<any> {
        return this.http.delete(`${this.url}/${id}`)
    }

    public saveTerrain(model: any): Observable<any> {
        return this.http.post(this.url, model);
    }

    public save(): Observable<Complexe> {
        return this.http.post<Complexe>(this.url, this.selected);
    }

    public edit(): Observable<Complexe> {
        return this.http.put<Complexe>(this.url, this.selected);
    }

    /*public deleteByReference(): Observable<number> {
        return this.http.delete<number>(this.url + 'reference/' + this.selected.reference);
    }*/

    public deleteMultipleByReference(): Observable<number> {
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

    public deleteMultipleIndexById() {
        for (const item of this.selectes){
            this.deleteIndexById(item.id);
        }
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
