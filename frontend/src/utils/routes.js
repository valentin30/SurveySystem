export const RESULTS = '/results'
export const NO_AUTH = '/no-auth'
export const AUTH = '/auth'
export const CREATE = '/create'
export const SURVEY = '/survey'
export const USER = '/user'
export const SUBMIT = '/submit'

export const BASE = process.env.REACT_APP_API_URL

export const SURVEY_URL = BASE + SURVEY
export const CREATE_SURVEY = SURVEY_URL + CREATE
export const CREATE_SURVEY_NO_AUTH = CREATE_SURVEY + NO_AUTH
export const USER_SURVEYS = SURVEY + USER

export const USER_URL = BASE + USER

export const SIGN_IN = BASE + AUTH + '/sign-in'
export const SIGN_UP = BASE + AUTH + '/sign-up'
