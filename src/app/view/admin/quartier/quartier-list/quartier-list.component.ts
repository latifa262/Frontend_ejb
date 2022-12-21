import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";


import {QuartierService} from "../../../../controller/service/quartier.service";
import {Quartier} from "../../../../controller/model/quartier.model";

@Component({
  selector: 'app-quartier-list',
  templateUrl: './quartier-list.component.html',
  styleUrls: ['./quartier-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class QuartierListComponent implements OnInit{
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: QuartierService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.service.findAll().subscribe(data => this.items = data);
  }

  public delete(selected: Quartier) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer ' + selected.nom + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteById().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new Quartier();
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Quartier est supprimé',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les Quartiers sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.service.deleteMultipleById().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Quartiers est supprimé',
            life: 3000
          });
      //  });
      }
    });
  }
  public openCreate() {
    this.selected = new Quartier();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(quartier: Quartier) {
    this.selected = {...quartier};
    this.editDialog = true;
  }
  public view(quartier: Quartier) {
    this.selected = {...quartier};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'nom', header: 'Nom'}
    ];
  }

  get selected(): Quartier {
    return this.service.selected;
  }

  set selected(value: Quartier) {
    this.service.selected = value;
  }

  get items(): Array<Quartier> {
    return this.service.items;
  }

  set items(value: Array<Quartier>) {
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

  get selectes(): Array<Quartier> {
    return this.service.selectes;
  }

  set selectes(value: Array<Quartier>) {
    this.service.selectes = value;
  }


}