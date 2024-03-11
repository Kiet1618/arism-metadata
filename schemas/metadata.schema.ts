import { DeviceDto, KeyDto } from '@dtos'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MetadataDocument = HydratedDocument<Metadata>

@Schema({ timestamps: true })
export class Metadata {
    @Prop({ required: true })
    user: string

    @Prop({ required: true })
    devices: DeviceDto[]

    @Prop({ required: true })
    keys: KeyDto[]

    @Prop({ required: true })
    recoveryKey: string
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata)
