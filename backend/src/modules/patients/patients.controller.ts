import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    return await this.patientsService.create(createPatientDto);
  }

  @Get()
  async findAll() {
    return await this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.patientsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return await this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientsService.remove(id);
  }
}
