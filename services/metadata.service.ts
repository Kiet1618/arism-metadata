import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Device, Metadata, MetadataDocument } from '@schemas'

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
            recoveryKey: '0',
        })
    }

    async addDevice(user: string, device: Device): Promise<void> {
        const devices = await this.initialize(user).then((res) => res.devices)

        devices.push(device)

        this.metadataModel.findOneAndUpdate({ user }, { devices }).exec()
    }

    async setRecoveryKey(user: string, recoveryKey: string): Promise<void> {
        // set new recovery key
        this.metadataModel.findOneAndUpdate({ user }, { recoveryKey }).exec()
    }

    async find(user: string): Promise<Metadata | null> {
        return this.metadataModel.findOne({ user }).exec()
    }

    async findDevices(user: string): Promise<Device[]> {
        return this.find(user).then((res) => res?.devices ?? [])
    }

    async findRecoveryKey(user: string): Promise<string> {
        return this.find(user).then((res) => res?.recoveryKey ?? '')
    }
}
