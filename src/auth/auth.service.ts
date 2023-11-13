import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string, newUserId: any }> {
    const { username, password } = registerDto;

    // Check if the username is already taken
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // If the username is not taken, create a new user
    // await this.usersService.createUser(username, password);
    const newUserId = await this.usersService.createUser(username, password);

    return { message: 'Registration successful', newUserId: newUserId };
  }

  async signIn(username: string, password: string): Promise<{ access_token: string, userId: string }> {
    const user = await this.usersService.findOne(username);
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user._id, username: user.username }; // Assuming user._id is the MongoDB ObjectId
    return {
      access_token: await this.jwtService.signAsync(payload),
      userId: user._id
    };
  }
}