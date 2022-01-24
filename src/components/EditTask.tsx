import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import {useState, MouseEvent} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import {updateTodo} from "../graphql/mutations";
import {Todo} from '../API';
import {listTodos} from "../graphql/queries";
import {GraphQLResult} from "@aws-amplify/api-graphql";
import * as APIGraphQL from "../API";

interface priorityFunction {
    setPriority(priority: string): void
    originalValue: string | null | undefined
}

interface editState {
    setEditMode(editMode: string): void
    editMode: string
    todos: Array<Todo>,
    setTodos(todos: Array<Todo>): void
}

function PriorityGroup(props: priorityFunction) {
    const [alignment, setAlignment] = useState<string | null | undefined>(props.originalValue);

    const handleAlignment = (
        event: MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
        if (newAlignment == null) {
            props.setPriority('normal');
        } else {
            props.setPriority(newAlignment);
        }
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value="normal">Normal Priority</ToggleButton>
            <ToggleButton value="urgent">Urgent</ToggleButton>
        </ToggleButtonGroup>
    );
}

export default function EditTask(props: editState) {
    const todoToUpdate: Todo = (props.todos.filter((x: Todo) => x.id === props.editMode))[0];
    const initialState = todoToUpdate;
    // console.log(initialState)
    let [formState, setFormState]: [any, any] = useState(initialState);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        const setEditMode = props.setEditMode;
        setEditMode("");
    };

    function setPriority(priority: string) {
        setFormState({...formState, ['priority']: priority});
    }

    function setInput(key: string, value: string) {
        setFormState({...formState, [key]: value});
    }

    const handleSubmit = async () => {
        try {
            const todo = {
                id: formState.id,
                name: formState.name,
                description: formState.description,
                deadline: formState.deadline,
                priority: formState.priority,
                completed: formState.completed,
                userID: formState.userID
            };
            await API.graphql(graphqlOperation(updateTodo, {input: todo}))
            const todoData: GraphQLResult<APIGraphQL.ListTodosQuery> = await (API.graphql(graphqlOperation(listTodos,
                {filter: {userID: {contains: todoToUpdate.userID}}})) as Promise<GraphQLResult<APIGraphQL.ListTodosQuery>>)
            const todos: any = todoData.data?.listTodos?.items //Array<Todo> doens't work
            props.setTodos(todos)
            handleClose();
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    return (
        <Grid
            display="flex" justifyContent="center"
        >
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Task Name"
                        type="text"
                        required={true}
                        defaultValue={todoToUpdate.name}
                        fullWidth
                        variant="standard"
                        onChange={(event) => setInput('name', event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={todoToUpdate.description}
                        onChange={(event) => setInput('description', event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="deadline"
                        label="Deadline"
                        type="date"
                        fullWidth
                        variant="standard"
                        defaultValue={todoToUpdate.deadline}
                        onChange={(event) => setInput('deadline', String(event.target.value))}
                    />
                    <PriorityGroup setPriority={setPriority} originalValue={todoToUpdate.priority}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={async () => await handleSubmit()}>Save</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
