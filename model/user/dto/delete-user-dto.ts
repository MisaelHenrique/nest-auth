import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Description placeholder
 * @date 23/10/2023 - 22:25:07
 *
 * @export
 * @class DeleteUserDto
 * @typedef {DeleteUserDto}
 */
export class DeleteUserDto {
    /**
     * Description placeholder
     * @date 23/10/2023 - 22:25:07
     *
     * @type {string}
     */
    @ApiProperty({
        description:
            'O currentPwd é utilizado para pegar a senha atual (já com hash) ',
        example: '',
    })
    @IsString()
    @IsNotEmpty()
    currentPwd: string;
}
