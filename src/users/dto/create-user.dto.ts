import * as Joi from "joi";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    login: string
    @ApiProperty()
    password: string
}

export const CreateUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
})