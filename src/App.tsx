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

// todo add to readme amplify auth, go, graphql, material UI, unauth, serviceworker, redux, also when user logs in, state changes and component rerenders
//todo use button base
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
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 200,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        }
    }
}));

const Panel = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const PanelBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'blue',
    opacity: 0.67,
    transition: theme.transitions.create('opacity'),
}));

const PanelMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
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
