import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {ComplexeService} from "../../../../controller/service/complexe.service";
import {Complexe} from "../../../../controller/model/complexe.model";


@Component({
    selector: 'app-complexe-create',
    templateUrl: './complexe-create.component.html',
    styleUrls: ['./complexe-create.component.scss']
})
export class ComplexeCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: ComplexeService) {
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
                detail: 'Complexe est crée',
                life: 3000
            });
        });
        this.createDialog = false;
        this.selected = new Complexe();

    }

    get selected(): Complexe {
        return this.service.selected;
    }

    set selected(value: Complexe) {
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

    get items(): Array<Complexe> {
        return this.service.items;
    }

    set items(value: Array<Complexe>) {
        this.service.items = value;
    }

}
