import * as Joi from "joi";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    login: string
    @ApiProperty()
    password: string
    @ApiProperty()
    roles?:number[]
}

export const CreateUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
})

export const CreateUserAdminSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    roles: Joi.array<number>()
})