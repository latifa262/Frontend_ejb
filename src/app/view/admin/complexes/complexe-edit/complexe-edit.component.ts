import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

import {ComplexeService} from "../../../../controller/service/complexe.service";
import {Complexe} from "../../../../controller/model/complexe.model";

@Component({
    selector: 'app-complexe-edit',
    templateUrl: './complexe-edit.component.html',
    styleUrls: ['./complexe-edit.component.scss']
})
export class ComplexeEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: ComplexeService) {
    }

    ngOnInit(): void {
    }

    public edit() {
        this.submitted = true;
        if (this.selected.id) {
            this.items[this.service.findIndexById(this.selected.id)] = this.selected;
            this.service.edit().subscribe(data => {
                this.selected = data;
                this.messageService.add({
                    severity: 'success',
                    summary: 'succès',
                    detail: 'Complexe est modifié',
                    life: 3000
                });
            });
        }
        this.editDialog = false;
        this.selected = new Complexe();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Complexe {
        return this.service.selected;
    }

    set selected(value: Complexe) {
        this.service.selected = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get items(): Array<Complexe> {
        return this.service.items;
    }

    set items(value: Array<Complexe>) {
        this.service.items = value;
    }


}
