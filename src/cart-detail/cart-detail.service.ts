import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { CartDetail } from './entities/cart-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>,
    private dataSource: DataSource,
    private productService: ProductService,
  ) {}
  async create(createCartDetailDto: CreateCartDetailDto) {
    const { id_carrito, id_producto } = createCartDetailDto;
    await this.dataSource.manager.findOneByOrFail(Cart, { id: id_carrito });
    
    const hasStock = await this.productService.findOneOnlyStock(id_producto);

    if (!hasStock) throw new Error('Producto no disponible!');

    if (hasStock.stock <= 0) throw new Error('Producto sin stock!');

    const cartDetail = this.cartDetailRepository.create({
      cantidad: 1,
      carrito: { id: id_carrito },
      producto: { id: id_producto },
    });

    await this.cartDetailRepository.save(cartDetail);
    return ['This action adds a new cartDetail'];
  }

  findAll() {
    return `This action returns all cartDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartDetail`;
  }

  async update(updateCartDetailDto: UpdateCartDetailDto) {
    const {id,quantity}= updateCartDetailDto
    const cartDetail = await this.cartDetailRepository.findOneOrFail({
      where: { id: id, producto: { habilitado: true } },relations: ['producto'],
    });
      const hasStock = await this.productService.findOneOnlyStock(cartDetail.producto.id);

    if (!hasStock) throw new Error('Producto no disponible!');

    if (hasStock.stock <= 0) throw new Error('Producto sin stock!');

    if (quantity>hasStock.stock) throw new Error('Sin stock suficiente!');

    cartDetail.cantidad = updateCartDetailDto.quantity;

    await this.cartDetailRepository.save(cartDetail);

    return [`This action updates a #${updateCartDetailDto.id} cartDetail`];
  }

  async remove(id: number) {
    await this.cartDetailRepository.delete({ id });
    return [`This action removes a #${id} cartDetail`];
  }
}
