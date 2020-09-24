import { ArrayNotEmpty, IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer/decorators';
import { ApiProperty } from '@nestjs/swagger';

class CheckoutRequestProduct {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  size: string;
}

export class CheckoutRequest {
  @ApiProperty({
    type: [CheckoutRequestProduct],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CheckoutRequestProduct)
  public products: CheckoutRequestProduct[];
}
