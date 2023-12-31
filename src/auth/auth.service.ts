import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const payload = { userId: user.userId, email: user.email, roles: user.roles, nickname: user.nickname, picture:user.picture };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
        return result;
      }
}
