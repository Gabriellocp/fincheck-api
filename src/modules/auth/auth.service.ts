import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { AuthenticateDto } from './dto/authenticate.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepository,
        private readonly jswService: JwtService

    ) {

    }

    async authenticate(authenticateDto: AuthenticateDto) {
        const { email, password } = authenticateDto
        const user = await this.userRepo.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const isPassValid = await compare(password, user.password)
        if (isPassValid) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const payload = { sub: user.id }
        const accessToken = await this.jswService.signAsync(payload)
        return { accessToken }
    }
}
