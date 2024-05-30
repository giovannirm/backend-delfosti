import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    if (!users) throw new BadRequestException('Error fetching users');
    return users;
  }

  async findOne(id: number): Promise<User> {
    const userFound = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userFound) throw new NotFoundException('User not found');
    return userFound;
  }

  async registerUser(data: RegisterUserDto): Promise<User> {
    const { email } = data;
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    }); 

    if (userExists) throw new BadRequestException('User already exists');
    
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }
}
