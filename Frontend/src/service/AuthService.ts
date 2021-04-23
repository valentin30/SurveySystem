import { AuthRequest } from '../dto/auth/AuthRequest'
import { CreateUserRequest } from '../dto/auth/CreateUserRequest'
import { TokenResponse } from '../dto/auth/TokenResponse'
import { SIGN_IN_URL, SIGN_UP_URL } from '../utils/routes'

export class AuthService {
    static async signIn(data: AuthRequest): Promise<TokenResponse> {
        const response: Response = await fetch(SIGN_IN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Wrong email or password')
        }

        const tokenResponse: TokenResponse = await response.json()

        return tokenResponse
    }

    static async signUp(data: CreateUserRequest): Promise<TokenResponse> {
        const response: Response = await fetch(SIGN_UP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error('Email already in use.')
        }

        const tokenResponse: TokenResponse = await response.json()

        return tokenResponse
    }
}
