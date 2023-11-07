import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { hash, compare } from 'bcrypt';
import { UserDTO } from '../user';
import { DeleteUserDto } from './dto/delete-user-dto';
import { updateUserDto } from './dto/update-user-dto';
import { UserNotFoundException } from 'src/common/exceptions/user/user-not-found.exception';
import { UserExistsException } from 'src/common/exceptions/user/email-in-use.exception';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<void> {
        try {
            const hashedPwd = await hash(createUserDto.password, 10);

            const lowerEmail = createUserDto.email.toLowerCase();
            // verify
            await this.exists(lowerEmail);

            await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    role: 'USER',
                    email: lowerEmail,
                    password: hashedPwd,
                },
            });
        } catch (error) {
            // throw new BadRequestException();
            console.log(error);
        }
    }

    async findAll(): Promise<UserDTO[]> {
        const users = await this.prisma.user.findMany();
        users.forEach((user) => delete user.password);
        return users;
    }

    async findOne(id: string): Promise<UserDTO> {
        return await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findByEmail(email: string): Promise<UserDTO> {
        const lowerEmail = email.toLowerCase();
        const user = await this.prisma.user.findUnique({
            where: {
                email: lowerEmail,
            },
        });

        if (!user) {
            throw new UserNotFoundException();
        }
        delete user.password;
        return user;
    }

    async update(id: string, userDto: updateUserDto) {
        const user = await this.prisma.user.update({
            where: { id },
            data: {
                ...userDto,
                updatedAt: new Date(),
            },
        });
        delete user.password;
        return user;
    }

    async delete(id: string, pwd: DeleteUserDto) {
        await this.validatePwd(id, pwd.currentPwd);
        return this.prisma.user.delete({ where: { id } });
    }

    private async validatePwd(id: string, currentPwd: string): Promise<void> {
        const user = this.prisma.user.findUnique({ where: { id } });
        const isCorrecttPwd = await compare(currentPwd, (await user).password);
        if (!isCorrecttPwd) {
            //exception
            console.log('pwd is incorrect');
        }
    }

    async exists(email: string) {
        if (
            await this.prisma.user.findUnique({
                where: { email },
            })
        ) {
            throw new UserExistsException();
        }
    }
}
