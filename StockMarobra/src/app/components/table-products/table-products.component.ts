import { Component } from '@angular/core';
import { Product } from '../../modules/products';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductsComponent } from '../add-products/add-products.component';
import { AddProductsService } from '../../services/add-products.service';
import { ToastrService } from 'ngx-toastr';
import { ModProductComponent } from '../mod-product/mod-product.component';


@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.css'
})
export class TableProductsComponent {

  public productsList: Product[] = [];
  constructor(private ngModal: NgbModal, private productServices: AddProductsService) { }


  addProduct(): void {
    const ngModal = this.ngModal.open(AddProductsComponent, { backdrop: 'static' });
    ngModal.result.then(resultado => {
      if (resultado == true) {
        this.productServices.get().subscribe(response => {
          this.productsList = response
        })
      } else {

      }
    })
  }
  ngOnInit() {
    this.productServices.get().subscribe(response => {
      console.log(response)
      this.productsList = response
    })
  }
  delete(id: string): void {
    this.productServices.delete(id).subscribe(response => {

      this.productServices.get().subscribe(res => {
        this.productsList = res
      })
    })
  }
  getById(id: string): void {
    this.productServices.getById(id).subscribe(response => {
      const ngModal = this.ngModal.open(ModProductComponent, { backdrop: 'static' })

      if (response != null) {
        ngModal.componentInstance.product = response

        ngModal.result.then(resultado => {
          if (resultado == true) {
            this.productServices.get().subscribe(response => {
              this.productsList = response
            })
          } else {
            console.log("El modal no se cerró correctamente")
          }
        })
      }
    })

  }
}
