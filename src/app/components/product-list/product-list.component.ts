import { Component, Input } from '@angular/core';
import { IProduct } from '../../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink], // подключаем директиву, которая работает в шаблоне
  template: `
    <h2 class="mb">{{ title }}</h2>
    <h4 class="mb">{{ subtitle }}</h4>
    <ul class="products">
      @for (product of products; track product.id) {
      <li class="product-item" [routerLink]="'/product/' + product.id">
        <div class="product-image">
          <img [src]="product.image" [alt]="product.title" />
        </div>
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p class="hint">{{ product.text }}</p>
          <p class="hint">{{ product.time }}</p>
        </div>
      </li>
      }
    </ul>
  `,
})
export class ProductListComponent {
  // прописываем входящие параметры в компонент и их тип
  @Input() title: string;
  @Input() subtitle: string;
  @Input() products: IProduct[];
}