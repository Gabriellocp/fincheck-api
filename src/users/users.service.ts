import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {

  }
  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto
    const emailTaken = await this.prismaService.user.findUnique({
      where: { email }
    })
    if (emailTaken) {
      throw new ConflictException('This email is already in use')
    }
    const hashedPass = await hash(password, 12)
    await this.prismaService.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
      }
    })
    return 'This action adds a new user';
  }


}
