import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return user;
    }
}
