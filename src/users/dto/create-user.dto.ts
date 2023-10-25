import * as Joi from "joi";

export class CreateUserDto {
    login: string
    password: string
}

export const CreateUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
})