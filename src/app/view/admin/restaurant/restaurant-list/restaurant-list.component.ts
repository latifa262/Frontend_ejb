import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";


import {RestaurantService} from "../../../../controller/service/restaurant.service";
import {Restaurant} from "../../../../controller/model/restaurant.model";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RestaurantListComponent implements OnInit{
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: RestaurantService) {
  }

  ngOnInit(): void {
   
  }

  public delete(selected: Restaurant) {
    // this.selected = selected;
    // this.confirmationService.confirm({
    //   message: 'Etes-vous sûr que vous voulez supprimer ' + selected.nom + '?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.service.deleteById().subscribe(data => {
    //       this.items = this.items.filter(val => val.id !== this.selected.id);
    //       this.selected = new Restaurant();
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'succès',
    //         detail: 'Complexe est supprimé',
    //         life: 3000
    //       });
    //     });
    //   }
    // });
  }
  public deleteMultiple() {
    // this.confirmationService.confirm({
    //   message: 'Êtes-vous sûr de vouloir supprimer les Complexes sélectionnés?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //    // this.service.deleteMultipleById().subscribe(data =>{
    //       this.service.deleteMultipleIndexById();
    //       this.selectes = null;
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'succès',
    //         detail: 'Complexes est supprimé',
    //         life: 3000
    //       });
    //   //  });
    //   }
    // });
  }
  public openCreate() {
    this.selected = new Restaurant();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(restaurant: Restaurant) {
    // this.selected = {...Restaurant};
    // this.editDialog = true;
  }
  public view(restaurant: Restaurant) {
    // this.selected = {...Restaurant};
    // this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'nom', header: 'Nom'},
      {field: 'longitude', header: 'Longitude'},
      {field: 'latitude', header: 'Latitude'}
    ];
  }

  get selected(): Restaurant {
    return this.service.selected;
  }

  set selected(value: Restaurant) {
    this.service.selected = value;
  }

  get items(): Array<Restaurant> {
    return this.service.items;
  }

  set items(value: Array<Restaurant>) {
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

  get selectes(): Array<Restaurant> {
    return this.service.selectes;
  }

  set selectes(value: Array<Restaurant>) {
    this.service.selectes = value;
  }


}
