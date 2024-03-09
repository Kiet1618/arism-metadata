import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import BN from 'bn.js'

export type MetadataDocument = HydratedDocument<Metadata>

export type Device = {
    id: string
    info: string
    deviceFactorX: BN
}

@Schema({ timestamps: true })
export class Metadata {
    @Prop({ required: true })
    owner: string

    @Prop({ required: true })
    devices: Device[]

    @Prop({ required: true })
    recoveryFactorX: BN
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata)