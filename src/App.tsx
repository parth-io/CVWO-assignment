// import React, { useEffect, useState } from 'react';
import Amplify, {API, graphqlOperation, Auth} from 'aws-amplify';
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

Amplify.configure(awsExports);

// const initialState = { name: '', description: '' }
//
// const App = () => {
//     const [formState, setFormState] = useState(initialState)
//     const [todos, setTodos] = useState([])
//
//     useEffect(() => {
//         fetchTodos()
//     }, [])
//
//     function setInput(key, value) {
//         setFormState({ ...formState, [key]: value })
//     }
//
//     async function fetchTodos() {
//         try {
//             const todoData = await API.graphql(graphqlOperation(listTodos))
//             const todos = todoData.data.listTodos.items
//             setTodos(todos)
//         } catch (err) { console.log('error fetching todos') }
//     }
//
//     async function addTodo() {
//         try {
//             if (!formState.name || !formState.description) return
//             const todo = { ...formState }
//             setTodos([...todos, todo])
//             setFormState(initialState)
//             await API.graphql(graphqlOperation(createTodo, {input: todo}))
//         } catch (err) {
//             console.log('error creating todo:', err)
//         }
//     }
//
//     return (
//         <div style={styles.container}>
//             <h2>Amplify Todos</h2>
//             <input
//                 onChange={event => setInput('name', event.target.value)}
//                 style={styles.input}
//                 value={formState.name}
//                 placeholder="Name"
//             />
//             <input
//                 onChange={event => setInput('description', event.target.value)}
//                 style={styles.input}
//                 value={formState.description}
//                 placeholder="Description"
//             />
//             <button style={styles.button} onClick={addTodo}>Create Todo</button>
//             {
//                 todos.map((todo, index) => (
//                     <div key={todo.id ? todo.id : index} style={styles.todo}>
//                         <p style={styles.todoName}>{todo.name}</p>
//                         <p style={styles.todoDescription}>{todo.description}</p>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }
//
// const styles = {
//     container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
//     todo: {  marginBottom: 15 },
//     input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
//     todoName: { fontSize: 20, fontWeight: 'bold' },
//     todoDescription: { marginBottom: 0 },
//     button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
// }


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
        }
    }
}));

const PanelBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
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
                    <Typography>
                        {panel.title}
                    </Typography>
                </PanelButton>
            ))}
        </Box>
    );
}
