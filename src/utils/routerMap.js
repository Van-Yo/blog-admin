//routerMap.js

import Login from '../pages/Login';
import Index from '../pages/home/Index';
import AddArticle from '../pages/home/AddArticle'
import ArticleList from '../pages/home/ArticleList'
import Reviews from '../pages/home/Reviews'
import Home from '../pages/home/Home'

export default [{
        path: "/",
        component: Login,
        exact: true
    },
    {
        path: "/index",
        component: Index,
        route:[
            {
                path:"/index/",
                component:Home
            },
            {
                path:"/index/add",
                component:AddArticle
            },
            {
                path:"/index/articleList",
                component:ArticleList
            },
            {
                path:"/index/reviews",
                component:Reviews
            },
        ]
    }
]