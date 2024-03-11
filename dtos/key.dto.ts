import { IsNotEmpty } from 'class-validator'

export class KeyDto {
    @IsNotEmpty()
    address: string

    @IsNotEmpty()
    privateFactorX: string
}
