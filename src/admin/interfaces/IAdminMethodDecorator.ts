import {IAdminMethodOptions} from "./IAdminMethodOptions";

export interface IAdminMethodDecorator {
    requestType: MethodDecorator
    methodType: string
    path?: string
    options?: IAdminMethodOptions
}