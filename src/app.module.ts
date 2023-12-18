import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FinancialModule } from './financial/financial.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, FinancialModule],
})
export class AppModule {}
