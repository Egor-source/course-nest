import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';

export interface IRole {
    roles: string[],
    userId?: string[] | string,
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private roleData: IRole,
    ) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {user, body, params} = request;
        if (!user) {
            throw new UnauthorizedException()
        }

        for (let role of this.roleData.roles) {
            if (user.roles.find(({name}) => name === role)) {
                return true
            }
        }

        let userId;

        if (typeof this.roleData.userId === 'string') {
            userId = params[this.roleData.userId]
        } else {
            userId = this.roleData.userId?.reduce((acc, path) => {
                if (typeof acc === 'object') {
                    acc = acc[path]
                }
                return acc
            }, body)
        }
        if (+userId === user.id) {
            return true;
        }

        return false;
    }
}
