import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {CommandeService} from "../../../../controller/service/commande.service";
import {Commande} from "../../../../controller/model/commande.model";
import {ComplexeService} from "../../../../controller/service/complexe.service";
import {Complexe} from "../../../../controller/model/complexe.model";

@Component({
  selector: 'app-complexe-view',
  templateUrl: './complexe-view.component.html',
  styleUrls: ['./complexe-view.component.scss']
})
export class ComplexeViewComponent implements OnInit{


  constructor(private messageService: MessageService, private service: ComplexeService) {
  }

  ngOnInit(): void {
  }

  public hideViewDialog() {
    this.viewDialog = false;
  }

  get selected(): Complexe {
    return this.service.selected;
  }

  set selected(value: Complexe) {
    this.service.selected = value;
  }

  get viewDialog(): boolean {
    return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
    this.service.viewDialog = value;
  }


}
