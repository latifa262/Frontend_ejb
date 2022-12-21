import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {QuartierService} from "../../../../controller/service/quartier.service";
import {Quartier} from "../../../../controller/model/quartier.model";


@Component({
    selector: 'app-quartier-create',
    templateUrl: './quartier-create.component.html',
    styleUrls: ['./quartier-create.component.scss']
})
export class QuartierCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: QuartierService) {
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
        this.selected = new Quartier();

    }

    get selected(): Quartier {
        return this.service.selected;
    }

    set selected(value: Quartier) {
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

    get items(): Array<Quartier> {
        return this.service.items;
    }

    set items(value: Array<Quartier>) {
        this.service.items = value;
    }

}