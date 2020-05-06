
import React, { useEffect} from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'

export default withRouter(function Index(props) {
    useEffect(() => {
        if(props.location.pathname === '/'){
            props.history.push('/login')
        }
    }, [props.history, props.location.pathname])
    return (
        <div className="content">
            {/* 第一层路由判断，'/login' or '/home' */}
            {renderRoutes(props.route.route)}
        </div>
    )
})
