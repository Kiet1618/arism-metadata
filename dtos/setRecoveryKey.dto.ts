import { IsNotEmpty } from 'class-validator'

export class SetRecoveryKeyDto {
    @IsNotEmpty()
    user: string

    @IsNotEmpty()
    recoveryKey: string
}
