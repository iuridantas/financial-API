import { Injectable } from '@nestjs/common';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { FinancialRepository } from './financial.repository';
import { randomUUID } from 'node:crypto';
import { Financial } from './entities/financial.entity';

@Injectable()
export class FinancialService {
  constructor(private readonly financialRepository: FinancialRepository) {}

  async create(createFinancialDto: CreateFinancialDto): Promise<Financial> {
    const financialEntity = { ...createFinancialDto, id: randomUUID() };
    const createdFinancial =
      await this.financialRepository.createFinancial(financialEntity);
    return createdFinancial;
  }

  async findAllFinancialByUser(userId: string): Promise<Financial[]> {
    return await this.financialRepository.findAllFinancialByUser(userId);
  }

  async findOne(id: string): Promise<Financial> {
    return await this.financialRepository.findFinancialById(id);
  }

  async update(updateFinancialDto: UpdateFinancialDto): Promise<Financial> {
    return await this.financialRepository.updateFinancial(updateFinancialDto);
  }

  async remove(id: string): Promise<string> {
    await this.financialRepository.deleteFinancial(id);
    return 'Franquia excluida com sucesso';
  }
}
