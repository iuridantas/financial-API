import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FinancialService } from './financial.service';
import { CreateFinancialDto } from './dto/create-financial.dto';
import { UpdateFinancialDto } from './dto/update-financial.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

interface CustomRequest extends Request {
  user: {
    id: string;
  };
}

@ApiTags('financial')
@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  @Post()
  async create(@Body() createFinancialDto: CreateFinancialDto) {
    try {
      return this.financialService.create(createFinancialDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/user')
  async findAllFranchiseeByUser(@Req() req: CustomRequest) {
    try {
      const userId = req.user.id;
      return await this.financialService.findAllFinancialByUser(userId);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.financialService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateFinancialDto: UpdateFinancialDto) {
    try {
      return this.financialService.update(updateFinancialDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      return this.financialService.remove(id);
    } catch (err) {
      HandleException(err);
    }
  }
}
