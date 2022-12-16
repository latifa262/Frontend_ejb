import {Component, OnInit} from '@angular/core';
import {Product} from '../../demo/domain/product';
import {ProductService} from '../../demo/service/productservice';
import {Terrain} from '../../controller/model/terrain.model';

import {ConfirmationService, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import {ComplexeService} from "../../controller/service/complexe.service";
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complexe',
  templateUrl: './complexe.component.html',
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
export class ComplexeComponent implements OnInit {

  addTerrainForm: Terrain = new Terrain();
  productDialog: boolean;

  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  cols: any[];

  nom = 'nihad';
  longitude=0.0;
  latitude=0.0;
  complexes : any;
  isSubmitted: boolean = false;
  constructor(private router: Router,private complexeService: ComplexeService, private messageService: MessageService,
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

  //Afficher tout les complexe
  ngOnInit() {
    this.complexeService.getPosts().subscribe(
        (response) => { this.complexes = response; },
        (error) => { console.log(error); });
  }

  //Ajout d'un complexe
  submitData(value: any) {
    let body = {
      nom: value.nom,
      longitude: value.longitude,
      latitude: value.latitude,
    }
    console.log(body)

    this.complexeService.postData(body)
        .subscribe(response => {
          console.log(response)
        })
    this.productDialog=false;
    this.router.navigateByUrl('./complexe/gestion-complexe', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./complexe/gestion-complexe']);
    });
  }
  //supprimer complexe
  delete(value: any) {
    console.log(value);
    this.complexeService.deleteData(value)
        .subscribe(response => {
          console.log(response);

          this.complexeService.getPosts().subscribe(
              (response) => { this.complexes = response; },
              (error) => { console.log(error); });

        });

  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }


  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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

  AddTerrain(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.complexeService.saveTerrain(this.addTerrainForm).subscribe(async data => {
            if (data != null && data.body != null) {
              if (data != null && data.body != null) {
                var resultData = data.body;
                if (resultData != null && resultData.isSuccess) {
                  //this.toastr.success(resultData.message);
                  setTimeout(() => {
                    this.router.navigate(['/terrain/gestion-terrain']);
                  }, 500);
                }
              }
            }
          },
          async error => {
            //this.toastr.error(error.message);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 500);
          });
    }
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
