import Amplify, { AuthModeStrategyType} from 'aws-amplify';
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import awsExports from "./aws-exports";
import '@aws-amplify/ui-react/styles.css';
import Box from '@mui/material/Box';

Amplify.configure({
    ...awsExports,
    DataStore: {
        authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
    }
})
// AWS.config.correctClockSkew = true

const panels = [
    {
        title: '"I am a guest"',
        width: '50%',
        to: "/guest/login"
    },
    {
        title: '"I have an account" / "Help me create one"',
        width: '50%',
        to: "/login"
    }
];

const PanelButton = styled(ButtonBase)(({theme}) => ({
    height: 200,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        height: 200,
        width: '100% !important'
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        }
    }
}));

const Panel = styled('span')(({ theme }) => ({
    alignItems: 'center',
    color: theme.palette.common.white,
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    position: 'absolute',
}));

const PanelBackdrop = styled('span')(({theme}) => ({
    backgroundColor: 'blue',
    opacity: 0.67,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    transition: theme.transitions.create('opacity'),
}));

const PanelMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    bottom: -2,
    left: 'calc(50% - 9px)',
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    transition: theme.transitions.create('opacity'),
}));

export default function App() {
    const navigate = useNavigate();
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', minWidth: 300, height: '100%', width: '100%'}}>
            {panels.map((panel) => (
                <PanelButton
                    focusRipple
                    key={panel.title}
                    style={{
                        width: panel.width
                    }}
                    onClick={async () => {
                        navigate(panel.to)
                    }}
                >
                    <PanelBackdrop className="MuiImageBackdrop-root"/>
                    <Panel>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {panel.title}
                            <PanelMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Panel>
                </PanelButton>
            ))}
        </Box>
    );
}
