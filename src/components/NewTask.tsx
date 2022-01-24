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
import {createTodo} from "../graphql/mutations";
import {useAppSelector} from "../redux/hooks";
import {selectUserName} from "../redux/userSlice";
import {Todo} from '../API';
import { nanoid } from 'nanoid';

interface priorityFunction {
    setPriority(priority: string): void
}

interface todosState {
    setTodos(todos: Array<Todo>): void
    todos: Array<Todo>
}

function PriorityGroup(props: priorityFunction) {
    const [alignment, setAlignment] = useState<string | null>('normal');

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

export default function NewTask(props: todosState) {
    const userName = useAppSelector(selectUserName);
    const initialState = {name: '', description: '', completed: false, userID: userName, priority: 'normal', deadline: ''}
    let [formState, setFormState]: [any, any] = useState(initialState)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function setPriority(priority: string) {
        setFormState({...formState, ['priority']: priority})
    }

    function setInput(key: string, value: string) {
        setFormState({...formState, [key]: value})
    }

    const handleSubmit = async () => {
        try {
            const todo = {...formState, id: nanoid()}
            await API.graphql(graphqlOperation(createTodo, {input: todo}))
            const allTodos = props.todos
            props.setTodos([...allTodos, todo])
            setFormState(initialState)
            setOpen(false);
        } catch (err: any) {
            console.log('error creating todo:', err.errors[0].message)
        }
    };

    return (
        <Grid
            display="flex" justifyContent="center"
        >
            <Button variant="outlined" onClick={handleClickOpen}>
                Create a new task
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Task Name"
                        type="text"
                        required={true}
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
                        onChange={(event) => setInput('deadline', String(event.target.value))}
                    />
                    <PriorityGroup setPriority={setPriority}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={async () => await handleSubmit()}>Create</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
