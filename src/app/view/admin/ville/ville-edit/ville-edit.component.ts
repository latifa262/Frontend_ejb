import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

import {VilleService} from "../../../../controller/service/ville.service";
import {Ville} from "../../../../controller/model/ville.model";

@Component({
    selector: 'app-ville-edit',
    templateUrl: './ville-edit.component.html',
    styleUrls: ['./ville-edit.component.scss']
})
export class VilleEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: VilleService) {
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
                    detail: 'Ville est modifié',
                    life: 3000
                });
            });
        }
        this.editDialog = false;
        this.selected = new Ville();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Ville {
        return this.service.selected;
    }

    set selected(value: Ville) {
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

    get items(): Array<Ville> {
        return this.service.items;
    }

    set items(value: Array<Ville>) {
        this.service.items = value;
    }


}