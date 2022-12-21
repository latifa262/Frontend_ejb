import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {VilleService} from "../../../../controller/service/ville.service";
import {Ville} from "../../../../controller/model/ville.model";

@Component({
  selector: 'app-ville-view',
  templateUrl: './ville-view.component.html',
  styleUrls: ['./ville-view.component.scss']
})
export class VilleViewComponent implements OnInit{


  constructor(private messageService: MessageService, private service: VilleService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Ville {
    return this.service.selected;
  }

  set selected(value: Ville) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }


}