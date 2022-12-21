import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {AlbumService} from "../../../../controller/service/album.service";
import {Album} from "../../../../controller/model/album.model";


@Component({
    selector: 'app-album-create',
    templateUrl: './album-create.component.html',
    styleUrls: ['./album-create.component.scss']
})
export class AlbumCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: AlbumService) {
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
                detail: 'Album est crée',
                life: 3000
            });
        });
        this.createDialog = false;
        this.selected = new Album();

    }

    get selected(): Album {
        return this.service.selected;
    }

    set selected(value: Album) {
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

    get items(): Array<Album> {
        return this.service.items;
    }

    set items(value: Array<Album>) {
        this.service.items = value;
    }

}