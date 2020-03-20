import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"
import Routers from '../utils/routerMap'

export default function Main() {
    return (
        <div>
            <Router>
                {/* <Route path="/index">
                    <Index/>
                </Route>
                <Route path="/" exact>
                    <Login/>
                </Route> */}
                {
                    Routers.map((item, index) => {
                        if(item.exact){
                            return (
                                <Route key={index} path={item.path} component={item.component} exact
                                    render={
                                        props=>(
                                            <item.component {...props} routes={item.route} />
                                        )
                                    }
                                />
                            )
                        }else{
                            return (
                                <Route key={index} path={item.path} component={item.component}
                                    render={
                                        props=>(
                                            <item.component {...props} routes={item.route} />
                                        )
                                    }
                                />
                            )
                        }
                        
                    })
                }
            </Router>
        </div>
    )
}
