import { Component } from '@angular/core';
import { Product } from '../../modules/products';

@Component({
  selector: 'app-mod-product',
  templateUrl: './mod-product.component.html',
  styleUrl: './mod-product.component.css'
})
export class ModProductComponent {
  product = new Product()
  
  constructor() {
    this.product = new Product(); // Inicializa el producto si no se recibe
  }

  // Aquí puedes agregar métodos para manejar la actualización
  updateProduct() {
    // Lógica para actualizar el producto
    console.log(this.product); // Para verificar los datos
  }
}
