import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { MetadataService } from '@services'
import { CreateMetadataDto } from '@dtos'
import { googleVerifier } from '@verifiers/google.verifier'

@Controller()
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) { }

    @Get()
    async findAll() {
        return this.metadataService.findAll()
    }

    // find by owner

    @Get("/:owner")
    async findByOwner(@Param('owner') owner: string) {
        return this.metadataService.findByOwner(owner)
    }

    // create metadata

    @Post()
    async create(@Body() metadata: CreateMetadataDto) {
        const verify = await googleVerifier(metadata.idToken, metadata.owner)
        if (!verify) {
            throw new Error('Invalid token')
        }
        return this.metadataService.create({
            owner: metadata.owner,
            devices: metadata.devices,
            recoveryFactorX: metadata.recoveryFactorX
        })
    }
}