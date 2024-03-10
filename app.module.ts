import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import configuration from '@config'
import * as controllers from '@controllers'
import * as services from '@services'
import { Metadata, MetadataSchema } from '@schemas'
import { GoogleVerifier } from '@verifiers/google.verifier'

@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: configService.get<string>('database.mongoUri'),
                }
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: Metadata.name, schema: MetadataSchema },
        ]),
        ConfigModule,
    ],
    controllers: [].concat(Object.values(controllers)),
    providers: [].concat(Object, Object.values(services), GoogleVerifier),
})
export class AppModule {}
