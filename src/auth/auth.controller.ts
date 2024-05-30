import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
    return this.authService.loginUser(loginAuthDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return this.authService.registerUser(registerUserDto);
  }
}
