import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class UpdateOrderStatusDto {

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    id_order_status: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    @IsNotEmpty()
    id_orders: number[]

    
}