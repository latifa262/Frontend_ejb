import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {RestaurantService} from "../../../../controller/service/restaurant.service";
import {Restaurant} from "../../../../controller/model/restaurant.model";


@Component({
    selector: 'app-restaurant-create',
    templateUrl: './restaurant-create.component.html',
    styleUrls: ['./restaurant-create.component.scss']
})
export class RestaurantCreateComponent implements OnInit {

    constructor(private messageService: MessageService, private service: RestaurantService) {
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
        this.selected = new Restaurant();

    }

    get selected(): Restaurant {
        return this.service.selected;
    }

    set selected(value: Restaurant) {
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

    get items(): Array<Restaurant> {
        return this.service.items;
    }

    set items(value: Array<Restaurant>) {
        this.service.items = value;
    }

}
