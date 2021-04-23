import React, { FunctionComponent, useState } from 'react'

export interface IAuthContext {
    token: string | null
    setToken: (token: string) => void
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider: FunctionComponent = props => {
    const [token, setToken] = useState<string | null>(null)

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {props.children}
        </AuthContext.Provider>
    )
}
