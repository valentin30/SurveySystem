export const RESULTS: string = '/results'
export const NO_AUTH: string = '/no-auth'
export const AUTH: string = '/auth'
export const CREATE: string = '/create'
export const SURVEY: string = '/survey'
export const USER: string = '/user'
export const SUBMIT: string = '/submit'
export const SIGN_IN: string = '/sign-in'
export const SIGN_UP: string = '/sign-up'
export const PUBLIC_KEY: string = '/:publicKey'
export const PRIVATE_KEY: string = '/:privateKey'
export const ID: string = '/:id'
export const CLOSE: string = '/close'

export const BASE: string = process.env.REACT_APP_API_URL as string
export const SURVEY_URL: string = BASE + SURVEY
export const CREATE_SURVEY: string = SURVEY_URL + CREATE
export const CREATE_SURVEY_NO_AUTH: string = CREATE_SURVEY + NO_AUTH
export const USER_SURVEYS: string = SURVEY_URL + USER
export const USER_URL: string = BASE + USER
export const SIGN_IN_URL: string = BASE + AUTH + SIGN_IN
export const SIGN_UP_URL: string = BASE + AUTH + SIGN_UP
