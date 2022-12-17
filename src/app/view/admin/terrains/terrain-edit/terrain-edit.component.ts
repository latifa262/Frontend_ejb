import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {TerrainService} from "../../../../controller/service/terrain.service";
import {Terrain} from "../../../../controller/model/terrain.model";


@Component({
    selector: 'app-terrain-edit',
    templateUrl: './terrain-edit.component.html',
    styleUrls: ['./terrain-edit.component.scss']
})
export class TerrainEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: TerrainService) {
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
                    detail: 'Terrain est modifié',
                    life: 3000
                });
            });
        }
        this.editDialog = false;
        this.selected = new Terrain();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Terrain {
        return this.service.selected;
    }

    set selected(value: Terrain) {
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

    get items(): Array<Terrain> {
        return this.service.items;
    }

    set items(value: Array<Terrain>) {
        this.service.items = value;
    }


}
