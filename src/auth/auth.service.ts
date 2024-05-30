import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from '../user/dto/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly userService: UserService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<any> {
    const { email, password } = registerUserDto;
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.registerUser({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async loginUser(loginAuthDto: LoginAuthDto): Promise<any> {
    const { email, password } = loginAuthDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { name: roleName } = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });

    return {
      token: this.jwt.sign({ email }),
      expiresIn: this.jwt.decode(this.jwt.sign({ email })).exp,
      userId: user.id,
      role: roleName
    };
  }
}
