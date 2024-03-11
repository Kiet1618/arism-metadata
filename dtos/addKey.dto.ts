import { IsNotEmpty } from 'class-validator'
import { KeyDto } from '@dtos'

export class AddKeyDto {
    @IsNotEmpty()
    user: string

    @IsNotEmpty()
    key: KeyDto
}
