import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { MetadataService } from '@services'
import {
    AddDeviceDto,
    SetRecoveryKeyDto,
    DeviceDto,
    AddKeyDto,
    KeyDto,
} from '@dtos'
import { VerifyGuard } from '@verifiers/verify.guard'
import { Metadata } from '@schemas'

@Controller()
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) {}

    @Get('/:user')
    async find(@Param('user') user: string): Promise<Metadata | undefined> {
        return this.metadataService.find(user)
    }

    @Post()
    async initialize(@Body() data: { user: string }): Promise<void> {
        this.metadataService.initialize(data.user)
    }

    @Get('/:user/devices')
    async findDevices(@Param('user') user: string): Promise<DeviceDto[]> {
        return this.metadataService.findDevices(user)
    }

    @Get('/:user/keys')
    async findKeys(@Param('user') user: string): Promise<KeyDto[]> {
        return this.metadataService.findKeys(user)
    }

    @Get('/:user/recovery-key')
    async findRecoveryKey(@Param('user') user: string): Promise<string> {
        return this.metadataService.findRecoveryKey(user)
    }

    @Post('/add-device')
    @UseGuards(VerifyGuard)
    async addDevice(@Body() data: AddDeviceDto): Promise<void> {
        const { user, device } = data
        this.metadataService.addDevice(user, device)
    }

    @Post('/add-key')
    @UseGuards(VerifyGuard)
    async addKey(@Body() data: AddKeyDto): Promise<void> {
        const { user, key } = data
        this.metadataService.addKey(user, key)
    }

    @Post('/set-recovery-key')
    @UseGuards(VerifyGuard)
    async setRecoveryKey(@Body() data: SetRecoveryKeyDto): Promise<void> {
        const { user, recoveryKey } = data
        this.metadataService.setRecoveryKey(user, recoveryKey)
    }
}
