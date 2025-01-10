import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientsService {
  private patients: Array<CreatePatientDto & { id: number }> = []; // Temporary in-memory store (replace with a database)

  async create(createPatientDto: CreatePatientDto) {
    const newPatient = { id: this.patients.length + 1, ...createPatientDto };
    this.patients.push(newPatient);
    return newPatient;
  }

  async findAll() {
    return this.patients;
  }

  async findOne(id: string) {
    const patient = this.patients.find((p) => p.id === Number(id));
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patientIndex = this.patients.findIndex((p) => p.id === Number(id));
    if (patientIndex === -1) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    this.patients[patientIndex] = { ...this.patients[patientIndex], ...updatePatientDto };
    return this.patients[patientIndex];
  }

  async remove(id: string) {
    const patientIndex = this.patients.findIndex((p) => p.id === Number(id));
    if (patientIndex === -1) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    const removedPatient = this.patients.splice(patientIndex, 1);
    return { message: `Patient with ID ${id} removed`, patient: removedPatient[0] };
  }
}
