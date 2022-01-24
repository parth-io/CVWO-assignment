import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import { useState, MouseEvent } from 'react';

function PriorityGroup() {
    const [alignment, setAlignment] = useState<string | null>('normal');

    const handleAlignment = (
        event: MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
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

export default function NewTask() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
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
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="normal"
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                    />
                    <PriorityGroup />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
