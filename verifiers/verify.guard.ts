import {
	Injectable,
	CanActivate,
	ExecutionContext,
	BadRequestException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { GoogleVerifier } from './google.verifier'

@Injectable()
export class VerifyGuard implements CanActivate {
	constructor(private readonly googleVerifier: GoogleVerifier) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		const { idToken, owner } = request.body
		return this.googleVerifier.verify(idToken, owner)

		return true
	}
}
