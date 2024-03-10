import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MetadataDocument = HydratedDocument<Metadata>

export type Device = {
    id: string
    info: string
    deviceFactorX: string
}

@Schema({ timestamps: true })
export class Metadata {
    @Prop({ required: true })
    owner: string

    @Prop({ required: true })
    devices: Device[]

    @Prop({ required: true })
    recoveryKey: string
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata)
