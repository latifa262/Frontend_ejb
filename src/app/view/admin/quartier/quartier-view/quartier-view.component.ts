import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {QuartierService} from "../../../../controller/service/quartier.service";
import {Quartier} from "../../../../controller/model/quartier.model";

@Component({
  selector: 'app-quartier-view',
  templateUrl: './quartier-view.component.html',
  styleUrls: ['./quartier-view.component.scss']
})
export class QuartierViewComponent implements OnInit{


  constructor(private messageService: MessageService, private service: QuartierService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Quartier {
    return this.service.selected;
  }

  set selected(value: Quartier) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }


}