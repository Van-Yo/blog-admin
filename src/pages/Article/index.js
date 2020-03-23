
import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter} from 'react-router-dom'

export default memo(withRouter(function Article(props) {
    // useEffect(() => {
    //     if(props.location.pathname === '/'){
    //         props.history.push('/login')
    //     }
    // }, [props.history, props.location.pathname])
    return (
        <div>
            <div className="article">
                {/* 第三层路由判断，'/home/article/add' or '/home/article/list' */}
                {renderRoutes(props.route.route)}
            </div>
        </div>
    )
}))
