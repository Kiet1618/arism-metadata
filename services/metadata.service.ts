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

    async addDevice(owner: string, device: Device): Promise<void> {
        const devices = await this.find(owner).then((res) => res.devices)

        devices.push(device)

        this.metadataModel.findOneAndUpdate({ owner }, { devices }).exec()
    }

    async addRecoveryKey(owner: string, recoveryKey: string): Promise<void> {
        this.metadataModel.findOneAndUpdate({ owner }, { recoveryKey }).exec()
    }

    async find(owner: string): Promise<Metadata> {
        return this.metadataModel.findOne({ owner }).exec()
    }

    async findDevices(owner: string): Promise<Device[]> {
        return this.find(owner).then((res) => res.devices)
    }

    async findRecoveryKey(owner: string): Promise<string> {
        return this.find(owner).then((res) => res.recoveryKey)
    }
}
