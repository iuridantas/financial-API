import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFinancialDto } from './create-financial.dto';

export class UpdateFinancialDto extends PartialType(CreateFinancialDto) {
  @ApiProperty()
  id: string;
}
