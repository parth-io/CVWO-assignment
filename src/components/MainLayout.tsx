import {API, graphqlOperation} from 'aws-amplify';
import type {GraphQLResult} from '@aws-amplify/api-graphql';
import {listTodos, getUser} from '../graphql/queries';
import {createUser, deleteTodo, updateTodo} from '../graphql/mutations';
import * as APIGraphQL from '../API';
import {useState, useEffect, MouseEvent} from 'react';
import {useAppSelector} from '../redux/hooks'
import {selectUserName} from '../redux/userSlice'
import type {Todo} from '../API';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent';
import NewTask from './NewTask';
import EditTask from './EditTask';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import {selectSearchState} from "../redux/searchSlice";
import Typography from '@mui/material/Typography';

export default function MainLayout() {
    const userName = useAppSelector(selectUserName);
    const searchState = useAppSelector(selectSearchState);
    let [todos, setTodos]: [Array<Todo>, any] = useState([])
    let [editMode, setEditMode] = useState("") //unnecessary type [false, Dispatch<SetStateAction<false>>]
    useEffect(() => {
        async function getModels() {
            const userInfo: any = await (API.graphql(graphqlOperation(getUser, {
                user: userName
            })) as Promise<GraphQLResult<APIGraphQL.GetUserQuery>>)
                .catch((err) => console.log(err))
            console.log(userInfo)
            if (userInfo.data.getUser == null) {
                const createdUser = await (API.graphql(graphqlOperation(createUser, {
                    input: {
                        user: userName
                    }
                })) as Promise<GraphQLResult<APIGraphQL.CreateUserMutation>>);
            } else {
                try {
                    const todoData: GraphQLResult<APIGraphQL.ListTodosQuery> = await (API.graphql(graphqlOperation(listTodos,
                        {filter: {userID: {contains: userName}}})) as Promise<GraphQLResult<APIGraphQL.ListTodosQuery>>)
                    const todos: any = todoData.data?.listTodos?.items //todo fix, typecasting as Array<Todo> doesn't work
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
            await API.graphql(graphqlOperation(deleteTodo, {input: {id: id}}));
            setTodos(todos.filter((x: Todo) => x.id !== id));
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    const handleCompletion = async (id: string) => {
        try {
            const currentTodo = (todos.filter((x: Todo) => x.id === id))[0];
            const completedTodo = {
                id: currentTodo.id,
                name: currentTodo.name,
                description: currentTodo.description,
                deadline: currentTodo.deadline,
                priority: currentTodo.priority,
                completed: currentTodo.completed,
                category: currentTodo.category,
                userID: currentTodo.userID
            };
            completedTodo.completed = !completedTodo.completed;
            currentTodo.completed = !currentTodo.completed;
            await API.graphql(graphqlOperation(updateTodo, {input: completedTodo}));
            const remainingTodos = todos.filter((x: Todo) => x.id !== id);
            remainingTodos.push(currentTodo);
            setTodos(remainingTodos);
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    const handleTaskEdit = (id: string) => {
        setEditMode(id);
    }

    const filterBySearch = (todo: any) => {
        const properties = ['name', 'description', 'deadline', 'priority', 'category']
        for (let i = 0; i < properties.length; i++) {
            const prop = properties[i];
            if (todo[prop].toLowerCase().includes(searchState)) {
                return todo;
            }
        }
    }

    return (
        <div>
            <NewTask setTodos={setTodos} todos={todos}></NewTask>
            {editMode !== "" ? <EditTask todos={todos} setTodos={setTodos} editMode={editMode}
                                         setEditMode={setEditMode}></EditTask> : null}
            {
                todos.filter(filterBySearch).map((todo: Todo, index: any) => (
                    <Card key={todo.id} style={todo.priority === 'urgent' ? {backgroundColor: "red"} : {}}>
                        <CardActionArea id={todo.id}
                                        onClick={(e: MouseEvent<HTMLElement>) => handleTaskEdit(e.currentTarget.id)}>
                            <CardContent>
                                <Typography component={'div'} style={{ textDecoration: todo.completed ? 'line-through' : 'none'}} >
                                    <p>{todo.name}</p>
                                    <p>{todo.description}</p>
                                    <p>{todo.deadline}</p>
                                    <p>{todo.category}</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button id={todo.id}
                                    onClick={async (e: MouseEvent<HTMLElement>) => await handleDelete(e.currentTarget.id)}>Delete
                                task</Button>
                            <Button id={todo.id}
                                    onClick={async (e: MouseEvent<HTMLElement>) => await handleCompletion(e.currentTarget.id)}>Mark
                                Completed</Button>
                        </CardActions>
                    </Card>
                ))
            }
        </div>
    )
}