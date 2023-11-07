import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Patch,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { UserDTO } from '../user';
import { DeleteUserDto } from './dto/delete-user-dto';
import { updateUserDto } from './dto/update-user-dto';
import { ApiTags } from '@nestjs/swagger';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.userService.create(createUserDto);
    }

    @Get()
    @UseInterceptors(LogInterceptor)
    findAll(): Promise<UserDTO[]> {
        return this.userService.findAll();
    }

    @Get('/:email')
    findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Delete('/:id')
    remove(@Param('id') id: string, @Body() pwd: DeleteUserDto) {
        return this.userService.delete(id, pwd);
    }

    @Patch('/:id')
    update(@Param('id') id: string, @Body() user: updateUserDto) {
        return this.userService.update(id, user);
    }
}
