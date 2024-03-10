import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { MetadataService } from '@services'
import { AddDeviceDto, AddRecoveryKeyDto } from '@dtos'
import { VerifyGuard } from '@verifiers/verify.guard'
import { Device, Metadata } from '@schemas'

@Controller()
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) {}

    @Get('/:user')
    async find(@Param('user') user: string): Promise<Metadata> {
        return this.metadataService.find(user)
    }

    @Get('/:user/devices')
    async findDevices(@Param('user') user: string): Promise<Device[]> {
        return this.metadataService.findDevices(user)
    }

    @Get('/:user/recovery-key')
    async findRecoveryKey(@Param('user') user: string): Promise<string> {
        return this.metadataService.findRecoveryKey(user)
    }

    @Post('/add-device')
    @UseGuards(VerifyGuard)
    async addDevice(@Body() data: AddDeviceDto) {
        const { user, device } = data
        await this.metadataService.addDevice(user, device)
    }

    @Post('/add-recovery-key')
    @UseGuards(VerifyGuard)
    async addRecoveryKey(@Body() data: AddRecoveryKeyDto) {
        const { user, recoveryKey } = data
        await this.metadataService.addRecoveryKey(user, recoveryKey)
    }
}
