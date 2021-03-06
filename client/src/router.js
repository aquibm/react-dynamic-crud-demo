import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/Home'
import ListEntitiesPage from './pages/Entity/List'
import ViewEntityPage from './pages/Entity/View'
import UpsertEntityHoc from './pages/Entity/UpsertEntityHoc'

const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage,
    },
    {
        path: '/entity/list/:entityType',
        component: ListEntitiesPage,
    },
    {
        path: '/entity/view/:entityType/:entityId',
        component: ViewEntityPage,
    },
    {
        path: '/entity/edit/:entityType/:entityId',
        component: UpsertEntityHoc,
    },
    {
        path: '/entity/add/:entityType',
        component: UpsertEntityHoc,
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
