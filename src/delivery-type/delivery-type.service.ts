import { Injectable } from '@nestjs/common';
import { CreateDeliveryTypeDto } from './dto/create-delivery-type.dto';
import { UpdateDeliveryTypeDto } from './dto/update-delivery-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryType } from './entities/delivery-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryTypeService {
  constructor(
      @InjectRepository(DeliveryType)
      private deliveryTypeRepository: Repository<DeliveryType>,
    ) {}
  create(createDeliveryTypeDto: CreateDeliveryTypeDto) {
    return 'This action adds a new deliveryType';
  }

  async findAll() {
    return await this.deliveryTypeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryType`;
  }

  update(id: number, updateDeliveryTypeDto: UpdateDeliveryTypeDto) {
    return `This action updates a #${id} deliveryType`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryType`;
  }
}
