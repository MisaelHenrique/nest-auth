import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Description placeholder
 * @date 16/10/2023 - 21:30:50
 *
 * @export
 * @class CreateUserDto
 * @typedef {CreateUserDto}
 */
export class CreateUserDto implements User {
    /**
     * Description placeholder
     * @date 16/10/2023 - 21:30:50
     *
     * @type {string}
     */
    @ApiProperty({
        description: 'O email é utilizado user name para acessar o sistema',
        example: 'example@example.com',
    })
    @IsEmail()
    email: string;
    /**
     * Description placeholder
     * @date 16/10/2023 - 21:30:50
     *
     * @type {string}
     */
    @ApiProperty({
        description:
            'O password é utilizado para autenticar o acesso do user ao sistema',
        example: '5@f6#125JkL1984',
    })
    @IsStrongPassword()
    password: string;
    /**
     * Description placeholder
     * @date 16/10/2023 - 21:30:50
     *
     * @type {?string}
     */
    @ApiProperty({
        description:
            'O name é utilizado para exeibir dados no perfil do usuário',
        example: 'Jon Doe',
    })
    @IsString()
    @IsOptional()
    name?: string;

    /**
     * Description placeholder
     * @date 16/10/2023 - 21:30:50
     *
     * @type {?string}
     */
    @ApiProperty({
        description:
            'O address é utilizado para obter os dados para entrega do produto',
        example: 'Rua Elm (Elm Street), 1428, Interlagos, Três Lagoas, MS',
    })
    @IsString()
    @IsOptional()
    address?: string;
}
