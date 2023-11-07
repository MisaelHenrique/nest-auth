import { BadRequestException } from '@nestjs/common';

export class UserExistsException extends BadRequestException {
    constructor(){
        super('E-mail already exists!');
    }
}
