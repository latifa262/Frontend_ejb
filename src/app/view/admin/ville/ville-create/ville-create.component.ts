import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {VilleService} from "../../../../controller/service/ville.service";
import {Ville} from "../../../../controller/model/ville.model";


@Component({
    selector: 'app-ville-create',
    templateUrl: './ville-create.component.html',
    styleUrls: ['./ville-create.component.scss']
})
export class VilleCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: VilleService) {
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
                detail: 'Ville est crée',
                life: 3000
            });
        });
        this.createDialog = false;
        this.selected = new Ville();

    }

    get selected(): Ville {
        return this.service.selected;
    }

    set selected(value: Ville) {
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

    get items(): Array<Ville> {
        return this.service.items;
    }

    set items(value: Array<Ville>) {
        this.service.items = value;
    }

}