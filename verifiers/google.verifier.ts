import { HttpService } from '@nestjs/axios'


const TOKEN_INFO_GOOGLE_API = 'https://www.googleapis.com/oauth2/v3/tokeninfo'

export const googleVerifier = async (token: string, owner: string) => {
	try {
		const httpService = new HttpService()
		const response = await httpService.get(`${TOKEN_INFO_GOOGLE_API}?id_token=${token}`).toPromise()
		const { email } = response.data
		if (email !== owner) {
			return null
		}
		else {
			return email
		}
	} catch (error) {
		return null
	}
}
