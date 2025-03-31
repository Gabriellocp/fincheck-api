import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signin')
  @IsPublic()
  authenticate(@Body() signInDto: SignInDto) {
    return this.authService.authenticate(signInDto)
  }

  @Post('signup')
  @IsPublic()
  signup(@Body() createUserDto: SignUpDto) {
    return this.authService.create(createUserDto);
  }
}
