import {API, graphqlOperation} from 'aws-amplify';
import type {GraphQLResult} from '@aws-amplify/api-graphql';
import {listTodos, getUser} from '../graphql/queries';
import {createTodo, createUser, deleteTodo} from '../graphql/mutations';
import * as APIGraphQL from '../API';
import {useState, useEffect, MouseEvent, Dispatch, SetStateAction} from 'react';
import {styled} from '@mui/material/styles';
import {useAppSelector} from '../redux/hooks'
import {selectUserName} from '../redux/userSlice'
import '@aws-amplify/ui-react/styles.css';
import type {User, Todo} from '../API';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent';
import NewTask from './NewTask';
import EditTask from './EditTask';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import {nanoid} from "nanoid";
// import {ButtonGroup, Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

export default function MainLayout() {
    //todo shift this into useEffect, so when user signs out and component rerenders, initialState is updated to the new user
    const userName = useAppSelector(selectUserName);
    let [todos, setTodos]: [Array<Todo>, any] = useState([])
    let [editMode, setEditMode] = useState("") //: [false, Dispatch<SetStateAction<false>>]
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

    const handleDelete = async (id: string) => {
        try {
            const res = await API.graphql(graphqlOperation(deleteTodo, {input: {id: id}}));
            setTodos(todos.filter((x: Todo) => x.id !== id));
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    const handleTaskEdit = (id: string) => {
        setEditMode(id);
    }

    return (
        <div>
            <NewTask setTodos={setTodos} todos={todos}></NewTask>
            { editMode !== "" ? <EditTask todos={todos} setTodos={setTodos} editMode={editMode} setEditMode={setEditMode}></EditTask> : null}
            {
                todos.map((todo: any, index: any) => (
                    <Card key={todo.id}>
                        <CardActionArea id={todo.id} onClick={(e: MouseEvent<HTMLElement>) => handleTaskEdit(e.currentTarget.id)}>
                            <CardContent>
                                <p>{todo.name}</p>
                                <p>{todo.description}</p>
                                <p>{todo.deadline}</p>
                                <p>{todo.completed}</p>
                                <p>{todo.priority}</p>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button id={todo.id}
                                    onClick={async (e: MouseEvent<HTMLElement>) => await handleDelete(e.currentTarget.id)}>Delete
                                task</Button>
                        </CardActions>
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