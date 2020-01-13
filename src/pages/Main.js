import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"
import Login from './Login'
import Index from './Index'

export default function Main() {
    return (
        <div>
            <Router>
                <Route path="/login/">
                    <Login/>
                </Route>
                <Route path="/index/">
                    <Index/>
                </Route>
            </Router>
        </div>
    )
}
