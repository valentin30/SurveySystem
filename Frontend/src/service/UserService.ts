import { UserDataResponse } from '../dto/user/UserDataResponse'
import { USER_URL } from '../utils/routes'

export class UserService {
    static async getUserInformation(token: string): Promise<UserDataResponse> {
        const response: Response = await fetch(USER_URL, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        })

        if (response.status === 400) {
            throw new Error('Plaese make sure you provide all the information!')
        }

        if (!response.ok) {
            throw new Error('Not Authenticated!')
        }

        const data: UserDataResponse = await response.json()

        return data
    }
}
