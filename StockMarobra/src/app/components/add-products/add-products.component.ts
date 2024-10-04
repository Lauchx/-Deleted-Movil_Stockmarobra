import { Component } from '@angular/core';
import { Product } from '../../modules/products';
import { AddProductsService } from '../../services/add-products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
   error = false
  constructor(private activeModal: NgbActiveModal, private productService: AddProductsService,  private toast: ToastrService) { }


  addProduct(): void {
    this.productService.add().subscribe((response: HttpResponse<any>) => {
      if (response.status >= 200 && response.status <= 299) {
        this.activeModal.close(true)
        this.toast.success('Agregaste el producto', 'Success')
      } else {
        this.activeModal.close(false)
        this.error = true
        this.toast.error("No se  pudo agregar el producto")
        console.log(response.status)
      }
      if(response.status >= 100 && response.status <= 199){
        console.log("CARLITOS")

      }
    })
  }

  closeModal() {
    this.activeModal.close(false)
  }

}
