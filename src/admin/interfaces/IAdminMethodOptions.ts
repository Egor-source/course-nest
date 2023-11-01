export interface IAdminMethodOptions {
    params?: {
        [key: string]: string
    }
    body?: {
        [key: string]: {
            require: boolean
            field?: string
        }
    }
}