import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AlbumService} from "../../../../controller/service/album.service";
import {Album} from "../../../../controller/model/album.model";

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit{


  constructor(private messageService: MessageService, private service: AlbumService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Album {
    return this.service.selected;
  }

  set selected(value: Album) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }


}