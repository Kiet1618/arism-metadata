import { get } from '@helpers/httpRequest'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

const TOKEN_INFO_GOOGLE_API = 'https://www.googleapis.com/oauth2/v3/tokeninfo'

@Injectable()
export class GoogleVerifier {
    constructor(private readonly httpService: HttpService) {}

    async verify(id_token: string, user: string): Promise<boolean> {
        const response = await get(
            this.httpService,
            TOKEN_INFO_GOOGLE_API +
                '?id_token=' +
                id_token.replace('Bearer ', '')
        )

        if (response.data.email === user) {
            return true
        }

        return false
    }
}
