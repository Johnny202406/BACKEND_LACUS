import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  IsString,
  Min,
  Max,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { Cart } from 'src/cart/entities/cart.entity';

export class YapeDTO {
  @IsNumber()
  @Min(100000000)
  @Max(999999999)
  @IsNotEmpty()
  celular: number;

  @IsNumber()
  @Min(1000) // Mínimo 4 dígitos
  @Max(999999) // Máximo 6 dígitos
  @IsNotEmpty()
  otp: number;
}

export class MetodoPagoDTO {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => YapeDTO)
  yape: YapeDTO;
}

// ---------- COMPROBANTES ----------

export class FacturaDTO {
  @IsNumber()
  @Min(10000000000)
  @Max(99999999999)
  @IsNotEmpty()
  ruc: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  razon_social: string;
}

export class BoletaDTO {
  @IsNumber()
  @Min(10000000)
  @Max(99999999)
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(510)
  @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ'’-]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ'’-]+)*$/)
  nombres: string;
}

export class ComprobanteFacturaDTO {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => FacturaDTO)
  factura: FacturaDTO;
}

export class ComprobanteBoletaDTO {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => BoletaDTO)
  boleta: BoletaDTO;
}

export type ComprobanteDTO = ComprobanteFacturaDTO | ComprobanteBoletaDTO;

// ---------- ENTREGA ----------

export class CoordenadasDTO {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class TipoEntregaConCoordenadasDTO {
  @IsNumber()
  id: number;

  @ValidateNested()
  @Type(() => CoordenadasDTO)
  coordenadas: CoordenadasDTO;
}

export class TipoEntregaSimpleDTO {
  @IsNumber()
  id: number;
}

export type TipoEntregaDTO = TipoEntregaConCoordenadasDTO | TipoEntregaSimpleDTO;

// ---------- PEDIDO ----------

export class PedidoDTO {
  @ValidateNested()
  @Type(() => Cart)
  carrito: Cart;

  @ValidateNested()
  @Type(() => Object) 
  comprobante: ComprobanteDTO;

  @ValidateNested()
  @Type(() => Object)
  tipo_entrega: TipoEntregaDTO;

  @ValidateNested()
  @Type(() => MetodoPagoDTO)
  metodo_pago: MetodoPagoDTO;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  delivery_costo: number;

  @IsNumber()
  total: number;
}
