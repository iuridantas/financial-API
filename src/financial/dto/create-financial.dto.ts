import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFinancialDto {
  @ApiProperty()
  @IsString()
  month: string;

  @ApiProperty()
  userId: string;
}
