export interface IAdminControllerOptions {
    relationFields?: {
        fieldName: string
        multiple: boolean
        displayValueFrom?: string
        paginateFrom: string
        paginateDisplayValueFrom: string
    }[]
}