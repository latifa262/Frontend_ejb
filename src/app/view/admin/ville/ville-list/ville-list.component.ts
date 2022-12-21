import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";


import {VilleService} from "../../../../controller/service/ville.service";
import {Ville} from "../../../../controller/model/ville.model";

@Component({
  selector: 'app-ville-list',
  templateUrl: './ville-list.component.html',
  styleUrls: ['./ville-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class VilleListComponent implements OnInit{
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: VilleService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.service.findAll().subscribe(data => this.items = data);
  }

  public delete(selected: Ville) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer ' + selected.nom + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteById().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new Ville();
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Ville est supprimé',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les Villes sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.service.deleteMultipleById().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Villes est supprimé',
            life: 3000
          });
      //  });
      }
    });
  }
  public openCreate() {
    this.selected = new Ville();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(ville: Ville) {
    this.selected = {...ville};
    this.editDialog = true;
  }
  public view(ville: Ville) {
    this.selected = {...ville};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'nom', header: 'Nom'}
    ];
  }

  get selected(): Ville {
    return this.service.selected;
  }

  set selected(value: Ville) {
    this.service.selected = value;
  }

  get items(): Array<Ville> {
    return this.service.items;
  }

  set items(value: Array<Ville>) {
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

  get selectes(): Array<Ville> {
    return this.service.selectes;
  }

  set selectes(value: Array<Ville>) {
    this.service.selectes = value;
  }


}