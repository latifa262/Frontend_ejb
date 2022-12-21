import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {RestaurantService} from "../../../../controller/service/restaurant.service";
import {Restaurant} from "../../../../controller/model/restaurant.model";


@Component({
    selector: 'app-restaurant-view',
    templateUrl: './restaurant-view.component.html',
    styleUrls: ['./restaurant-view.component.scss']
})
export class RestaurantViewComponent implements OnInit {


    constructor(private messageService: MessageService, private service: RestaurantService) {
    }

    ngOnInit(): void {
        console.log("entred to view component");
    }

    public hideViewDialog() {
        this.viewDialog = false;
    }

    get selected(): Restaurant {
        return this.service.selected;
    }

    set selected(value: Restaurant) {
        this.service.selected = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }


}
