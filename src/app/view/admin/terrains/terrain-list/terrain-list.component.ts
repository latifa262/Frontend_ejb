import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {TerrainService} from "../../../../controller/service/terrain.service";
import {Terrain} from "../../../../controller/model/terrain.model";


@Component({
    selector: 'app-terrain-list',
    templateUrl: './terrain-list.component.html',
    styleUrls: ['./terrain-list.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class TerrainListComponent implements OnInit {
    cols: any[];

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
                private service: TerrainService) {
    }

    ngOnInit(): void {
        this.initCol();
        this.service.findAll().subscribe(data => this.items = data);
    }

    public delete(selected: Terrain) {
        this.selected = selected;
        this.confirmationService.confirm({
            message: 'Etes-vous sûr que vous voulez supprimer ' + selected.nom + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteById().subscribe(data => {
                    this.items = this.items.filter(val => val.id !== this.selected.id);
                    this.selected = new Terrain();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'succès',
                        detail: 'Terrain est supprimé',
                        life: 3000
                    });
                });
            }
        });
    }

    public deleteMultiple() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les terrains sélectionnés?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // this.service.deleteMultipleById().subscribe(data =>{
                this.service.deleteMultipleIndexById();
                this.selectes = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'succès',
                    detail: 'Terrains est supprimé',
                    life: 3000
                });
                //  });
            }
        });
    }

    public openCreate() {
        this.selected = new Terrain();
        this.submitted = false;
        this.createDialog = true;
    }

    public edit(terrain: Terrain) {
        this.selected = {...terrain};
        this.editDialog = true;
    }

    public view(terrain: Terrain) {
        console.log("entred to view");
        console.log({...terrain});

        this.selected = {...terrain};
        console.log(this.selected);
        this.viewDialog = true;
    }

    private initCol() {
        this.cols = [
            {field: 'id', header: 'Id'},
            {field: 'nom', header: 'Nom'},
            {field: 'capaciteParEquipe', header: 'capaciteParEquipe'},
            {field: 'nomComp', header: 'nomComp'}
        ];
    }

    get selected(): Terrain {
        return this.service.selected;
    }

    set selected(value: Terrain) {
        this.service.selected = value;
    }

    get items(): Array<Terrain> {
        return this.service.items;
    }

    set items(value: Array<Terrain>) {
        this.service.items = value;
    }

    get submitted(): boolean {
        return this.service.submitted;
    }

    set submitted(value: boolean) {
        this.service.submitted = value;
    }

    get createDialog(): boolean {
        return this.service.createDialog;
    }

    set createDialog(value: boolean) {
        this.service.createDialog = value;
    }

    get editDialog(): boolean {
        return this.service.editDialog;
    }

    set editDialog(value: boolean) {
        this.service.editDialog = value;
    }

    get viewDialog(): boolean {
        return this.service.viewDialog;
    }

    set viewDialog(value: boolean) {
        this.service.viewDialog = value;
    }

    get selectes(): Array<Terrain> {
        return this.service.selectes;
    }

    set selectes(value: Array<Terrain>) {
        this.service.selectes = value;
    }


}
