import { Injectable } from '@angular/core';

const domain = 'https://result.school';

export enum ProductType {
  Skill = 'skill',
  Intensive = 'intensive',
  Course = 'course',
}

export interface IProduct {
  id: string;
  text: string;
  title: string;
  link: string;
  image: string;
  time: string;
  type: ProductType;
}

function addDomainToLinkAndImage(product: IProduct) {
  return {
    ...product,
    image: domain + product.image,
    link: domain + product.link,
  };
}

const products: IProduct[] = [
  {
    id: '29',
    title: 'TypeScript',
    link: '/products/typescript',
    image: '/img/icons/products/icon-ts.svg',
    text: 'Основы, типы, компилятор, классы, generic, утилиты, декораторы, advanced...',
    time: 'С опытом • 2 недели',
    type: ProductType.Skill,
  },
  {
    id: '33',
    title: 'Продвинутый JavaScript. Создаем свой Excel',
    link: '/products/advanced-js',
    image: '/img/icons/products/icon-advanced-js.svg',
    text: 'Webpack, Jest, Node.js, State Managers, ООП, ESlint, SASS, Data Layer',
    time: 'С опытом • 2 месяца',
    type: ProductType.Intensive,
  },
  {
    id: '26',
    title: 'Марафон JavaScript «5 дней — 5 проектов»',
    link: '/products/marathon-js',
    image: '/img/icons/products/icon-marathon-five-x-five.svg',
    text: 'плагин для картинок, мини-кол Trello, слайдер картинок, мини-игра, анимированная игра',
    time: 'С нуля • 1 неделя',
    type: ProductType.Course,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly products: IProduct[] = products.map(addDomainToLinkAndImage);

  // получаем конкретный продукт
  getById(id: string) {
    return this.products.find((p) => p.id === id);
  }
	
  // для удобного распределения по блокам в компоненте
  get byGroup() {
    return this.products.reduce((group, prod) => {
      if (!group[prod.type]) {
        group[prod.type] = [];
      }
      group[prod.type].push(prod);
      return group;
    }, {});
  }
}