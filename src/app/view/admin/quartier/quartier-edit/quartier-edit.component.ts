import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

import {QuartierService} from "../../../../controller/service/quartier.service";
import {Quartier} from "../../../../controller/model/quartier.model";

@Component({
    selector: 'app-quartier-edit',
    templateUrl: './quartier-edit.component.html',
    styleUrls: ['./quartier-edit.component.scss']
})
export class QuartierEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: QuartierService) {
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
        this.selected = new Quartier();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Quartier {
        return this.service.selected;
    }

    set selected(value: Quartier) {
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

    get items(): Array<Quartier> {
        return this.service.items;
    }

    set items(value: Array<Quartier>) {
        this.service.items = value;
    }


}