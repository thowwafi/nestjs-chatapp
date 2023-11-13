
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)

    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<{message: string}> {
        return await this.authService.register(registerDto);
    }
}