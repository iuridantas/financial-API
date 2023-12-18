import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { PassportModule } from '@nestjs/passport';
import { FinancialRepository } from './financial.repository';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [FinancialController],
  providers: [FinancialService, FinancialRepository],
})
export class FinancialModule {}
