//routerMap.js
import Index from '../pages'
import Login from '../pages/Login';
import Home from '../pages/Home';
import Reviews from '../pages/Home/Reviews'
import Controller from '../pages/Home/Controller'
import Article from '../pages/Article'
import AddArticle from '../pages/Article/AddArticle'
import ArticleList from '../pages/Article/ArticleList'


export default [
    {
        path: "/",
        component: Index,
        route:[
            {
                path:"/login",
                component:Login,
                route:[]
            },
            {
                path: "/home",
                component: Home,
                route:[
                    {
                        path:"/home/controller",
                        component:Controller
                    },
                    {
                        path:"/home/reviews",
                        component:Reviews
                    },
                    {
                        path:"/home/article",
                        component:Article,
                        route:[
                            {
                                path:"/home/article/add",
                                component:AddArticle,
                                exact: true
                            },
                            {
                                path:"/home/article/edit/:id",
                                component:AddArticle
                            },
                            {
                                path:"/home/article/list/:status",
                                component:ArticleList
                            },
                        ]
                    }
                    
                ]
            }
        ]
    },
    
    
]