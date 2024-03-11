import { IsNotEmpty } from 'class-validator'

type Detection = {
    name: string
    version: string | undefined
}

export class DeviceDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    lastLogin: string

    browser: Detection

    os: Detection
}
