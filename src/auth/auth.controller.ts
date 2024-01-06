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
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 회원가입
     * @param signUpDto
     * @returns
     */
    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpDto) {
        const user = await this.authService.signUp(signUpDto);

        return {
            statusCode: HttpStatus.CREATED,
            message: '회원가입에 성공했습니다.',
            user,
        };
    }

    /**
     * 로그인
     * @param req
     * @returns
     */
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('/sign-in')
    async signIn(@Request() req, @Body() signInDto: SignInDto) {
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
