import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private roles: string[],
    ) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {user} = request;
        if (!user) {
            throw new UnauthorizedException()
        }

        for (let role of this.roles) {
            if (user.roles.find(({name}) => name === role)) {
                return true
            }
        }

        return false;
    }
}
