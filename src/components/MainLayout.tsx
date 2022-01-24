import {API, graphqlOperation} from 'aws-amplify';
import type { GraphQLResult } from '@aws-amplify/api-graphql';
import { createTodo } from '../graphql/mutations';
import {listTodos, getUser, listUsers} from '../graphql/queries';
import { createUser } from '../graphql/mutations';
import * as APIGraphQL from '../API';
import { useState, useEffect } from 'react';
import {styled} from '@mui/material/styles';
import {useAppSelector} from '../redux/hooks'
import {selectUserName} from '../redux/userSlice'
import '@aws-amplify/ui-react/styles.css';
import type { User, Todo } from '../API';
import NewTask from './NewTask'
// import {ButtonGroup, Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

export default function MainLayout() {
    //todo shift this into useEffect, so when user signs out and component rerenders, initialState is updated to the new user
    const userName = useAppSelector(selectUserName);
    const initialState = { name: '', description: '', completed: false, owner: userName }
    let [formState, setFormState]: [any, any] = useState(initialState)
    let [todos, setTodos]: [any, any] = useState([])
    useEffect(() => {
        async function getModels() {
            console.log(userName)
            const usera: any = await (API.graphql(graphqlOperation(getUser, {
                    user: userName
                })) as Promise<GraphQLResult<APIGraphQL.GetUserQuery>>)
            console.log(usera)
            if (usera == null) {
                const createdUser: any = await (API.graphql(graphqlOperation(createUser, {
                        input: {
                            user: userName
                        }
                    })) as Promise<GraphQLResult<APIGraphQL.CreateUserMutation>>)
                console.log(createdUser)
                console.log("Ha")
                const ha: any = await (API.graphql(graphqlOperation(getUser, {
                    user: userName
                })) as Promise<GraphQLResult<APIGraphQL.GetUserQuery>>)
                console.log("D")
            }
        }
        getModels();
        // fetchTodos()
    }, [])

    function setInput(key: string, value: string) {
        setFormState({ ...formState, [key]: value })
    }

    async function fetchTodos() {
        try {
            const todoData: GraphQLResult<APIGraphQL.ListTodosQuery> = await (API.graphql(graphqlOperation(listTodos)) as Promise<GraphQLResult<APIGraphQL.ListTodosQuery>>)
            const todos: any = todoData.data?.listTodos?.items //Array<Todo> doens't work
            console.log(todos)
            setTodos(todos)
        } catch (err) {
            console.log('error fetching todos') }
    }

    async function addTodo() {
        try {
            if (!formState.name) return
            const todo = { ...formState }
            setTodos([...todos, todo])
            setFormState(initialState)
            await API.graphql(graphqlOperation(createTodo, {input: todo}))
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    return (
        <NewTask></NewTask>
        // <div>
        //     <h2>Amplify Todos</h2>
        //     <NewTask></NewTask>
        //     <input
        //         onChange={event => setInput('name', event.target.value)}
        //         style={styles.input}
        //         value={formState.name}
        //         placeholder="Name"
        //     />
        //     <input
        //         onChange={event => setInput('description', event.target.value)}
        //         style={styles.input}
        //         value={formState.description}
        //         placeholder="Description"
        //     />
        //     <button style={styles.button} onClick={() => console.log("addTodo")}>Create Todo</button>
        //     {
        //         todos.map((todo: any, index: any) => (
        //             <div key={todo.id ? todo.id : index} style={styles.todo}>
        //                 <p style={styles.todoName}>{todo.name}</p>
        //                 <p style={styles.todoDescription}>{todo.description}</p>
        //             </div>
        //         ))
        //     }
        // </div>
    )
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    todo: {  marginBottom: 15 },
    input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    todoName: { fontSize: 20, fontWeight: 'bold' },
    todoDescription: { marginBottom: 0 },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}