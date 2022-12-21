import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";


import {AlbumService} from "../../../../controller/service/album.service";
import {Album} from "../../../../controller/model/album.model";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AlbumListComponent implements OnInit{
  cols: any[];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
              private service: AlbumService) {
  }

  ngOnInit(): void {
    this.initCol();
    this.service.findAll().subscribe(data => this.items = data);
  }

  public delete(selected: Album) {
    this.selected = selected;
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer ' + selected.photo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteById().subscribe(data => {
          this.items = this.items.filter(val => val.id !== this.selected.id);
          this.selected = new Album();
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Album est supprimé',
            life: 3000
          });
        });
      }
    });
  }
  public deleteMultiple() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les albums sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       // this.service.deleteMultipleById().subscribe(data =>{
          this.service.deleteMultipleIndexById();
          this.selectes = null;
          this.messageService.add({
            severity: 'success',
            summary: 'succès',
            detail: 'Albums est supprimé',
            life: 3000
          });
      //  });
      }
    });
  }
  public openCreate() {
    this.selected = new Album();
    this.submitted = false;
    this.createDialog = true;
  }

  public edit(album: Album) {
    this.selected = {...album};
    this.editDialog = true;
  }
  public view(album: Album) {
    this.selected = {...album};
    this.viewDialog = true;
  }

  private initCol() {
    this.cols = [
      {field: 'id', header: 'Id'},
      {field: 'photo', header: 'Photo'}
    ];
  }

  get selected(): Album {
    return this.service.selected;
  }

  set selected(value: Album) {
    this.service.selected = value;
  }

  get items(): Array<Album> {
    return this.service.items;
  }

  set items(value: Array<Album>) {
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

  get selectes(): Array<Album> {
    return this.service.selectes;
  }

  set selectes(value: Array<Album>) {
    this.service.selectes = value;
  }


}