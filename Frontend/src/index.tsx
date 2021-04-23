import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Layout } from './components/Layout/Layout'
import { theme } from './config/theme'
import { AuthContextProvider } from './context/AuthContext'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <ChakraProvider theme={theme}>
                    <Layout>
                        <App />
                    </Layout>
                </ChakraProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
