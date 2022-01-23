import {useAppDispatch} from "../redux/hooks";
import {unauthenticated, setUserName} from "../redux/userSlice";
import {Navigate} from "react-router-dom";
import GetAuth from './GetAuth';

const DoAuth = (props: any): JSX.Element => {
    const dispatch = useAppDispatch();
    dispatch(unauthenticated());
    dispatch(setUserName(props.username));
    return (
        <Navigate to={"/app/home"} replace={true}/>
    )
}

const Logout = (): JSX.Element => {
    return (
        <GetAuth component={DoAuth}></GetAuth>
    )
}

export default Logout