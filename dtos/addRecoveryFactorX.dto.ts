import { IsNotEmpty } from 'class-validator'

export class AddRecoveryKeyDto {
    @IsNotEmpty()
    owner: string

    @IsNotEmpty()
    recoveryKey: string
}
