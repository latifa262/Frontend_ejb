import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {TerrainService} from "../../../../controller/service/terrain.service";
import {Terrain} from "../../../../controller/model/terrain.model";


@Component({
    selector: 'app-terrain-create',
    templateUrl: './terrain-create.component.html',
    styleUrls: ['./terrain-create.component.scss']
})
export class TerrainCreateComponent implements OnInit {


    constructor(private messageService: MessageService, private service: TerrainService) {
    }

    ngOnInit(): void {
    }

    public hideCreateDialog() {
        this.createDialog = false;
        this.submitted = false;
    }

    public save() {
        this.submitted = true;

        this.service.save().subscribe(data => {
            this.items.push({...data});
            this.messageService.add({
                severity: 'success',
                summary: 'succès',
                detail: 'Terrain Crée',
                life: 3000
            });
        });
        this.createDialog = false;
        this.selected = new Terrain();

    }

    get selected(): Terrain {
        return this.service.selected;
    }

    set selected(value: Terrain) {
        this.service.selected = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
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
