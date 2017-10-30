import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/Home'
import ListEntitiesPage from './pages/Entity/List'
import ViewEntityPage from './pages/Entity/View'
import ModifyEntityPage from './pages/Entity/Modify'

const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage,
    },
    {
        path: '/entity/list/:entity',
        component: ListEntitiesPage,
    },
    {
        path: '/entity/view/:entity/:entityId',
        component: ViewEntityPage,
    },
    {
        path: '/entity/modify/:entity/:entityId',
        component: ModifyEntityPage,
    },
    {
        path: '/entity/add/:entity',
        component: ModifyEntityPage,
    },
]

export default () => (
    <Router>
        <div>
            {routes.map((route, idx) => (
                <Route
                    key={idx}
                    exact={route.exact}
                    component={route.component}
                    path={route.path}
                />
            ))}
        </div>
    </Router>
)
