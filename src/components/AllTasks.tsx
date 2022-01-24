import {MouseEvent, useState} from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

export default function PriorityGroup() {
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