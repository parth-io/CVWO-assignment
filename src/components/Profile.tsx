import {API, graphqlOperation} from 'aws-amplify';
import type {GraphQLResult} from '@aws-amplify/api-graphql';
import {listTodos, getUser} from '../graphql/queries';
import {createTodo, createUser, deleteTodo, deleteUser} from '../graphql/mutations';
import * as APIGraphQL from '../API';
import {useState, useEffect, MouseEvent, Dispatch, SetStateAction} from 'react';
import {styled} from '@mui/material/styles';
import {useAppSelector} from '../redux/hooks'
import {selectUserName} from '../redux/userSlice'
import '@aws-amplify/ui-react/styles.css';
import type {User, Todo} from '../API';
import Button from '@mui/material/Button'
// import {ButtonGroup, Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

export default function Profile() {
    //todo shift this into useEffect, so when user signs out and component rerenders, initialState is updated to the new user
    const userName = useAppSelector(selectUserName);
    let [todos, setTodos]: [Array<Todo>, any] = useState([])
    useEffect(() => {
        // console.log(userName)
        async function getModels() {
            const userInfo: any = await (API.graphql(graphqlOperation(getUser, {
                user: userName
            })) as Promise<GraphQLResult<APIGraphQL.GetUserQuery>>)
                .catch((err) => console.log(err))
            // console.log(userInfo)
            if (userInfo.data.getUser == null) {
                // console.log("creating")
                const createdUser = await (API.graphql(graphqlOperation(createUser, {
                    input: {
                        user: userName
                    }
                })) as Promise<GraphQLResult<APIGraphQL.CreateUserMutation>>);
                // console.log(createdUser)
            } else {
                try {
                    const todoData: GraphQLResult<APIGraphQL.ListTodosQuery> = await (API.graphql(graphqlOperation(listTodos,
                        {filter: {userID: {contains: userName}}})) as Promise<GraphQLResult<APIGraphQL.ListTodosQuery>>)
                    const todos: any = todoData.data?.listTodos?.items //Array<Todo> doens't work
                    setTodos(todos)
                } catch (err) {
                    console.log('error fetching todos')
                }
            }
        }

        getModels();
    }, [])

    const handleDeleteData = async () => {
        try {
            const promises = todos.map(async todo => {
                return API.graphql(graphqlOperation(deleteTodo, {input: {id: todo.id}}));
            })
            const resolvedPromises = await Promise.all(promises);
            console.log("Deleted all data")
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await handleDeleteData();
            await API.graphql(graphqlOperation(deleteUser, {input: {user: userName}}));
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    return (
        <div>
            <Button onClick={handleDeleteData}>
                Delete User Data
            </Button>
            <Button onClick={handleDeleteAccount}>
                Delete User Account
            </Button>
        </div>
    )
}