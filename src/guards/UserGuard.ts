import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';

export interface IRole {
    roles: string[],
    userId?: string[] | string,
}

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private userId: string[] | string,
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

        let userId;

        if (typeof this.userId === 'string') {
            userId = params[this.userId]
        } else {
            userId = this.userId?.reduce((acc, path) => {
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
