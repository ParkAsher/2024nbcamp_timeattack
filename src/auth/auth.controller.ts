import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
        const user = await this.authService.signUp(signUpDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: '회원가입에 성공했습니다.',
            user,
        };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('/sign-in')
    async signIn(@Request() req) {
        const { accessToken, refreshToken } = await this.authService.signIn(
            req.user.id,
        );

        return {
            statusCode: HttpStatus.OK,
            message: '로그인에 성공했습니다.',
            accessToken,
            refreshToken,
        };
    }
}
