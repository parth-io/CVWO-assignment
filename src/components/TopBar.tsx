import Button from '@mui/material/Button';
import {Auth} from 'aws-amplify';
import {useState, MouseEvent, useEffect, useRef} from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate, Outlet} from "react-router-dom";
import {useAppSelector} from '../redux/hooks';
import {selectAuthState} from '../redux/userSlice';
import {selectSearchState} from '../redux/searchSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import debounce from 'lodash/debounce';
import {useAppDispatch} from "../redux/hooks";
import {setSearchString} from "../redux/searchSlice";

const Search = styled('div')(({theme}) => ({
    width: '100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        padding: theme.spacing(1, 1, 1, 0),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function SearchWrapper(): JSX.Element {
    let [searchText, setSearchText] = useState('');
    const dispatch = useAppDispatch();
    dispatch(setSearchString(searchText.toLowerCase()));
    // const searchState = useAppSelector(selectSearchState);
    const conductSearch = (searchString: string) => {
        setSearchText(searchString);
    }
    const debounced = useRef(
        debounce((searchString: string) => conductSearch(searchString), 500)
    ).current;
    const handleSearch = async (searchString: string) => {
        debounced(searchString);
    };
    useEffect(() => {
        return () => {
            debounced.cancel();
        };
    }, [debounced]);
    return (<Search>
        <SearchIconWrapper>
            <SearchIcon/>
        </SearchIconWrapper>
        <StyledInputBase
            placeholder="Search…"
            onChange={(event) => handleSearch(event.target.value)}
            inputProps={{'aria-label': 'search'}}
        />
    </Search>)
}

export default function TopBar() {
    const navigate = useNavigate();
    const userAuthState = useAppSelector(selectAuthState);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfile = () => {
        navigate("/app/profile");
        handleClose();
    };
    const handleHome = () => {
        navigate("/app/home");
        handleClose();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            id="main-menu"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{mr: 2}}
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="main-menu"
                            aria-labelledby="main-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={handleHome}>Home</MenuItem>
                            <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        </Menu>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                        >
                            To-Do App
                        </Typography>
                        <SearchWrapper/>
                        <div> {userAuthState ? <Button
                            size="large"
                            color="inherit"
                            onClick={async () => {
                                await Auth.signOut()
                                navigate("/logout")
                            }}>Sign Out
                        </Button> : <Button
                            size="large"
                            color="inherit"
                            onClick={() => {
                                navigate("/login")
                            }}>Login
                        </Button>} </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet/>
        </>
    );
}
