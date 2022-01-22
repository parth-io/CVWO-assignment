// import React, { useEffect, useState } from 'react';
import Amplify, {API, graphqlOperation, Auth, AuthModeStrategyType} from 'aws-amplify';
// import { createTodo } from './graphql/mutations';
// import { listTodos } from './graphql/queries';
// import { withAuthenticator } from '@aws-amplify/ui-react';
import Router from './router-routes';
import {Link as RouterLink, Outlet, useNavigate, Navigate} from "react-router-dom";

import * as React from 'react';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import {useAppSelector, useAppDispatch} from './redux/hooks'

import {
    authenticated,
    unauthenticated,
    selectUserName,
    setUserName,
    selectAuthState
} from './redux/userSlice'

import {CognitoUser} from 'amazon-cognito-identity-js';
import awsExports from "./aws-exports";

import '@aws-amplify/ui-react/styles.css';
import {Authenticator} from '@aws-amplify/ui-react';
// import Home from "./layouts/home";
import HomeApp from './pages/HomeApp';
import User from './pages/User';
import {Button, ButtonGroup, Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import {BaseOptionChartStyle} from './components/charts/BaseOptionChart';

Amplify.configure({
    ...awsExports,
    DataStore: {
        authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
    }
})


// export default function App() {
//     Auth.currentCredentials()
//         .then(d => console.log('data: ', d))
//         .catch(e => console.log('error: ', e))
// }

const Test = (props: any): JSX.Element => {
    const dispatch = useAppDispatch();
    const doUp = () => {
        dispatch(authenticated());
        dispatch(setUserName(props.user.username));
    }
    doUp();
    return (
        <Navigate to={"/app/home"} replace={true}/>
    )
}

//todo fix UI styling
//todo fix sign out button doesn't disappear/appear unless page is refreshed
export const Authss = (): JSX.Element => {
    return (
        <Authenticator variation="modal">
            {({signOut, user}) => <Test user={user} signOut={signOut}/>}
        </Authenticator>
    )
}

// export default function App() {
//     return (
//         <div>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     '& > *': {
//                         m: 1,
//                     },
//                 }}
//             >
//                 <ButtonGroup>
//                     <Button size="large" component={RouterLink} to="/app/home">Continue as Guest</Button>
//                     <Button size="large" component={RouterLink} to="/login">Log in/Sign up</Button>
//                 </ButtonGroup>
//             </Box>
//         </div>
// todo add to readme amplify auth, go, graphql, material UI, unauth, serviceworker, redux, also when user logs in, state changes and component rerenders
//todo use button base
// <ThemeConfig>
//     <ScrollToTop />
//     <GlobalStyles />
//     <BaseOptionChartStyle />
//         <Routes>
//             <Route path="/" element={<HomeApp />} />
//             <Route path="about" element={<About />} />
//         </Routes>
// </ThemeConfig>
// );
// }

const panels = [
    {
        title: '"I am a guest"',
        width: '50%',
        to: "/app/home"
    },
    {
        title: '"I have an account" / "Help me create one"',
        width: '50%',
        to: "/login"
    }
];

const PanelButton = styled(ButtonBase)(({theme}) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 200,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        }
    }
}));

const Panel = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const PanelBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'blue',
    opacity: 0.67,
    transition: theme.transitions.create('opacity'),
}));

const PanelMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function App() {
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, height: '100%', width: '100%'}}>
            {panels.map((panel) => (
                <PanelButton
                    focusRipple
                    key={panel.title}
                    style={{
                        width: panel.width
                    }}
                    onClick={async () => {
                        navigate(panel.to)
                    }}
                >
                    <PanelBackdrop className="MuiImageBackdrop-root"/>
                    <Panel>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {panel.title}
                            <PanelMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Panel>
                </PanelButton>
            ))}
        </Box>
    );
}
