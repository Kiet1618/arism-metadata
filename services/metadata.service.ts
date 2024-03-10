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

    async create(metadata: Metadata): Promise<Metadata> {
        const createdMetadata = new this.metadataModel(metadata)
        return createdMetadata.save()
    }

    async addDevice(user: string, device: Device): Promise<void> {
        const devices = await this.find(user).then((res) => res.devices)

        devices.push(device)

        this.metadataModel.findOneAndUpdate({ user }, { devices }).exec()
    }

    async addRecoveryKey(user: string, recoveryKey: string): Promise<void> {
        this.metadataModel.findOneAndUpdate({ user }, { recoveryKey }).exec()
    }

    async find(user: string): Promise<Metadata> {
        return this.metadataModel.findOne({ user }).exec()
    }

    async findDevices(user: string): Promise<Device[]> {
        return this.find(user).then((res) => res.devices)
    }

    async findRecoveryKey(user: string): Promise<string> {
        return this.find(user).then((res) => res.recoveryKey)
    }
}
