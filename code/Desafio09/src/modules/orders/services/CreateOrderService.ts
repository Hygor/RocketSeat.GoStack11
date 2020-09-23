import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import { request } from 'express';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError(`Could not find any customer with the giver id!`);
    }

    const productsIn = await this.productsRepository.findAllById(products);

    if (!productsIn.length) {
      throw new AppError('Could not find any product with the given ids');
    }

    const productsInIDs = productsIn.map(product => product.id);

    const productsOut = products.filter(
      product => !productsInIDs.includes(product.id),
    );

    if (productsOut.length) {
      throw new AppError(`Could not find product ${productsOut[0].id}`);
    }

    const productsOutOfStock = products.filter(
      product =>
        productsIn.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (productsOutOfStock.length) {
      throw new AppError(
        `Quantity not availabe for ${productsOutOfStock[0].id}`,
      );
    }

    const orderProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsIn.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: orderProducts,
    });

    const { order_products } = order;

    const orderedQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsIn.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedQuantity);

    return order;
  }
}

export default CreateOrderService;
