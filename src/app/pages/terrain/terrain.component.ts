import {Component, OnInit} from '@angular/core';
import {Product} from '../../demo/domain/product';
import {ProductService} from '../../demo/service/productservice';
import {Terrain} from '../../controller/model/terrain.model';
import {TerrainService} from '../../controller/service/terrain.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-terrain',
    templateUrl: './terrain.component.html',
    styleUrls: ['../../demo/view/tabledemo.scss'],
    styles: [`
		:host ::ng-deep .p-dialog .product-image {
			width: 150px;
			margin: 0 auto 2rem auto;
			display: block;
		}

		@media screen and (max-width: 960px) {
			:host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
				text-align: center;
			}

			:host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
				display: flex;
			}
		}

    `],
    providers: [MessageService, ConfirmationService]
})
export class TerrainComponent implements OnInit {


    productDialog: boolean;

    productUpdate: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    nom = 'nihad';
    capacite_par_equipe=0;
    posts : any;
    isSubmitted: boolean = false;
    constructor(private router: Router,private terrainService: TerrainService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    /*ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];
    }*/

    //Affichage de la liste des terrains
    ngOnInit() {
        this.terrainService.getPosts().subscribe(
            (response) => { this.posts = response; },
            (error) => { console.log(error); });
    }

    //Ajout d'un terrain
    submitData(value: any) {
        let body = {
            nom: value.nom,
            capaciteParEquipe: value.capaciteParEquipe
        }
        console.log(body)

        this.terrainService.postData(body)
            .subscribe(response => {
                console.log(response)
            })
        this.productDialog=false;
        this.router.navigateByUrl('./terrain/gestion-terrain', { skipLocationChange: true }).then(() => {
            this.router.navigate(['./terrain/gestion-terrain']);
        });
        //window.location.reload();
    }
    //supprimer terrain
    delete(value: any) {
        console.log(value);
        this.terrainService.deleteData(value)
            .subscribe(response => {
                console.log(response);
                this.terrainService.getPosts().subscribe(
                    (response) => { this.posts = response; },
                    (error) => { console.log(error); });
            });


    }
    //modifier terrain
    updateData(value: any, id: string) {
        let body = {
            nom: value.nom,
            capaciteParEquipe: value.capaciteParEquipe,
        }
        console.log(body.nom);

        this.terrainService.updateData(body, id)
            .subscribe(response => {
                console.log(response);
                //window.close();
            })

    }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    openUpdate(value: any) {
        console.log(value.id);
        console.log(value.nom);
        //this.p=value;
        this.product = {};
        this.submitted = false;
        this.productUpdate = true;
    }


    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected stadium?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //console.log(this.product);
                //console.log(this.products);
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.id !== product.id);
                this.product = {};
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        //this.terrainService.create();
        /*this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }*/
    }




    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
