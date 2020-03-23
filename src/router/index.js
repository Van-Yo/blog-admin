import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import routerMap  from './routerMap'

const Router = () => (
    <BrowserRouter>{renderRoutes(routerMap)}</BrowserRouter>
)

export default Router