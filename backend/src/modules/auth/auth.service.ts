import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: { id: number; email: string; password: string }[] = []; // Temporary in-memory store (replace with database)

  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const user = this.users.find((u) => u.email === loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = this.users.find((u) => u.email === registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = { id: this.users.length + 1, ...registerDto, password: hashedPassword };
    this.users.push(newUser);

    return { message: 'User registered successfully' };
  }
}
