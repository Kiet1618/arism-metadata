import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Metadata, MetadataDocument } from '@schemas'

@Injectable()
export class MetadataService {
    constructor(
        @InjectModel(Metadata.name) private metadataModel: Model<MetadataDocument>,
    ) { }

    async create(metadata: Metadata): Promise<Metadata> {
        const createdMetadata = new this.metadataModel(metadata)
        return createdMetadata.save()
    }

    async findAll(): Promise<Metadata[]> {
        return this.metadataModel.find().exec()
    }

    async findByOwner(owner: string): Promise<Metadata> {
        return this.metadataModel.findOne({ owner }).exec()
    }
}
