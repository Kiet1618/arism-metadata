import { IsNotEmpty } from 'class-validator'

export class AddRecoveryKeyDto {
    @IsNotEmpty()
    user: string

    @IsNotEmpty()
    recoveryKey: string
}
