import {
    Controller,
    Get,
    HttpStatus,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/info')
    async getUserInfo(@Request() req) {
        const { id, accessToken, refreshToken } = req.user;

        console.log(req.user);

        const user = await this.userService.getUserInfo(id);

        return {
            statusCode: HttpStatus.OK,
            message: '회원 정보를 성공적으로 가져왔습니다.',
            user,
            accessToken,
            refreshToken,
        };
    }
}
