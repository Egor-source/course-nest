import {IMethod} from "./IMethod";

export interface IMethods {
    create: IMethod | null,
    update: IMethod | null,
    delete: IMethod | null,
    paginate: IMethod | null,
    login: IMethod | null,
}