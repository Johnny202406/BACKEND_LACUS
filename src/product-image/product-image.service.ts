import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
import cloudinary from 'src/cloudinary';
import { ProductService } from 'src/product/product.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ProductImageService {
  constructor(
    private productImageRepository: Repository<ProductImage>,
    private productService: ProductService,
  ) {}

  async create(product_id: number, files: Express.Multer.File[]) {
    const PRODUCT = this.productService.findOneById(product_id);

    if (!PRODUCT) throw new Error(`No se encuentra el producto ${product_id}`);

    const MAX_IMGS = 4;

    const CURRENT_IMGS = await this.productImageRepository.count({
      where: { producto: { id: product_id } },
    });

    if (CURRENT_IMGS >= MAX_IMGS) {
      throw new Error(
        `Solo puedes subir hasta ${MAX_IMGS} imágenes para este producto.`,
      );
    }
    const REMAINING_IMGS = MAX_IMGS - CURRENT_IMGS;
    if (REMAINING_IMGS < files.length) {
      throw new Error(
        `Solo puedes subir hasta ${REMAINING_IMGS} imágenes restantes`,
      );
    }

    const uploadPromises = files.map(
      (file) =>
        new Promise<ProductImage>((resolve, reject) => {
          const res = cloudinary.uploader
            .upload_stream(
              { resource_type: 'image', folder: 'product', format: 'webp' },
              async (error, result) => {
                if (error) {
                  return reject('Error en Cloudinary');
                }

                try {
                  const nueva = this.productImageRepository.create({
                    public_id: result?.public_id,
                    secure_url: result?.secure_url,
                    producto: { id: product_id },
                  });
                  const savedImagen =
                    await this.productImageRepository.save(nueva);
                  resolve(savedImagen);
                } catch (err) {
                  reject('Error al guardar la imagen en la base de datos');
                }
              },
            )
            .end(file.buffer);
        }),
    );

    try {
      await Promise.all(uploadPromises);

      // return await this.productService.findOneById(product_id);
      return 'Imagenes de producto creaod correctamente';
    } catch (err) {
      throw new Error(`Error al subir imágenes: ${err}`);
    }
  }
  async findByProduct(id: number) {
    return await this.productImageRepository.findBy({
      producto: { id },
    });
  }

  async update(id: number, file: Express.Multer.File) {
    const productImage = await this.productImageRepository.findOneByOrFail({
      id,
    });

    try {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'product',
                public_id: productImage.public_id,
                overwrite: true,
                invalidate: true,
                resource_type: 'image',
                transformation: [{ fetch_format: 'webp' }],
              },
              (error, uploadResult) => {
                if (error) {
                  return reject(error);
                }
                return resolve(uploadResult as UploadApiResponse);
              },
            )
            .end(file.buffer);
        },
      );

      return `This action updates a #${id} productImage`;
    } catch (e) {
      throw new ConflictException('No se pudo actualizar la publicación');
    }
  }
  async remove(id: number) {
    const productImage = await this.productImageRepository.findOneByOrFail({
      id,
    });
    try {
      const deletedResult = await cloudinary.uploader.destroy(
        productImage.public_id,
        {
          resource_type: 'image',
          invalidate: true,
        },
      );
      await this.productImageRepository.remove(productImage);
      return `This action removes a #${productImage.id} publication`;
    } catch (error) {
      throw new Error(`No se pudo eliminar la imagen #${productImage.id}`);
    }
  }
}
