import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  imports: [
    PrismaModule,
    UserModule,
    PassportModule,
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { 
            expiresIn: process.env.JWT_EXPIRES_IN
        },
    }),
  ],
})
export class AuthModule {}
