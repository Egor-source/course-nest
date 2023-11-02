export interface IAdminMethodOptions {
    params?: {
        [key: string]: string
    }
    body?: {
        [key: string]: {
            require: boolean
            label: string
            field?: string
        }
    }
}