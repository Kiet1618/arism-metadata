import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Metadata, MetadataDocument } from '@schemas'
import { DeviceDto, KeyDto } from '@dtos'

@Injectable()
export class MetadataService {
    constructor(
        @InjectModel(Metadata.name)
        private metadataModel: Model<MetadataDocument>
    ) {}

    async initialize(user: string): Promise<Metadata> {
        const exists = await this.find(user)
        if (exists) {
            return exists
        }
        return this.metadataModel.create({
            user,
            devices: [],
            keys: [],
            recoveryKey: '0',
        })
    }

    async addDevice(user: string, device: DeviceDto): Promise<void> {
        const devices = await this.find(user).then((res) => res.devices)

        devices.push(device)

        this.metadataModel.findOneAndUpdate({ user }, { devices }).exec()
    }

    async addKey(user: string, key: KeyDto): Promise<void> {
        const keys = await this.find(user).then((res) => res.keys)

        keys.push(key)

        this.metadataModel.findOneAndUpdate({ user }, { keys }).exec()
    }

    async setRecoveryKey(user: string, recoveryKey: string): Promise<void> {
        this.metadataModel.findOneAndUpdate({ user }, { recoveryKey }).exec()
    }

    async find(user: string): Promise<Metadata | undefined> {
        return this.metadataModel
            .findOne({ user })
            .exec()
            .catch(() => undefined)
    }

    async findDevices(user: string): Promise<DeviceDto[]> {
        return this.find(user).then((res) => res.devices)
    }

    async findKeys(user: string): Promise<KeyDto[]> {
        return this.find(user).then((res) => res.keys)
    }

    async findRecoveryKey(user: string): Promise<string> {
        return this.find(user).then((res) => res.recoveryKey)
    }
}
