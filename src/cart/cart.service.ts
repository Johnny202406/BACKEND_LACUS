import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private productService: ProductService,
  ) {}
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  async findOne(id: number) {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.detalles', 'detalle')
      .leftJoinAndSelect('cart.usuario', 'usuario')
      .leftJoinAndSelect('detalle.producto', 'producto')
      .where('usuario.id = :id', { id })
      .getOneOrFail();
    cart.detalles = cart.detalles.filter(
      (detalle) => detalle.producto?.habilitado === true,
    );
    const productIds = cart.detalles.map((detail) => detail.producto.id);
    const products = await this.productService.findWithStockByIds(productIds);
    cart.detalles.forEach(
      (detail) =>
        (detail.producto = products.find(
          (product) => product.id === detail.producto.id,
        )),
    );
    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
