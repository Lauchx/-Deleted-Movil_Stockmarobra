import { Component } from '@angular/core';
import { AddProductsService } from '../../services/add-products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  constructor(private activeModal: NgbActiveModal, private productService: AddProductsService, private toastr: ToastrService) { }


  addProduct(): void {
    this.productService.add().subscribe({
      next: (response) => {
        console.log(response.status)
        console.log("entrop")
        if (response.status >= 200 && response.status <= 299) {
          this.toastr.success('Agregaste el producto', 'Exito')
          setTimeout(() => {
            this.activeModal.close(true);
          }, 500)
        }
        this.toastr.error('No se pudo agregar el producto', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        })
        this.activeModal.close(false);

      },
      error: (error) => {
        const errorMessage = error.error?.message || 'No se pudo agregar el producto';
        this.toastr.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        })
      }
    });
  }

  closeModal() {
    this.activeModal.close(false)
  }

}
