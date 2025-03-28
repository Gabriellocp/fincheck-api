import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UserRepository } from 'src/shared/database/repositories/users.repositories';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepository,
        private readonly jswService: JwtService

    ) {

    }
    private async generateAccessToken(id: string) {
        const payload = { sub: id }
        const accessToken = await this.jswService.signAsync(payload)
        return accessToken
    }
    async authenticate(signInDto: SignInDto) {
        const { email, password } = signInDto
        const user = await this.userRepo.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const isPassValid = await compare(password, user.password)
        if (isPassValid) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const accessToken = await this.generateAccessToken(user.id)
        return { accessToken }
    }

    async create(signUpDto: SignUpDto) {
        const { email, name, password } = signUpDto
        const emailTaken = await this.userRepo.findByEmail(email)
        if (emailTaken) {
            throw new ConflictException('This email is already in use')
        }
        const hashedPass = await hash(password, 12)
        const user = await this.userRepo.create({
            data: {
                name: name,
                email: email,
                password: hashedPass,
                categories: {
                    createMany: {
                        data: [
                            // Income
                            { name: 'Salário', icon: 'salary', type: 'INCOME' },
                            { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
                            { name: 'Outro', icon: 'other', type: 'INCOME' },
                            // Expense
                            { name: 'Casa', icon: 'home', type: 'EXPENSE' },
                            { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
                            { name: 'Educação', icon: 'education', type: 'EXPENSE' },
                            { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
                            { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
                            { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
                            { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
                            { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
                            { name: 'Outro', icon: 'other', type: 'EXPENSE' },
                        ]
                    }
                }
            }
        })

        const accessToken = await this.generateAccessToken(user.id)
        return { accessToken }

    }
}
