// import router-related library
import { Navigate, useRoutes } from 'react-router-dom';

// import default layouts
import HomeLayout from './layouts/home';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// import individual pages
import Login from './pages/Login';
import Register from './pages/Register';
import HomeApp from './pages/HomeApp';
import User from './pages/User';
import NotFound from './pages/Page404';

import * as React from "react";

export default function Router(): React.ReactElement | null {
    return useRoutes([
        {
            path: '/home',
            element: <HomeLayout />,
            children: [
                { element: <Navigate to="/home/app" replace /> },
                { path: 'app', element: <HomeApp /> },
                { path: 'user', element: <User /> }
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/home" /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
