import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

import {AlbumService} from "../../../../controller/service/album.service";
import {Album} from "../../../../controller/model/album.model";

@Component({
    selector: 'app-album-edit',
    templateUrl: './album-edit.component.html',
    styleUrls: ['./album-edit.component.scss']
})
export class AlbumEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: AlbumService) {
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
                    detail: 'Album est modifié',
                    life: 3000
                });
            });
        }
        this.editDialog = false;
        this.selected = new Album();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Album {
        return this.service.selected;
    }

    set selected(value: Album) {
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

    get items(): Array<Album> {
        return this.service.items;
    }

    set items(value: Array<Album>) {
        this.service.items = value;
    }


}