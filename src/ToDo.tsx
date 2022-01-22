import Amplify, {API, graphqlOperation, Auth} from 'aws-amplify';
import type { GraphQLResult } from '@aws-amplify/api-graphql';
import type Observable from 'zen-observable-ts';
import { createTodo } from './graphql/mutations';
import { listTodos } from './graphql/queries';
import * as APIGraphQL from './API'

import { useState, useEffect } from 'react';
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


import '@aws-amplify/ui-react/styles.css';
import {Button, ButtonGroup, Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

const initialState = { name: '', description: '' }

export default function ToDo() {
    let [formState, setFormState]: [any, Function] = useState(initialState)
    let [todos, setTodos]: [any, Function] = useState([])

    useEffect(() => {
        fetchTodos()
    }, [])

    function setInput(key: string, value: string) {
        setFormState({ ...formState, [key]: value })
    }

    async function fetchTodos() {
        try {
            const todoData: GraphQLResult<APIGraphQL.ListTodosQuery> | Observable<Object> = await API.graphql(graphqlOperation(listTodos))
            console.log(todoData);
            // const todos: APIGraphQL.ListTodosQuery = todoData.data.listTodos.items
            // setTodos(todos)
        } catch (err) {
            console.log(err)
            console.log('error fetching todos') }
    }

    async function addTodo() {
        try {
            if (!formState.name || !formState.description) return
            const todo = { ...formState }
            setTodos([...todos, todo])
            setFormState(initialState)
            await API.graphql(graphqlOperation(createTodo, {input: todo}))
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    return (
        <div>
            <h2>Amplify Todos</h2>
            <input
                onChange={event => setInput('name', event.target.value)}
                style={styles.input}
                value={formState.name}
                placeholder="Name"
            />
            <input
                onChange={event => setInput('description', event.target.value)}
                style={styles.input}
                value={formState.description}
                placeholder="Description"
            />
            <button style={styles.button} onClick={addTodo}>Create Todo</button>
            {
                todos.map((todo: any, index: any) => (
                    <div key={todo.id ? todo.id : index} style={styles.todo}>
                        <p style={styles.todoName}>{todo.name}</p>
                        <p style={styles.todoDescription}>{todo.description}</p>
                    </div>
                ))
            }
        </div>
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