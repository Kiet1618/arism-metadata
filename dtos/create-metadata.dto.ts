import { IsNotEmpty } from 'class-validator'
import { Device } from '@schemas'
import BN from 'bn.js'

export class CreateMetadataDto {
    @IsNotEmpty()
    owner: string

    @IsNotEmpty()
    devices: Device[]

    @IsNotEmpty()
    idToken: string

    @IsNotEmpty()
    recoveryFactorX: string
}