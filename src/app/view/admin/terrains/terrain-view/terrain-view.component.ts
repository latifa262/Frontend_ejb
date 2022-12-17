import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {TerrainService} from "../../../../controller/service/terrain.service";
import {Terrain} from "../../../../controller/model/terrain.model";


@Component({
    selector: 'app-terrain-view',
    templateUrl: './terrain-view.component.html',
    styleUrls: ['./terrain-view.component.scss']
})
export class TerrainViewComponent implements OnInit {


    constructor(private messageService: MessageService, private service: TerrainService) {
    }

    ngOnInit(): void {
        console.log("entred to view component");
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get selected(): Terrain {
        return this.service.selected;
    }

    set selected(value: Terrain) {
        this.service.selected = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }


}
