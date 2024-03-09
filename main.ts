import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)

    app.enableCors(
        {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true,
        }
    );
    app.useGlobalPipes(new ValidationPipe())

    const configService = app.get(ConfigService)
    const host = configService.get<string>('host')
    const port = configService.get<number>('port')

    await app.listen(port)
    Logger.log(`🚀 Listening HTTP at ${host}:${port}`, 'HTTP')
}

bootstrap()
