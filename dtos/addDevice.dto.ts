import { IsNotEmpty } from 'class-validator'
import { Device } from '@schemas'

export class AddDeviceDto {
    @IsNotEmpty()
    user: string

    @IsNotEmpty()
    device: Device
}
