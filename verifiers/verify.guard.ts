import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GoogleVerifier } from './google.verifier'

@Injectable()
export class VerifyGuard implements CanActivate {
    constructor(private readonly googleVerifier: GoogleVerifier) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const user = request.body.user
        const id_token = request.headers.authorization

        return this.googleVerifier.verify(id_token, user)
    }
}
