import {API, graphqlOperation} from 'aws-amplify';
import type {GraphQLResult} from '@aws-amplify/api-graphql';
import {createTodo} from '../graphql/mutations';
import {listTodos, getUser} from '../graphql/queries';
import {createUser} from '../graphql/mutations';
import * as APIGraphQL from '../API';
import {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import {useAppSelector} from '../redux/hooks'
import {selectUserName} from '../redux/userSlice'
import '@aws-amplify/ui-react/styles.css';
import type {User, Todo} from '../API';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NewTask from './NewTask';
// import {ButtonGroup, Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

export default function MainLayout() {
    //todo shift this into useEffect, so when user signs out and component rerenders, initialState is updated to the new user
    const userName = useAppSelector(selectUserName);
    let [todos, setTodos]: [any, any] = useState([])
    useEffect(() => {
        console.log(userName)

        async function getModels() {
            const userInfo: any = await (API.graphql(graphqlOperation(getUser, {
                user: userName
            })) as Promise<GraphQLResult<APIGraphQL.GetUserQuery>>)
                .catch((err) => console.log(err))
            console.log(userInfo)
            if (userInfo.data.getUser == null) {
                console.log("creating")
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
                    console.log(todos)
                    setTodos(todos)
                } catch (err) {
                    console.log('error fetching todos')
                }
            }
        }
        getModels();
    }, [])

    return (
        <div>
            <NewTask setTodos={setTodos} todos={todos}></NewTask>
            {
                todos.map((todo: any, index: any) => (
                    <Card key={todo.id}>
                        <CardContent>
                            <p>{todo.name}</p>
                            <p>{todo.description}</p>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}

const styles = {
    container: {
        width: 400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    todo: {marginBottom: 15},
    input: {border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
    todoName: {fontSize: 20, fontWeight: 'bold'},
    todoDescription: {marginBottom: 0},
    button: {backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px'}
}