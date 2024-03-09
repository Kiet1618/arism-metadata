import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { MetadataService } from '@services'
import { CreateMetadataDto } from '@dtos'

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
        return this.metadataService.create(metadata)
    }
}