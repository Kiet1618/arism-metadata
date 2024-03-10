import { IsNotEmpty } from 'class-validator'
import { Device } from '@schemas'

export class AddDeviceDto {
    @IsNotEmpty()
    owner: string

    @IsNotEmpty()
    device: Device
}
