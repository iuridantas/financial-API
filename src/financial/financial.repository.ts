import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { Financial } from './entities/financial.entity';
import { UpdateFinancialDto } from './dto/update-financial.dto';

@Injectable()
export class FinancialRepository {
  private data = {
    sales: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createFinancial(financial: Financial): Promise<Financial> {
    try {
      return await this.prisma.financial.create({
        data: financial,
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async updateFinancial(financial: UpdateFinancialDto): Promise<Financial> {
    try {
      return await this.prisma.financial.update({
        where: { id: financial.id },
        data: financial,
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteFinancial(id: string): Promise<Financial> {
    try {
      return await this.prisma.financial.delete({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Financeiro não encontrado',
      );
    }
  }

  async findFinancialById(id: string): Promise<Financial> {
    try {
      return await this.prisma.financial.findUnique({
        where: { id: id },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findAllFinancialByUser(userId: string): Promise<Financial[]> {
    try {
      return await this.prisma.financial.findMany({
        where: { userId: userId },
        include: this.data,
      });
    } catch (err) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }
}
