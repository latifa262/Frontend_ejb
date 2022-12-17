import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";


import {ComplexeService} from "../../../../controller/service/complexe.service";
import {Complexe} from "../../../../controller/model/complexe.model";

@Component({
  selector: 'app-complexe-list',
  templateUrl: './complexe-list.component.html',
  styleUrls: ['./complexe-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ComplexeListComponent implements OnInit{
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: ComplexeService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.service.findAll().subscribe(data => this.items = data);
  }

  public delete(selected: Complexe) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer ' + selected.nom + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteById().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new Complexe();
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Complexe est supprimé',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les Complexes sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.service.deleteMultipleById().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Complexes est supprimé',
            life: 3000
          });
      //  });
      }
    });
  }
  public openCreate() {
    this.selected = new Complexe();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(complexe: Complexe) {
    this.selected = {...complexe};
    this.editDialog = true;
  }
  public view(complexe: Complexe) {
    this.selected = {...complexe};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'nom', header: 'Nom'},
      {field: 'longitude', header: 'Longitude'},
      {field: 'latitude', header: 'Latitude'}
    ];
  }

  get selected(): Complexe {
    return this.service.selected;
  }

  set selected(value: Complexe) {
    this.service.selected = value;
  }

  get items(): Array<Complexe> {
    return this.service.items;
  }

  set items(value: Array<Complexe>) {
    this.service.items = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get createDialog(): boolean {
    return this.service.createDialog;
  }

  set createDialog(value: boolean) {
    this.service.createDialog = value;
  }

  get editDialog(): boolean {
    return this.service.editDialog;
  }

  set editDialog(value: boolean) {
    this.service.editDialog = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }

  get selectes(): Array<Complexe> {
    return this.service.selectes;
  }

  set selectes(value: Array<Complexe>) {
    this.service.selectes = value;
  }


}
