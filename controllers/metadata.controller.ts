import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { MetadataService } from '@services'
import { AddDeviceDto, AddRecoveryKeyDto } from '@dtos'
import { VerifyGuard } from '@verifiers/verify.guard'
import { Device, Metadata } from '@schemas'

@Controller()
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) {}

    @Get('/:owner')
    async find(@Param('owner') owner: string): Promise<Metadata> {
        return this.metadataService.find(owner)
    }

    @Get('/:owner/devices')
    async findDevices(@Param('owner') owner: string): Promise<Device[]> {
        return this.metadataService.findDevices(owner)
    }

    @Get('/:owner/recovery-key')
    async findRecoveryKey(@Param('owner') owner: string): Promise<string> {
        return this.metadataService.findRecoveryKey(owner)
    }

    @Post('/add-device')
    @UseGuards(VerifyGuard)
    async addDevice(@Body() data: AddDeviceDto) {
        const { owner, device } = data
        await this.metadataService.addDevice(owner, device)
    }

    @Post('/add-recovery-key')
    @UseGuards(VerifyGuard)
    async addRecoveryKey(@Body() data: AddRecoveryKeyDto) {
        const { owner, recoveryKey } = data
        await this.metadataService.addRecoveryKey(owner, recoveryKey)
    }
}
