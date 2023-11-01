import {IAdminControllerOptions} from "./IAdminControllerOptions";

export interface IAdminControllerDecorator {
    prefix: string
    controllerLabel: string
    options?: IAdminControllerOptions
}