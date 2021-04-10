import { USER_URL } from '../utils/routes'

export class UserService {
    static getUserInformation(token) {
        return fetch(USER_URL, {
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then(res => res.json())
    }
}
