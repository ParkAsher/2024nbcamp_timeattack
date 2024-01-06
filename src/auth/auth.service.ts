import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async signUp({ email, password, passwordCheck, phone, name }: SignUpDto) {
        // 비밀번호 확인
        const isPasswordCheck = password === passwordCheck;
        if (!isPasswordCheck) {
            throw new BadRequestException('비밀번호 확인이 일치하지 않습니다.');
        }

        // 이미 가입된 회원 확인
        const existedUser = await this.userRepository.findOneBy({ email });
        if (existedUser) {
            throw new BadRequestException('이미 사용중인 이메일입니다.');
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const user = await this.userRepository.save({
            email,
            password: hashedPassword,
            name,
            phone,
        });
        delete user.password;

        return user;
    }
}
