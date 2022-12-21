import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

import {RestaurantService} from "../../../../controller/service/restaurant.service";
import {Restaurant} from "../../../../controller/model/restaurant.model";

@Component({
    selector: 'app-restaurant-edit',
    templateUrl: './restaurant-edit.component.html',
    styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent implements OnInit {

    constructor(private messageService: MessageService, private service: RestaurantService) {
    }

    ngOnInit(): void {
    }

    public edit() {
        // this.submitted = true;
        // if (this.selected.id) {
        //     this.items[this.service.findIndexById(this.selected.id)] = this.selected;
        //     this.service.edit().subscribe(data => {
        //         this.selected = data;
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'succès',
        //             detail: 'Complexe est modifié',
        //             life: 3000
        //         });
        //     });
        // }
        // this.editDialog = false;
        // this.selected = new Complexe();

    }

    public hideEditDialog() {
        this.editDialog = false;
    }

    get selected(): Restaurant {
        return this.service.selected;
    }

    set selected(value: Restaurant) {
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

    get items(): Array<Restaurant> {
        return this.service.items;
    }

    set items(value: Array<Restaurant>) {
        this.service.items = value;
    }


}
